function BoxModel({ title, description, choose, cancle, onConfirm }) {
  return (
    <>
      <div className="modal fade" id="delModel" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{description}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">
                {cancle}
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={onConfirm} // Gọi hàm onConfirm khi nhấn Xóa
              >
                {choose}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxModel;
