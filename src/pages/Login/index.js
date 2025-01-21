import { Link } from "react-router-dom";
import images from "../../assets/images";

function Login() {
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
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Nhập Email..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Nhập mật khẩu..."
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">
                            Nhớ mật khẩu
                          </label>
                        </div>
                      </div>
                      <Link to={"/dashboard"} className="btn btn-primary btn-user btn-block">
                        {" "}
                        Đăng nhập{" "}
                      </Link>
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
