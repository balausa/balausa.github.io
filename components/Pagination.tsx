import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div.attrs({
  className: "flex items-center justify-center my-4",
})``;

const PageButton = styled.button.attrs({
  className: "mx-1 px-4 py-2 border rounded",
})<{ active?: boolean }>`
  ${({ active }) =>
    active
      ? `bg-blue-600 text-white border-blue-600`
      : `bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white`};
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = [];
  const delta = 2;
  const startPage = Math.max(2, currentPage - delta);
  const endPage = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (startPage > 2) {
    pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push("...");
  }

  pages.push(totalPages);

  return (
    <PaginationWrapper>
      <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
        Назад
      </PageButton>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="mx-1">
            ...
          </span>
        ) : (
          <PageButton
            key={page}
            onClick={() => onPageChange(Number(page))}
            active={page === currentPage}
          >
            {page}
          </PageButton>
        )
      )}
      <PageButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Вперед
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
