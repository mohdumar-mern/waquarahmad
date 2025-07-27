// components/Pagination.jsx
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (left > 2) pages.unshift("...");
    if (right < totalPages - 1) pages.push("...");

    pages.unshift(1);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const handleClick = (page) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        ⏮ First
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        ◀ Prev
      </button>

      {generatePageNumbers().map((page, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-black text-white" : "hover:bg-gray-100"
          } ${page === "..." && "cursor-default"}`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Next ▶
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Last ⏭
      </button>
    </div>
  );
};

export default Pagination;
