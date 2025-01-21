import $ from "jquery";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";

import Select2Component from "../../components/Select2";
import Alert from "../../components/Alert";
import images from "../../assets/images/index.js";
import getAvatar from "../../utils/getAvatar.js";
import { editTeacher, getTeacherById } from "../../services/Api.js";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  address: Yup.string().required("Vui lòng nhập địa chỉ nhà"),
  status: Yup.string().required("Vui lòng chọn trạng thái"),
  phoneNumber: Yup.string().required("Vui lòng nhập SĐT"),
  avatar: Yup.mixed().required("Vui lòng chọn ảnh chân dung (3x4)"),
  email: Yup.string().email("Vui lòng nhập đúng định dạng email").required("Vui lòng nhập email"),
  subject: Yup.string().required("Vui lòng nhập môn giảng dạy"),
  birthday: Yup.date().required("Vui lòng nhập ngày sinh"),
});

function EditTeacher() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [dataTeacher, setDataTeacher] = useState({});
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();
  const initialValues = {
    fullName: dataTeacher.fullName || "",
    gender: dataTeacher.gender || "",
    address: dataTeacher.address || "",
    status: dataTeacher.status || "",
    phoneNumber: dataTeacher.phoneNumber || "",
    avatar: dataTeacher.avatar || {},
    email: dataTeacher.email || "",
    subject: dataTeacher.subject || "",
    birthday: dataTeacher.birthday || "",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getTeacherById(id)
      .then(({ data }) => setDataTeacher(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-flex justify-content-between flex-column flex-md-row">
          <div>
            <h1 className="h3 m-0 text-gray-800 d-flex">Sửa giáo viên</h1>
            <p className="mb-4">
              Giảng viên<span> / </span>
              <Link className="gray-cl" to={"/teachers"}>
                Danh sách
              </Link>
              <span> / </span>
              <span className="z_cl-primary"> Tùy chọn</span>
            </p>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center mb-4">
              <Link className="text-white" to={"/teachers"}>
                {" "}
                Danh sách{" "}
              </Link>
            </button>
          </div>
        </div>
        <div className="container z_search">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, { setSubmitting, resetForm }) => {
              editTeacher(values, id)
                .then(({ data }) => {
                  setAlert({ ...alert, type: "success", title: "Sửa giáo viên thành công" });
                })
                .catch((err) => {
                  setAlert({ ...alert, type: "danger", title: "Email giáo viên đã tồn tại" });
                });
              setSubmitting(false);
              $("#alert").css("display", "block");
              setTimeout(() => {
                $("#alert").css("display", "none");
                navigate("/teachers");
              }, 500);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form method="POST" className="form row" encType="multipart/form-data" id="formEditTeacher">
                <div className="col-12 form-group">
                  <label className="text-white">
                    Họ và tên giáo viên <span className="text-warning">*</span>
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
                    initValue={dataTeacher.gender || ""}
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
                    Ảnh chân dung (3x4) <span className="text-warning">*</span>
                  </label>
                  <div className="custom-file mb-2">
                    <label className="custom-file-label" htmlFor="customFile">
                      Chọn ảnh
                    </label>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      name="avatar"
                      onChange={(e) => {
                        handleImageChange(e);
                        console.log(e.target.files);
                        setFieldValue("avatar", e.target.files[0]);
                      }}
                    />
                  </div>
                  <div id="imagePreview" className="border">
                    <img
                      alt="Ảnh chân dung (3x4)"
                      className="img-fluid"
                      srcSet={image || getAvatar(dataTeacher.avatar) || images.defaultImg}
                    />
                  </div>
                  <ErrorMessage name="avatar" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Địa chỉ <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="address"
                    name="address"
                    className="z_search-input form-control"
                    placeholder="Chọn địa chỉ"
                    data={"https://open.oapi.vn/location/provinces?size=63"}
                    onChange={(e) => setFieldValue("address", $(e.target).val())}
                    initValue={dataTeacher.address || ""}
                  />
                  <ErrorMessage name="subject" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    SĐT giáo viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    className="z_search-input form-control"
                    placeholder="Nhập SĐT giáo viên"
                    type="text"
                  />
                  <ErrorMessage name="phoneNumber" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Môn giảng dạy <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="subject"
                    name="subject"
                    className="z_search-input form-control"
                    placeholder="Chọn môn học giảng dạy"
                    data={"/subjects"}
                    onChange={(e) => setFieldValue("subject", $(e.target).val())}
                    initValue={dataTeacher.subject || ""}
                  />
                  <ErrorMessage name="subject" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Email giáo viên <span className="text-warning">*</span>
                  </label>
                  <Field
                    id="email"
                    name="email"
                    className="z_search-input form-control"
                    placeholder="Nhập Email giáo viên"
                    type="email"
                  />
                  <ErrorMessage name="email" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <label className="text-white">
                    Trạng thái giáo viên <span className="text-warning">*</span>
                  </label>
                  <Select2Component
                    id="status"
                    name="status"
                    className="z_search-input form-control"
                    placeholder="Chọn trạng thái"
                    data={["Giảng dạy", "Nghỉ dài hạn", "Nghỉ hưu"]}
                    onChange={(e) => setFieldValue("status", $(e.target).val())}
                    initValue={dataTeacher.status || ""}
                  />
                  <ErrorMessage name="status" component="span" className="form-message text-warning" />
                </div>
                <div className="col-12 form-group">
                  <button
                    type="submit"
                    className="btn btn-primary z_button-fill"
                    data-toggle="modal"
                    data-target="#createStudent"
                    id="confirmCreate"
                    disabled={isSubmitting}
                  >
                    Sửa giáo viên
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

export default EditTeacher;
