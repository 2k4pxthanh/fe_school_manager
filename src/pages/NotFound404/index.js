import { Link } from "react-router-dom";

function NotFound404() {
  return (
    <div className="bgc-white">
      <div className="container-fluid center">
        {/* 404 Error Text */}
        <div className="text-center">
          <div className="error mx-auto" data-text={404}>
            404
          </div>
          <p className="lead text-gray-800 mb-3">Không tìm thấy trang</p>
          <p className="text-gray-500 mb-0">Bạn có vẻ đã sai đường dẫn tới website</p>
          <Link to={"/dashboard"}>← Trở lại trang Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
