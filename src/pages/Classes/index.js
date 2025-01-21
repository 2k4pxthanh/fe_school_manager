import $ from "jquery";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import BoxModel from "../../components/BoxModel";
import Alert from "../../components/Alert";
import Pagination from "../../components/Pagination";
import Select2Component from "../../components/Select2";
import { getAllClasses, deleteClassById } from "../../services/Api";

function Classes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [mainTeacher, setMainTeacher] = useState("");
  const [grade, setGrade] = useState("");
  const [alert, setAlert] = useState({});

  const classNameParam = searchParams.get("name");
  const teacherIdParam = searchParams.get("mainTeacher");
  const gradeIdParam = searchParams.get("grade");
  const pageParam = searchParams.get("page") || 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [classToDelete, setClassToDelete] = useState(null);

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, classNameParam, teacherIdParam, gradeIdParam, pageParam]);

  const fetchClasses = () => {
    getAllClasses({
      params: {
        limit: 10,
        page: pageParam,
        name: classNameParam,
        mainTeacher: teacherIdParam,
        grade: gradeIdParam,
      },
    })
      .then(({ data }) => {
        setClasses(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const navigateSearch = () => {
    navigate(`/classes?name=${name}&mainTeacher=${mainTeacher}&grade=${grade}`);
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

  const showDeleteModal = (classId) => {
    setClassToDelete(classId);
    $("#delModel").modal("show");
  };

  const handleDeleteClass = () => {
    if (classToDelete) {
      deleteClassById(classToDelete)
        .then(() => {
          setClasses(classes.filter((cls) => cls._id !== classToDelete));
          setAlert({ ...alert, type: "success", title: "Xóa lớp thành công" });
          $("#delModel").modal("hide");
          $("#alert").css("display", "block");
          setTimeout(() => {
            $("#alert").css("display", "none");
          }, 500);
        })
        .catch((error) => {
          console.error("Error deleting class:", error);
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
            <h1 className="h3 m-0 text-gray-800 d-flex">Danh sách lớp học</h1>
            <p className="mb-4">
              Lớp học <span>/</span>
              <span className="z_cl-primary"> Danh sách</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/classes/create"}>
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
                className="z_search-input form-control"
                type="text"
                placeholder="Tìm tên lớp học"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <Select2Component
                className={"z_search-input form-control"}
                name={"mainTeacher"}
                id={"mainTeacher"}
                placeholder={"Chọn giáo viên chủ nhiệm"}
                data={"/teachers"}
                allOptions={"Tất cả giáo viên chủ nhiệm"}
                value={mainTeacher || ""}
                onChange={(e) => setMainTeacher(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <Select2Component
                className={"z_search-input form-control"}
                name={"grades"}
                id={"grades"}
                placeholder={"Chọn khối"}
                data={"/grades"}
                allOptions={"Tất cả khối"}
                value={grade || ""}
                onChange={(e) => setGrade(e.target.value)}
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
                  <table className="table table-bordered" id="dataClasses" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Stt</th>
                        <th>Tên lớp</th>
                        <th>Giáo viên chủ nhiệm</th>
                        <th>Khối</th>
                        <th>Tùy chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes?.map((cls, index) => (
                        <tr key={cls?._id}>
                          <td>{index + 1}</td>
                          <td>{cls?.name.toUpperCase()}</td>
                          <td>{cls?.mainTeacher?.fullName}</td>
                          <td>{cls?.grade?.name}</td>
                          <td>
                            <button className="btn btn-warning z-btn-edit" type="submit">
                              <Link to={`/classes/edit/${cls?._id}`} className="text-white">
                                <i className="fa-solid fa-pen-to-square"> </i>
                              </Link>
                            </button>
                            <button
                              className="btn btn-danger z-btn-del"
                              type="button"
                              onClick={() => showDeleteModal(cls?._id)}
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
        title={"Bạn muốn xóa lớp này ?"}
        description={"Chọn 'Xóa' nếu bạn muốn xóa lớp này."}
        choose={"Xóa"}
        cancle={"Hủy"}
        onConfirm={handleDeleteClass}
      />

      {/* Alert thông báo xóa thành công */}
      <Alert data={alert.type} title={alert.title} />
    </>
  );
}

export default Classes;
