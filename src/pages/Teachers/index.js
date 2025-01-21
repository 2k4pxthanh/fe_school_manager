import $ from "jquery";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Select2Component from "../../components/Select2";
import BoxModel from "../../components/BoxModel";
import Alert from "../../components/Alert";
import Pagination from "../../components/Pagination";
import handleBirthday from "../../utils/handleBirthday";
import { deleteTeacherById, getAllTeachers } from "../../services/Api";

function Teachers() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [teachers, setTeachers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState({ type: "success", title: "thành công" });

  const fullNameParam = searchParams.get("fullName");
  const subjectParam = searchParams.get("subject");
  const genderParam = searchParams.get("gender");
  const addressParam = searchParams.get("address");
  const pageParam = searchParams.get("page") || 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fullNameParam, subjectParam, genderParam, addressParam, pageParam]);

  const navigateSearch = () => {
    navigate(`/teachers?fullName=${fullName}&subject=${subject}&gender=${gender}&address=${address}`);
  };

  const fetchTeachers = () => {
    getAllTeachers({
      params: {
        limit: 10,
        page: pageParam,
        fullName: fullNameParam,
        subject: subjectParam,
        gender: genderParam,
        address: addressParam,
      },
    })
      .then(({ data }) => {
        setTeachers(data.data);
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

  const showDeleteModal = (teacherId) => {
    setTeacherToDelete(teacherId);
    $("#delModel").modal("show");
  };

  const handleDeleteTeacher = () => {
    if (teacherToDelete) {
      deleteTeacherById(teacherToDelete)
        .then(() => {
          setTeachers(teachers.filter((teacher) => teacher._id !== teacherToDelete));
          setAlert({ ...alert, type: "success", title: "Xóa giáo viên thành công" });
          $("#delModel").modal("hide");
          $("#alert").css("display", "block");
          setTimeout(() => {
            $("#alert").css("display", "none");
          }, 500);
        })
        .catch((error) => {
          console.error("Error deleting teacher:", error);
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
            <h1 className="h3 m-0 text-gray-800 d-flex">Danh sách giáo viên</h1>
            <p className="mb-4">
              Giáo viên <span>/</span>
              <span className="z_cl-primary"> Danh sách</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/teachers/create"}>
                {" "}
                <i className="fa-solid fa-plus mr-1" />
                Thêm mới{" "}
              </Link>
            </button>
          </div>
        </div>

        {/* Tìm kiếm */}
        <div className="container z_search">
          <form className="row" onSubmit={handleSearch}>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <input
                id="fullname"
                name="fullName"
                className="z_search-input form-control"
                placeholder="Nhập Họ và tên"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
              />
            </div>
            {/* Các filter khác */}
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <Select2Component
                id="subject"
                name="subject"
                className="z_search-input form-control"
                placeholder="Chọn môn học"
                allOptions="Tất cả môn học"
                data={"/subjects"}
                value={subject || ""}
                onChange={(e) => setSubject(e.target.value)}
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
                id="address"
                name="address"
                className="z_search-input form-control"
                placeholder="Chọn nơi sinh"
                allOptions="Tất cả nơi sinh"
                data={"https://open.oapi.vn/location/provinces?size=63"}
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
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
                  <table className="table table-bordered" id="dataTeachers" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Stt</th>
                        <th>Họ và tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Môn giảng dạy</th>
                        <th>Địa chỉ</th>
                        <th>Tùy chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers?.map((teacher, index) => (
                        <tr key={teacher?._id}>
                          <td>{index + 1}</td>
                          <td>{teacher?.fullName}</td>
                          <td>{handleBirthday(teacher?.birthday)}</td>
                          <td>{teacher?.gender}</td>
                          <td>{teacher?.subject?.name}</td>
                          <td>{teacher?.address}</td>
                          <td>
                            <button className="btn btn-warning z-btn-edit" type="submit">
                              <Link to={`/teachers/edit/${teacher?._id}`} className="text-white">
                                <i className="fa-solid fa-pen-to-square"> </i>
                              </Link>
                            </button>
                            <button
                              className="btn btn-danger z-btn-del"
                              type="button"
                              onClick={() => showDeleteModal(teacher?._id)}
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
        title={"Bạn muốn xóa giáo viên này ?"}
        description={"Chọn 'Xóa' nếu bạn muốn xóa giáo viên này."}
        choose={"Xóa"}
        cancle={"Hủy"}
        onConfirm={handleDeleteTeacher}
      />

      {/* Alert thông báo xóa thành công */}
      <Alert data={alert.type} title={alert.title} />
    </>
  );
}

export default Teachers;
