import $ from "jquery";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import BoxModel from "../../components/BoxModel";
import Alert from "../../components/Alert";
import Pagination from "../../components/Pagination";
import handleListUpperCase from "../../utils/handleListUpperCase";
import { deleteGradeById, getAllGrades } from "../../services/Api";

function Grades() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [grades, setGrades] = useState([]);
  const [gradeName, setGradeName] = useState("");
  const [alert, setAlert] = useState({ type: "success", title: "thành công" });

  const gradeNameParam = searchParams.get("name");
  const pageParam = searchParams.get("page") || 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gradeToDelete, setGradeToDelete] = useState(null);

  useEffect(() => {
    fetchGrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, gradeNameParam, pageParam]);

  const fetchGrades = () => {
    getAllGrades({
      params: {
        limit: 10,
        page: pageParam,
        name: gradeNameParam,
      },
    })
      .then(({ data }) => {
        setGrades(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const navigateSearch = () => {
    navigate(`/grades?name=${gradeName}`);
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

  const showDeleteModal = (gradeId) => {
    setGradeToDelete(gradeId);
    $("#delModel").modal("show");
  };

  const handleDeleteGrade = () => {
    if (gradeToDelete) {
      deleteGradeById(gradeToDelete)
        .then(() => {
          setGrades(grades.filter((grade) => grade._id !== gradeToDelete));
          setAlert({ ...alert, type: "success", title: "Xóa khối thành công" });
          $("#delModel").modal("hide");
          $("#alert").css("display", "block");
          setTimeout(() => {
            $("#alert").css("display", "none");
          }, 500);
        })
        .catch((error) => {
          console.error("Error deleting grade:", error);
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
              Khối <span>/</span>
              <span className="z_cl-primary"> Danh sách</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/grades/create"}>
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
                placeholder="Tìm kiếm tên khối"
                value={gradeName || ""}
                onChange={(e) => setGradeName(e.target.value)}
                type="text"
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
                  <table className="table table-bordered" id="dataGrades" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Stt</th>
                        <th>Tên khối</th>
                        <th>Các lớp trong khối</th>
                        <th>Tùy chọn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades?.map((grade, index) => (
                        <tr key={grade?._id}>
                          <td>{index + 1}</td>
                          <td>{grade?.name}</td>
                          <td>{handleListUpperCase(grade?.classes)}</td>
                          <td>
                            <button className="btn btn-warning z-btn-edit" type="submit">
                              <Link to={`/grades/edit/${grade?._id}`} className="text-white">
                                <i className="fa-solid fa-pen-to-square"> </i>
                              </Link>
                            </button>
                            <button
                              className="btn btn-danger z-btn-del"
                              type="button"
                              onClick={() => showDeleteModal(grade?._id)}
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
        title={"Bạn muốn xóa khối này ?"}
        description={"Chọn 'Xóa' nếu bạn muốn xóa khối này."}
        choose={"Xóa"}
        cancle={"Hủy"}
        onConfirm={handleDeleteGrade}
      />

      {/* Alert thông báo xóa thành công */}
      <Alert data={alert.type} title={alert.title} />
    </>
  );
}

export default Grades;
