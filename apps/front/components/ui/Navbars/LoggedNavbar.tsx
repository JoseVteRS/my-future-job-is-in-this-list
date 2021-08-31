import Link from 'next/link';
import React from 'react';

const LoggedNavbar = () => {
  return (
    <nav className="w-full bg-gray-300 text-gray-700 uppercase font-medium text-sm mb-8 p-2 shadow-md">
      <div className="flex justify-between h-full items-center space-x-2 px-8">
        <Link href="https://github.com/JoseVteRS/my-future-job-is-in-this-list">
          <a target="_blank" rel="noopener noreferrer">
            Repositorio github
          </a>
        </Link>

        <div>
            Jose
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;