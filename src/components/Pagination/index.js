import { Link, useLocation } from "react-router-dom";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const location = useLocation();

  const formatUrl = (page) => {
    const getkeyword = location.search === "";

    if (location.search.includes("page=")) {
      const urlWithoutLastChar = location.search.slice(0, -1);
      return `${location.pathname}${urlWithoutLastChar}${page}`;
    }

    return getkeyword ? `${location.pathname}?page=${page}` : `${location.pathname}${location.search}&page=${page}`;
  };

  const getPageRange = (denta = 2) => {
    let range = [];

    const start = Math.max(1, Number(currentPage) - denta);
    const end = Math.min(Number(totalPages), Number(currentPage) + denta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <div className="row justify-content-between">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ml-auto">
        <div className="dt-paging">
          <nav aria-label="pagination">
            <ul className="pagination">
              {/* First Page Button */}
              <li className={`dt-paging-button page-item ${Number(currentPage) === 1 ? "disabled" : ""}`}>
                <Link
                  to={formatUrl(1)}
                  className="page-link first"
                  aria-controls="dataTeachers"
                  aria-label="First"
                  // onClick={() => handlePageClick(1)}
                >
                  Đầu
                </Link>
              </li>

              {/* Previous Page Button */}
              <li className={`dt-paging-button page-item ${Number(currentPage) === 1 ? "disabled" : ""}`}>
                <Link
                  to={formatUrl(Number(currentPage) - 1)}
                  className="page-link previous"
                  aria-controls="dataTeachers"
                  aria-label="Previous"
                >
                  Trước
                </Link>
              </li>
              {/* Ellipsis */}
              {totalPages > 5 && currentPage > 3 && (
                <li className="dt-paging-button page-item disabled">
                  <Link className="page-link ellipsis" aria-controls="dataTeachers" aria-disabled="true" tabIndex={-1}>
                    …
                  </Link>
                </li>
              )}
              {/* Page Numbers */}
              {getPageRange().map((page) => (
                <li key={page} className={`dt-paging-button page-item ${Number(currentPage) === page ? "active" : ""}`}>
                  <Link to={formatUrl(page)} className="page-link" aria-controls="dataTeachers">
                    {page}
                  </Link>
                </li>
              ))}

              {/* Ellipsis */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <li className="dt-paging-button page-item disabled">
                  <Link className="page-link ellipsis" aria-controls="dataTeachers" aria-disabled="true" tabIndex={-1}>
                    …
                  </Link>
                </li>
              )}

              {/* Next Page Button */}
              <li
                className={`dt-paging-button page-item ${Number(currentPage) === Number(totalPages) ? "disabled" : ""}`}
              >
                <Link
                  to={formatUrl(Number(currentPage) + 1)}
                  className="page-link next"
                  aria-controls="dataTeachers"
                  aria-label="Next"
                >
                  Tiếp
                </Link>
              </li>

              {/* Last Page Button */}
              <li
                className={`dt-paging-button page-item ${Number(currentPage) === Number(totalPages) ? "disabled" : ""}`}
              >
                <Link
                  to={formatUrl(totalPages)}
                  className="page-link last"
                  aria-controls="dataTeachers"
                  aria-label="Last"
                >
                  Cuối
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
