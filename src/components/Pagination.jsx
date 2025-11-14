import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ButtonComponent from './common/ButtonComponent';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  
  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-8">
      {/* Previous Button */}
      <ButtonComponent
        text="Previous"
        icon={ChevronLeft}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50 pointer-events-none'
            : 'bg-gray-800 hover:bg-red-600'
        }`}
      />

      {/* Page Numbers */}
      <div className="flex gap-2">
        {getPageNumbers().map((page, index) => (
          <ButtonComponent
            key={index}
            text={page.toString()}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`min-w-[45px] ${
              page === currentPage
                ? 'bg-red-600 font-bold'
                : page === '...'
                ? 'bg-transparent text-gray-400 cursor-default pointer-events-none'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <ButtonComponent
        text="Next"
        icon={ChevronRight}
        onClick={() => onPageChange(currentPage + 1)}
        className={`flex-row-reverse ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50 pointer-events-none'
            : 'bg-gray-800 hover:bg-red-600'
        }`}
      />
    </div>
  );
}

export default Pagination