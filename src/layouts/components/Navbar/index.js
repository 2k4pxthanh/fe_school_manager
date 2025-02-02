import images from "../../../assets/images";

function Navbar() {
  return (
    <ul className="navbar-nav ml-auto">
      <div className="topbar-divider d-none d-sm-block" />
      {/* Nav Item - User Information */}
      <li className="nav-item dropdown no-arrow">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">Administrator</span>
          <img className="img-profile rounded-circle" src={images.avatar1} />
        </a>
        {/* Dropdown - User Information */}
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <a className="dropdown-item" href="#">
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
            Tài khoản
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
            Cài đặt
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
            Hoạt động
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item cursor-pointer" data-toggle="modal" data-target="#logoutModal">
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
            Đăng xuất
          </a>
        </div>
      </li>
    </ul>
  );
}

export default Navbar;
