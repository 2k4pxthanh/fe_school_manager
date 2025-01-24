import $ from "jquery";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Select2Component from "../../components/Select2";
import BoxModel from "../../components/BoxModel";
import Alert from "../../components/Alert";
import Pagination from "../../components/Pagination";
import handleBirthday from "../../utils/handleBirthday";
import { deleteStudentById, getAllStudents } from "../../services/Api";

function Students() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [students, setStudents] = useState([]);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [bornAt, setBornAt] = useState("");
  const [currentClassLevel, setLevelOfClass] = useState("");
  const [alert, setAlert] = useState({ type: "success", title: "thành công" });

  const fullNameParam = searchParams.get("fullName");
  const genderParam = searchParams.get("gender");
  const bornAtParam = searchParams.get("bornAt");
  const currentClassLevelParam = searchParams.get("currentClassLevel");
  const pageParam = searchParams.get("page") || 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fullNameParam, currentClassLevelParam, genderParam, bornAtParam, pageParam]);

  const navigateSearch = () => {
    navigate(`/students?fullName=${fullName}&currentClassLevel=${currentClassLevel}&gender=${gender}&bornAt=${bornAt}`);
  };

  const fetchStudents = () => {
    getAllStudents({
      params: {
        limit: 10,
        sort: -1,
        page: pageParam,
        fullName: fullNameParam,
        currentClassLevel: currentClassLevelParam,
        gender: genderParam,
        bornAt: bornAtParam,
      },
    })
      .then(({ data }) => {
        setStudents(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigateSearch();
    setCurrentPage(1);
  };

  const handleReloadSort = (e) => {
    e.preventDefault();
    $(".select2").val(null).trigger("change");
  };

  const showDeleteModal = (studentId) => {
    setStudentToDelete(studentId);
    $("#delModel").modal("show");
  };

  const handleDeleteStudent = () => {
    if (studentToDelete) {
      deleteStudentById(studentToDelete)
        .then(() => {
          setStudents(students.filter((student) => student._id !== studentToDelete));
          setAlert({ ...alert, type: "success", title: "Xóa sinh viên thành công" });
          $("#delModel").modal("hide");
          $("#alert").css("display", "block");
          setTimeout(() => {
            $("#alert").css("display", "none");
          }, 500);
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
          $("#delModel").modal("hide");
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Danh sách sinh viên</h1>
            <p className="mb-4">
              Sinh viên <span>/</span>
              <span className="z_cl-primary"> Danh sách</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/students/create"}>
                <i className="fa-solid fa-plus mr-1" />
                Thêm mới
              </Link>
            </button>
          </div>
        </div>

        {/* Tìm kiếm */}
        <div className="container z_search">
          <form className="row" onSubmit={handleSearch}>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <input
                name="fullName"
                className="z_search-input form-control"
                placeholder="Tìm kiếm ID & Họ và tên"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
              />
            </div>
            {/* Các filter khác */}
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <Select2Component
                id="currentClassLevel"
                name="currentClassLevel"
                className="z_search-input form-control"
                placeholder="Chọn lớp học"
                allOptions="Tất cả lớp học"
                data={"/classes"}
                value={currentClassLevel || ""}
                onChange={(e) => setLevelOfClass(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <Select2Component
                id="gender"
                name="gender"
                className="z_search-input form-control"
                placeholder="Chọn giới tính"
                allOptions="Tất cả giới tính"
                data={["Nam", "Nữ"]}
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <Select2Component
                id="bornAt"
                name="bornAt"
                className="z_search-input form-control"
                placeholder="Chọn nơi sinh"
                allOptions="Tất cả nơi sinh"
                data={"https://open.oapi.vn/location/provinces?size=63"}
                value={bornAt || ""}
                onChange={(e) => setBornAt(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <button type="submit" className="btn btn-primary z_button-fill">
                Lọc dữ liệu
              </button>
              <button className="btn btn-primary z_button-fill" onClick={handleReloadSort}>
                <i className="fa-solid fa-arrow-rotate-right z_icon-reload" />
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="container z_wrapper">
          <div className="row">
            <div className="col">
              <div className="card-body z_table-wrapper">
                <div className="table-responsive">
                  <table className="table table-bordered" id="dataStudents" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Stt</th>
                        <th>Tên</th>
                        <th>Ngày sinh</th>
                        <th>Lớp</th>
                        <th>Giới tính</th>
                        <th>Nơi sinh</th>
                        <th>Tùy chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students?.map((student, index) => (
                        <tr key={student?._id}>
                          <td>{index + 1}</td>
                          <td>{student?.fullName}</td>
                          <td>{handleBirthday(student?.birthday)}</td>
                          <td>{student?.currentClassLevel?.name}</td>
                          <td>{student?.gender}</td>
                          <td>{student?.bornAt}</td>
                          <td>
                            <button className="btn btn-warning z-btn-edit" type="submit">
                              <Link to={`/students/edit/${student?._id}`} className="text-white">
                                <i className="fa-solid fa-pen-to-square" />
                              </Link>
                            </button>
                            <button
                              className="btn btn-danger z-btn-del"
                              type="button"
                              onClick={() => showDeleteModal(student?._id)}
                            >
                              <i className="fa-solid fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <Pagination currentPage={pageParam} totalPages={totalPages} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xóa */}
      <BoxModel
        title={"Bạn muốn xóa sinh viên này?"}
        description={"Chọn 'Xóa' nếu bạn muốn xóa sinh viên này."}
        choose={"Xóa"}
        cancle={"Hủy"}
        onConfirm={handleDeleteStudent}
      />

      {/* Alert thông báo xóa thành công */}
      <Alert data={alert.type} title={alert.title} />
    </>
  );
}

export default Students;
