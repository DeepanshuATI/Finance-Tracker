import React, { useState, useEffect } from 'react';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSideMenu && !event.target.closest('.sidebar-container') && !event.target.closest('.menu-button')) {
        setOpenSideMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openSideMenu]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openSideMenu]);

  return (
    <>
      <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-40'>
        {/* Animated Hamburger Menu Button - Always visible */}
        <button
          className='menu-button relative w-8 h-8 focus:outline-none group'
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label="Toggle menu"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6">
            {/* Top line */}
            <span
              className={`block absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                openSideMenu ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            {/* Middle line */}
            <span
              className={`block absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                openSideMenu ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Bottom line */}
            <span
              className={`block absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                openSideMenu ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </div>
        </button>

        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
      </div>

      {/* Overlay backdrop - Always available */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          openSideMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpenSideMenu(false)}
      />

      {/* Sliding Sidebar - Always slides from left */}
      <div
        className={`sidebar-container fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          openSideMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button inside sidebar */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
          <button
            onClick={() => setOpenSideMenu(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="overflow-y-auto h-[calc(100%-73px)]">
          <SideMenu activeMenu={activeMenu} onMenuClick={() => setOpenSideMenu(false)} />
        </div>
      </div>
    </>
  );
};

export default Navbar;