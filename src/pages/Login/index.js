import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/images";
import { checkAdmin } from "../../services/Api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStatusLogin } from "../../redux/reducers/AuthReducer";

function Login() {
  const [formData, setFormData] = useState({});
  const [checkLogin, setCheckLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e, data) => {
    e.preventDefault();

    checkAdmin(data)
      .then((dataRes) => {
        const { status, data } = dataRes.data;
        dispatch(setStatusLogin({ status, data }));
        navigate("/dashboard");
      })
      .catch((err) => setCheckLogin(true));
  };
  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-flex bg-login-image">
                  <img src={images.imgLoginPage} alt="imgLoginPage" className="z_image-login" />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Đăng nhập</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Nhập tên tài khoản..."
                          onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value });
                          }}
                          value={formData.username || ""}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Nhập mật khẩu..."
                          onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                          }}
                          value={formData.password || ""}
                        />
                      </div>
                      {checkLogin && <h6 className="login-failed"> Sai tài khoản hoặc mật khẩu</h6>}
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">
                            Nhớ mật khẩu
                          </label>
                        </div>
                      </div>
                      <button onClick={(e) => handleLogin(e, formData)} className="btn btn-primary btn-user btn-block">
                        {" "}
                        Đăng nhập{" "}
                      </button>
                      <hr />
                      <Link to={"/dashboard"} className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw" /> Đăng nhập với tài khoản Google
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
