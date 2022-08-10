import ReactPaginate from "react-paginate";
// Interfaces
import { PaginationProps } from "./interfaces";

const Pagination = ({ handlePageClick, totalPages, page }: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >> "
      previousLabel="<< Previous"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      forcePage={page}
      className="pagination"
      previousClassName="pagination__button"
      previousLinkClassName="pagination__button-label"
      pageClassName="pagination__pages"
      pageLinkClassName="pagination__pages-label"
      disabledClassName="pagination__button--disabled"
      disabledLinkClassName="pagination__button-label--disabled"
      nextClassName="pagination__button"
      nextLinkClassName="pagination__button-label"
      activeClassName="pagination__pages--active"
      activeLinkClassName="pagination__pages-label--active"
      breakClassName="pagination__pages"
      breakLinkClassName="pagination__pages-label"
    />
  );
};
export default Pagination;
