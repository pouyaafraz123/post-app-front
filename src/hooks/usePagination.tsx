import { useState } from "react";

export interface IPagination {
  currentPage: number;
  maxPage: number;
  resultsPerPage: number;
}

// hook that manage pagination
function usePagination() {
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    maxPage: 1,
    resultsPerPage: 10,
  });

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.maxPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleGotoPage = (page: number) => {
    if (page > 0 && page <= pagination.maxPage) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  const handleResultsPerPageChange = (
    resultsPerPage: number,
    totalResultsCount?: number
  ) => {
    setPagination({
      currentPage: 1,
      maxPage: totalResultsCount
        ? Math.floor(totalResultsCount / resultsPerPage) + 1
        : 1,
      resultsPerPage,
    });
  };

  const updateMaxPage = (maxPage: number) => {
    setPagination((prev) => ({
      ...prev,
      maxPage,
    }));
  };

  return {
    pagination,
    handlePreviousPage,
    handleNextPage,
    handleGotoPage,
    handleResultsPerPageChange,
    updateMaxPage,
  };
}

export default usePagination;
