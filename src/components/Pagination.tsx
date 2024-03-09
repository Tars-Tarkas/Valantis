import React from "react";
import Pagination from "react-bootstrap/Pagination";

type PaginationPostsType = {
  totalPage: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: (current: number) => void;
};

export const PaginationCards: React.FC<PaginationPostsType> = ({
  totalPage,
  postPerPage,
  currentPage,
  setCurrentPage,
}): JSX.Element => {
  let items = [];
  let pageLength = Math.ceil(totalPage / postPerPage);

  if (currentPage > 1) {
    items.push(
      <Pagination.First key="first" onClick={() => setCurrentPage(1)} />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage(currentPage - 1)}
      />
    );
    items.push(<Pagination.Ellipsis key="prev_ellipsis" disabled />);
  }

  for (
    let number = currentPage;
    number <= currentPage + 3 && number <= pageLength;
    number++
  ) {
    items.push(
      <Pagination.Item
        onClick={() => setCurrentPage(number)}
        key={number}
        data-page={number}
        active={number === currentPage}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (currentPage < pageLength) {
    items.push(<Pagination.Ellipsis key="next_ellipsis" disabled />);
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    );
    items.push(
      <Pagination.Last key="last" onClick={() => setCurrentPage(pageLength)} />
    );
  }

  return (
    <Pagination className="d-flex justify-content-center">{items}</Pagination>
  );
};
