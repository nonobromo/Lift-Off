function Pagination({ currentPage, setCurrentPage, pagesToDisplay }) {
  const handleNextPage = () => {
    if (currentPage === pagesToDisplay) {
      return;
    }
    setCurrentPage((num) => num + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((num) => num - 1);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => handlePreviousPage()}
          >
            <i className="bi bi-arrow-90deg-left"></i>
          </a>
        </li>
        <li className="page-item">
          <a
            className={`page-link ${
              currentPage === pagesToDisplay ? "disabled" : ""
            }`}
            onClick={() => handleNextPage()}
          >
            <i className="bi bi-arrow-90deg-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
