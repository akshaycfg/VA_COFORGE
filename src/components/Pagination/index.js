import React from "react";
import "./index.scss";

const Pagination = ({ nPages = 1, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1)?.keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item" onClick={goToPrevPage}>
          <a className="page-link" href="#">
            &lt;
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            onClick={() => setCurrentPage(pgNumber)}
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""} `}
          >
            <a className="page-link" href="#">
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={goToNextPage} href="#">
            &gt;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
