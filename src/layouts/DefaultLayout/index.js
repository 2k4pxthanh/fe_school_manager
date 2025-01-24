import $ from "jquery";
import { Link, Navigate } from "react-router-dom";
import BtnScroll from "../../components/BtnScroll";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { delStatusLogin } from "../../redux/reducers/AuthReducer";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    $("#logoutModal").modal("hide");
    dispatch(delStatusLogin());
  };

  return (
    <div>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars" />
              </button>
              {/* Topbar Navbar */}
              <Navbar />
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            {children}
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <BtnScroll />
      {/* Logout Modal*/}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" id="#modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Bạn muốn đăng xuất ?
              </h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Chọn "Đăng xuất" nếu bạn muốn thoát khỏi tài khoản này.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">
                Hủy
              </button>
              <Link className="btn btn-primary" to={"/login"} onClick={handleLogout}>
                Đăng xuất
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
