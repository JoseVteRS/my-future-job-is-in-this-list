import Link from 'next/link';
import React from 'react';
import LoggedNavbar from '../components/ui/Navbars/LoggedNavbar';
import UnLoggedNavbar from '../components/ui/Navbars/UnLoggedNavbar';

const MainLayout = ({ children }) => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <UnLoggedNavbar />
      <section className={`container mx-auto`}>{children}</section>
    </main>
  );
};

export default MainLayout;
