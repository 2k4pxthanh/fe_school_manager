import $ from "jquery";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import { createStudent } from "../../services/Api.js";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  currentClassLevel: Yup.string().required("Vui lòng chọn lớp học"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  bornAt: Yup.string().required("Vui lòng chọn nơi sinh"),
  birthday: Yup.date().required("Vui lòng nhập ngày sinh"),
});

function CreateStudent() {
  const [alert, setAlert] = useState({ type: "success", title: "thành công" });

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Thêm mới sinh viên</h1>
            <p className="mb-4">
              Sinh viên <span>/</span>
              <span className="z_cl-primary"> Thêm mới</span>
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
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              currentClassLevel: "",
              gender: "",
              bornAt: "",
              birthday: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createStudent(values)
                .then(({ data }) => {
                  setAlert({ ...alert, type: "success", title: "Thêm sinh viên thành công" });
                  resetForm();
                  $(".select2").val(null).trigger("change");
                  setSubmitting(false);
                  $("#alert").css("display", "block");
                  setTimeout(() => {
                    $("#alert").css("display", "none");
                  }, 500);
                })
                .catch((err) => {
                  setAlert({ ...alert, type: "danger", title: "Lỗi khi thêm sinh viên" });
                });
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="form row" id="formCreateStudent">
                <div className="col-12 form-group">
                  <label className="text-white">
                    Họ và tên sinh viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    className="z_search-input form-control"
                    type="text"
                    placeholder="Nhập họ và tên"
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
                    type="date"
                    placeholder="dd/mm/yyyy"
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
                    type="email"
                    placeholder="Nhập email"
                  />
                  <ErrorMessage name="email" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Mật khẩu sinh viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="password"
                    name="password"
                    className="z_search-input form-control"
                    type="password"
                    placeholder="Nhập password"
                  />
                  <ErrorMessage name="password" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Lớp học <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    className="z_search-input form-control"
                    name="currentClassLevel"
                    id="currentClassLevel"
                    placeholder="Chọn lớp học"
                    data={"/classes"}
                    onChange={(e) => setFieldValue("currentClassLevel", $(e.target).val())}
                  />
                  <ErrorMessage name="currentClassLevel" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Nơi sinh <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    className="z_search-input form-control"
                    name="bornAt"
                    id="bornAt"
                    placeholder="Chọn nơi sinh"
                    data={"https://open.oapi.vn/location/provinces?size=63"}
                    onChange={(e) => setFieldValue("bornAt", $(e.target).val())}
                  />
                  <ErrorMessage name="bornAt" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <button className="btn btn-primary z_button-fill" type="submit" disabled={isSubmitting}>
                    Thêm mới sinh viên
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

export default CreateStudent;
