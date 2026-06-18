import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Carousel = ({ children, title, subtitle }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.75;
      containerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 relative py-2">
      {/* Header */}
      <div className="flex items-end justify-between px-1">
        <div>
          {title && (
            <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex items-center gap-1.5 z-10">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 transition-colors shadow-sm"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrolling Content */}
      <div
        ref={containerRef}
        className="w-full flex gap-5 overflow-x-auto scroll-smooth py-3 px-1 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, (child) => (
          <div className="snap-start flex-shrink-0 w-72 md:w-80">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
