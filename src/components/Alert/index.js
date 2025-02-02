function Alert({ data, title }) {
  return (
    <div id="alertContainer">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1-12a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0V4zm0 6a1 1 0 0 0-2 0v2a1 1 0 0 0 2 0v-2z" />
        </symbol>
      </svg>
      <div className={`alert alert-${data} align-items-center`} id="alert" role="alert">
        <div className="d-flex">
          <svg className="bi flex-shrink-0 me-2" width={24} height={24} role="img" aria-label="Success:">
            <use xlinkHref={data === "success" ? "#check-circle-fill" : "#info-circle-fill"} />
          </svg>
          <div className="ml-1">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
