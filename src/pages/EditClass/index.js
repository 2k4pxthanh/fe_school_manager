import $ from "jquery";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import { getClassById, editClass } from "../../services/Api";

function EditClass() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataClass, setDataClass] = useState({});
  const [alert, setAlert] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên lớp học"),
    mainTeacher: Yup.string().required("Vui lòng chọn giáo viên chủ nhiệm"),
  });

  const initialValues = {
    name: dataClass?.name || "",
    description: dataClass?.description || "",
    mainTeacher: dataClass?.mainTeacher || "",
    grade: dataClass?.grade || "",
  };

  useEffect(() => {
    getClassById(id)
      .then(({ data }) => setDataClass(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Sửa lớp học</h1>
            <p className="mb-4">
              Lớp học<span> / </span>
              <Link className="gray-cl" to={"/classes"}>
                Danh sách
              </Link>
              <span> / </span>
              <span className="z_cl-primary">Tùy chọn</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/classes"}>
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
              editClass(values, id)
                .then(({ data }) => {
                  setAlert({ type: "success", title: "Sửa lớp thành công" });
                })
                .catch((err) => {
                  setAlert({ type: "danger", title: "Có lỗi xảy ra, vui lòng thử lại" });
                });

              setSubmitting(false);
              $("#alert").css("display", "block");
              setTimeout(() => {
                $("#alert").css("display", "none");
                navigate("/classes");
              }, 500);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="form row" id="formEditClass">
                <div className="col-12 form-group">
                  <label className="text-white">
                    Tên lớp học <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="z_search-input form-control"
                    placeholder="Nhập tên lớp"
                    type="text"
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
                    placeholder="Nhập mô tả"
                    type="text"
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
                    initValue={dataClass.grade || ""}
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
                    initValue={dataClass.mainTeacher || ""}
                  />
                  <ErrorMessage name="mainTeacher" component="span" className="form-message text-warning" />
                </div>

                <div className="col-12 form-group">
                  <button className="btn btn-primary z_button-fill" type="submit" disabled={isSubmitting}>
                    Sửa lớp học
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

export default EditClass;
