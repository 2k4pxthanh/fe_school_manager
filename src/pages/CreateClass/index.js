import $ from "jquery";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import { createClass } from "../../services/Api";

const validationSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên lớp học"),
  mainTeacher: Yup.string().required("Vui lòng chọn giáo viên chủ nhiệm"),
  // grade: Yup.string().required("Vui lòng chọn khối theo học"),
});

function CreateClass() {
  const [alert, setAlert] = useState({ type: "", title: "" });

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Thêm mới lớp học</h1>
            <p className="mb-4">
              Lớp học <span>/</span>
              <span className="z_cl-primary"> Thêm mới</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/classes"}>
                {" "}
                Danh sách{" "}
              </Link>
            </button>
          </div>
        </div>
        <div className="container z_search">
          <Formik
            initialValues={{
              name: "",
              description: "",
              mainTeacher: "",
              grade: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createClass(values)
                .then(({ data }) => {
                  setAlert({ ...alert, type: "success", title: "Thêm lớp thành công" });
                  $(".select2").val(null).trigger("change");
                  resetForm();
                })
                .catch((err) => {
                  setAlert({ ...alert, type: "danger", title: "Lớp đã tồn tại" });
                });

              setSubmitting(false);
              $("#alert").css("display", "block");
              setTimeout(() => {
                $("#alert").css("display", "none");
              }, 500);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="form row" id="formCreateClass">
                <div className="col-12 form-group">
                  <label className="text-white">
                    Tên lớp học <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="z_search-input form-control"
                    type="text"
                    placeholder="Nhập tên lớp"
                  />
                  <ErrorMessage name="name" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Mô tả lớp học <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="description"
                    name="description"
                    className="z_search-input form-control"
                    type="text"
                    placeholder="Nhập mô tả"
                  />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Khối <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="grade"
                    name="grade"
                    className="z_search-input form-control"
                    placeholder="Chọn khối"
                    data="/grades"
                    onChange={(e) => setFieldValue("grade", $(e.target).val())}
                  />
                  <ErrorMessage name="grade" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Giáo viên chủ nhiệm <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="mainTeacher"
                    name="mainTeacher"
                    className="z_search-input form-control"
                    placeholder="Chọn giáo viên chủ nhiệm"
                    data="/teachers"
                    onChange={(e) => setFieldValue("mainTeacher", $(e.target).val())}
                  />
                  <ErrorMessage name="mainTeacher" component="span" className="form-message text-warning" />
                </div>

                <div className="col-12 form-group">
                  <button className="btn btn-primary z_button-fill" type="submit" disabled={isSubmitting}>
                    Thêm mới lớp học
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Alert to show success message */}
      <Alert data={alert.type} title={alert.title} />
    </>
  );
}

export default CreateClass;
