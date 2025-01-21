import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion z_nav-wrapper" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">Manager S</div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className={`nav-item ${activeLink === "/dashboard" ? "active" : ""}`}>
        <Link className="nav-link" to="/dashboard" onClick={() => handleLinkClick("/dashboard")}>
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Quản lý</div>
      {/* Nav Item - Students Collapse Menu */}
      <li className="nav-item">
        <Link
          className={`nav-link collapsed z_nav-item ${activeLink.startsWith("/students") ? "active" : ""}`}
          data-toggle="collapse"
          data-target="#students"
          aria-expanded="true"
          aria-controls="students"
          onClick={() => handleLinkClick("/students")}
        >
          <i className="fas fa-fw fa-user-graduate" />
          <span>Sinh viên</span>
        </Link>
        <div id="students" className="collapse" aria-labelledby="headingStudents" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link
              className={`collapse-item ${activeLink === "/students/create" ? "active" : ""}`}
              to="/students/create"
              onClick={() => handleLinkClick("/students/create")}
            >
              Thêm mới
            </Link>
            <Link
              className={`collapse-item ${activeLink === "/students" ? "active" : ""}`}
              to="/students"
              onClick={() => handleLinkClick("/students")}
            >
              Danh sách
            </Link>
          </div>
        </div>
      </li>
      {/* Nav Item - Teachers Collapse Menu */}
      <li className="nav-item">
        <Link
          className={`nav-link collapsed z_nav-item ${activeLink.startsWith("/teachers") ? "active" : ""}`}
          data-toggle="collapse"
          data-target="#teachers"
          aria-expanded="true"
          aria-controls="teachers"
          onClick={() => handleLinkClick("/teachers")}
        >
          <i className="fas fa-fw fa-user-tie" />
          <span>Giảng viên</span>
        </Link>
        <div id="teachers" className="collapse" aria-labelledby="headingTeachers" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link
              className={`collapse-item ${activeLink === "/teachers/create" ? "active" : ""}`}
              to="/teachers/create"
              onClick={() => handleLinkClick("/teachers/create")}
            >
              Thêm mới
            </Link>
            <Link
              className={`collapse-item ${activeLink === "/teachers" ? "active" : ""}`}
              to="/teachers"
              onClick={() => handleLinkClick("/teachers")}
            >
              Danh sách
            </Link>
          </div>
        </div>
      </li>
      {/* Nav Item - Classes Collapse Menu */}
      <li className="nav-item">
        <Link
          className={`nav-link collapsed z_nav-item ${activeLink.startsWith("/classes") ? "active" : ""}`}
          data-toggle="collapse"
          data-target="#classes"
          aria-expanded="true"
          aria-controls="classes"
          onClick={() => handleLinkClick("/classes")}
        >
          <i className="fas fa-fw fa-chalkboard" />
          <span>Lớp học</span>
        </Link>
        <div id="classes" className="collapse" aria-labelledby="headingClasses" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link
              className={`collapse-item ${activeLink === "/classes/create" ? "active" : ""}`}
              to="/classes/create"
              onClick={() => handleLinkClick("/classes/create")}
            >
              Thêm mới
            </Link>
            <Link
              className={`collapse-item ${activeLink === "/classes" ? "active" : ""}`}
              to="/classes"
              onClick={() => handleLinkClick("/classes")}
            >
              Danh sách
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link collapsed z_nav-item ${activeLink.startsWith("/grades") ? "active" : ""}`}
          data-toggle="collapse"
          data-target="#grades"
          aria-expanded="true"
          aria-controls="grades"
          onClick={() => handleLinkClick("/grades")}
        >
          <i className="fas fa-fw fa-school" />
          <span>Khối</span>
        </Link>
        <div id="grades" className="collapse" aria-labelledby="headingGrades" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link
              className={`collapse-item ${activeLink === "/grades/create" ? "active" : ""}`}
              to="/grades/create"
              onClick={() => handleLinkClick("/grades/create")}
            >
              Thêm mới
            </Link>
            <Link
              className={`collapse-item ${activeLink === "/grades" ? "active" : ""}`}
              to="/grades"
              onClick={() => handleLinkClick("/grades")}
            >
              Danh sách
            </Link>
          </div>
        </div>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider z_mg-top" />
      {/* Heading */}
      <div className="sidebar-heading">Cài đặt</div>
      {/* Nav Item - Folders Collapse Menu */}
      <li className="nav-item">
        <Link
          className={`nav-link collapsed z_nav-item ${activeLink.startsWith("/folders") ? "active" : ""}`}
          data-toggle="collapse"
          data-target="#folders"
          aria-expanded="true"
          aria-controls="folders"
          onClick={() => handleLinkClick("/folders")}
        >
          <i className="fas fa-fw fa-folder" />
          <span>Thư mục</span>
        </Link>
        <div id="folders" className="collapse" aria-labelledby="headingFolders" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <Link
              className={`collapse-item ${activeLink === "/folders/upload" ? "active" : ""}`}
              to="/folders/upload"
              onClick={() => handleLinkClick("/folders/upload")}
            >
              Upload
            </Link>
            <Link
              className={`collapse-item ${activeLink === "/folders" ? "active" : ""}`}
              to="/folders"
              onClick={() => handleLinkClick("/folders")}
            >
              Danh sách
            </Link>
          </div>
        </div>
      </li>
      {/* Nav Item - Setting */}
      <li className="nav-item">
        <a
          className={`nav-link z_nav-item z_mg-btm ${activeLink === "/settings" ? "active" : ""}`}
          href="charts.html"
          onClick={() => handleLinkClick("/settings")}
        >
          <i className="fas fa-fw fa-cogs" />
          <span>Cài đặt</span>
        </a>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block  z_mg-top" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline z_sidebar-toggler">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
  );
}

export default Sidebar;
