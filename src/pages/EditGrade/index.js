import $ from "jquery";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import { getGradeById, editGrade } from "../../services/Api.js";

function EditGrade() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataGrade, setDataGrade] = useState({});
  const [alert, setAlert] = useState({ type: "success", title: "thành công" });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên khối"),
    classes: Yup.array().min(1, "Chọn ít nhất một lớp").required("Các lớp trong khối là bắt buộc"),
  });

  const initialValues = {
    name: dataGrade.name || "",
    classes: dataGrade.classes || [],
  };

  useEffect(() => {
    getGradeById(id)
      .then(({ data }) => setDataGrade(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Sửa khối</h1>
            <p className="mb-4">
              Khối<span> / </span>
              <Link className="gray-cl" to={"/grades"}>
                Danh sách
              </Link>
              <span> / </span>
              <span className="z_cl-primary"> Tùy chọn</span>
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              editGrade(values, id)
                .then(({ data }) => {
                  setAlert({ type: "success", title: "Sửa khối thành công" });
                })
                .catch((err) => {
                  setAlert({ type: "danger", title: "Có lỗi xảy ra, vui lòng thử lại" });
                });
              setSubmitting(false);
              $("#alert").css("display", "block");
              setTimeout(() => {
                $("#alert").css("display", "none");
                navigate("/grades");
              }, 500);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="form row" id="formEditGrade">
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
                    data="/classes"
                    multiple="multiple"
                    onChange={(e) => setFieldValue("classes", $(e.target).val())}
                    initValue={dataGrade.classes || []}
                  />
                  <ErrorMessage name="classes" component="span" className="form-message text-warning" />
                </div>

                <div className="col-12 form-group">
                  <button type="submit" className="btn btn-primary z_button-fill" disabled={isSubmitting}>
                    Sửa thông tin khối
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

export default EditGrade;
