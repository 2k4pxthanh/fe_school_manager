import $ from "jquery";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import { createGrade } from "../../services/Api";

function CreateGrade() {
  const [alert, setAlert] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên khối"),
  });

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Thêm mới khối</h1>
            <p className="mb-4">
              Khối <span>/</span>
              <span className="z_cl-primary"> Thêm mới</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/grades"}>
                Danh sách
              </Link>
            </button>
          </div>
        </div>
        <div className="container z_search">
          <Formik
            initialValues={{
              name: "",
              classes: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log(values);

              createGrade(values)
                .then(({ data }) => {
                  setAlert({ ...alert, type: "success", title: "Thêm khối thành công" });
                  $(".select2").val(null).trigger("change");
                  resetForm();
                })
                .catch((err) => {
                  setAlert({ ...alert, type: "danger", title: "Khối đã tồn tại" });
                });

              setSubmitting(false);
              $("#alert").css("display", "block");
              setTimeout(() => {
                $("#alert").css("display", "none");
              }, 500);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form method="POST" className="form row" id="formCreateGrade">
                <div className="col-12 form-group">
                  <label className="text-white">
                    Tên khối <span className="text-warning">*</span>
                  </label>
                  <Field type="text" name="name" className="z_search-input form-control" placeholder="Nhập tên khối" />
                  <ErrorMessage name="name" component="span" className="form-message text-warning" />
                </div>

                <div className="col-12 form-group">
                  <label className="text-white">
                    Các lớp trong khối <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="classes"
                    name="classes"
                    className="z_search-input form-control"
                    placeholder="Chọn lớp học"
                    data="/classes?hasGrade=0"
                    multiple="multiple"
                    onChange={(e) => setFieldValue("classes", $(e.target).val())}
                  />
                  <ErrorMessage name="classes" component="span" className="form-message text-warning" />
                </div>

                <div className="col-12 form-group">
                  <button type="submit" className="btn btn-primary z_button-fill" disabled={isSubmitting}>
                    Thêm mới khối
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

export default CreateGrade;
