import $ from "jquery";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import { editStudent, getStudentById } from "../../services/Api.js";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  currentClassLevel: Yup.string().required("Vui lòng chọn lớp học"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  bornAt: Yup.string().required("Vui lòng chọn nơi sinh"),
  birthday: Yup.date().required("Vui lòng nhập ngày sinh"),
});

function EditStudent() {
  const { id } = useParams();
  const [dataStudent, setDataStudent] = useState({});
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const initialValues = {
    fullName: dataStudent.fullName || "",
    email: dataStudent.email || "",
    password: dataStudent.password || "",
    currentClassLevel: dataStudent.currentClassLevel || "",
    gender: dataStudent.gender || "",
    bornAt: dataStudent.bornAt || "",
    birthday: dataStudent.birthday || "",
  };

  useEffect(() => {
    getStudentById(id)
      .then(({ data }) => setDataStudent(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Sửa sinh viên</h1>
            <p className="mb-4">
              Sinh viên<span> / </span>
              <Link className="gray-cl" to={"/students"}>
                Danh sách
              </Link>
              <span> / </span>
              <span className="z_cl-primary"> Tùy chọn</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/students"}>
                Danh sách
              </Link>
            </button>
          </div>
        </div>
        <div className="container z_search">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              editStudent(values, id)
                .then(({ data }) => {
                  setAlert({ ...alert, type: "success", title: "Sửa sinh viên thành công" });
                })
                .catch((err) => {
                  setAlert({ ...alert, type: "danger", title: "Có lỗi xảy ra" });
                });
              setSubmitting(false);
              $("#alert").css("display", "block");
              setTimeout(() => {
                $("#alert").css("display", "none");
                navigate("/students");
              }, 500);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="form row" id="formEditStudent">
                <div className="col-12 form-group">
                  <label className="text-white">
                    Họ và tên sinh viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    className="z_search-input form-control"
                    placeholder="Nhập họ và tên"
                    type="text"
                  />
                  <ErrorMessage name="fullName" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Giới tính <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="gender"
                    name="gender"
                    className="z_search-input form-control"
                    placeholder="Chọn giới tính"
                    data={["Nam", "Nữ"]}
                    onChange={(e) => setFieldValue("gender", $(e.target).val())}
                    initValue={dataStudent.gender || ""}
                  />
                  <ErrorMessage name="gender" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Ngày sinh <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="birthday"
                    name="birthday"
                    className="z_search-input form-control"
                    placeholder="dd/mm/yyyy"
                    type="date"
                  />
                  <ErrorMessage name="birthday" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Email sinh viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="email"
                    name="email"
                    className="z_search-input form-control"
                    placeholder="Nhập email"
                    type="email"
                  />
                  <ErrorMessage name="email" component="span" className="form-message text-warning" />
                </div>
                {/* <div className="col-12 form-group">
                  <label className="text-white">
                    Mật khẩu sinh viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="password"
                    name="password"
                    className="z_search-input form-control"
                    type="password"
                    placeholder="Nhập mật khẩu"
                  />
                  <ErrorMessage name="password" component="span" className="form-message text-warning" />
                </div> */}
                <div className="col-12 form-group">
                  <label className="text-white">
                    Lớp học <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="currentClassLevel"
                    name="currentClassLevel"
                    className="z_search-input form-control"
                    placeholder="Chọn lớp học"
                    data={"/classes"}
                    onChange={(e) => setFieldValue("currentClassLevel", $(e.target).val())}
                    initValue={dataStudent.currentClassLevel || ""}
                  />
                  <ErrorMessage name="currentClassLevel" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Nơi sinh <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="bornAt"
                    name="bornAt"
                    className="z_search-input form-control"
                    placeholder="Chọn nơi sinh"
                    data={"https://open.oapi.vn/location/provinces?size=63"} // Assuming an endpoint for places
                    onChange={(e) => setFieldValue("bornAt", $(e.target).val())}
                    initValue={dataStudent.bornAt || ""}
                  />
                  <ErrorMessage name="bornAt" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <button type="submit" className="btn btn-primary z_button-fill" disabled={isSubmitting}>
                    Sửa sinh viên
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Alert data={alert.type} title={alert.title} />
    </>
  );
}

export default EditStudent;
