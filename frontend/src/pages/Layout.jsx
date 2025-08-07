import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import SideBar from '../components/SideBar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="h-screen w-full">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full px-8 h-14 flex items-center justify-between bg-white border-b border-gray-200 z-50">
        <img
          src={assets.logo}
          alt="logo"
          className="cursor-pointer w-32 sm:w-44"
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X onClick={() => setSidebar(false)} className="w-6 h-6 text-gray-600 sm:hidden" />
        ) : (
          <Menu onClick={() => setSidebar(true)} className="w-6 h-6 text-gray-600 sm:hidden" />
        )}
      </nav>

      {/* Sidebar */}
      <SideBar sidebar={sidebar} setSidebar={setSidebar} />

      {/* Main Content */}
      <main className="ml-50 pt-14 min-h-screen bg-[#f4f7fb] overflow-y-auto transition-all duration-300">
        <div className="p-6 sm:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
