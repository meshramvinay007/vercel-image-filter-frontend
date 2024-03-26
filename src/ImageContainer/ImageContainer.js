import React, { useEffect, useState } from "react";
import "./ImageContainer.css";
import axios from "axios";
import Loading from "../Loading/Loading";

const ImageContainer = ({
  images,
  totalPages,
  currentPage,
  loading,
  handlePageChange,
}) => {
  const pagesToShow = 10;

  const calculatePageRange = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = currentPage - halfPagesToShow;
    let endPage = currentPage + halfPagesToShow;

    if (startPage <= 0) {
      startPage = 1;
      endPage = pagesToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - pagesToShow + 1;
      if (startPage <= 0) {
        startPage = 1;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <>
      <div className="container">
        {!loading ? (
          <>
            <div className="pagination-container">
              <button
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {!calculatePageRange().find((range) => range === 1) && (
                <>
                  <button
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </button>
                  ...
                </>
              )}

              {calculatePageRange().map((pageNumber) => (
                <button
                  className="pagination-button"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={pageNumber === currentPage}
                  style={{
                    fontWeight: currentPage === pageNumber ? "bold" : "normal",
                  }}
                >
                  {pageNumber}
                </button>
              ))}
              {!calculatePageRange().find((range) => range === totalPages) && (
                <>
                  ...
                  <button
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
            <div className="image-container">
              {images.map((img) => (
                <img className="image" src={img.cocoUrl} alt="" />
              ))}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default ImageContainer;
