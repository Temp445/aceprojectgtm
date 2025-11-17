"use client";
import { FC, useState } from "react";
import Link from "next/link";
import {
  House,
  Star,
  DollarSign,
  FileText,
  Menu,
  X,
  Calendar,
  LayoutList,
  BookDown 
} from "lucide-react";
import { useTranslations } from "next-intl";

const Navbar: FC = () => {
  const t = useTranslations('Navbar')
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex items-center justify-between md:pt-3 lg:pb-10 px-4 md:px-0  relative">
        <div className="md:flex items-center hidden ">
          <Link href="/" className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2b2d42] flex gap-1">
            <span className="mt-2">AceProject </span>
          </Link>
        </div>

        <div className="hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/#features"
            className="flex items-center text-[#2b2d42]  border border-white  text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:border hover:border-[#2b2d42]  hover:scale-105"
          >
            <Star className="w-4 h-4 mr-2" />
            {t('Features')}
          </Link>

          <Link
            href="/#pricing"
            className="flex items-center text-[#2b2d42]  border border-white   text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:border hover:border-[#2b2d42]  hover:scale-105"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            {t('Pricing')}
          </Link>

          <Link
            href="/book-demo"
            className="flex items-center text-[#2b2d42] border border-white  text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:border hover:border-[#2b2d42]  hover:scale-105"
          >
            <FileText className="w-4 h-4 mr-2" />
            {t('BookDemo')}
          </Link>

          <Link
           href="/AceProject_Brochure.pdf"
            className="md:hidden lg:flex items-center text-[#2b2d42]  border border-white   text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:border hover:border-[#2b2d42] hover:scale-105"
            download="/AceProject_Brochure.pdf" >
            <BookDown className="w-4 h-4 mr-2" />
            {t('Brochure')}
          </Link>
        </div>

        {isMenuOpen && (
          <div className="fixed bottom-14 md:top-full left-0.5 right-10 bg-white shadow-lg rounded py-4 px-6 z-50 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-800 hover:text-orange-600 text-base font-semibold"
              >
                <House className="w-4 h-4 mr-2" />
                {t('Home')}
              </Link>
              <Link
                href="/#features"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-800 hover:text-orange-600 text-base font-semibold"
              >
                <Star className="w-4 h-4 mr-2" />
                {t('Features')}
              </Link>

              <Link
                href="/#pricing"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-800 hover:text-orange-600 text-base font-semibold"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {t('Pricing')}
              </Link>

              <Link
                href="/book-demo"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-800 hover:text-orange-600 text-base font-semibold"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t('Contact')}
              </Link>

              <Link
               href="/AceProject_Brochure.pdf"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-800 hover:text-orange-600 text-base font-semibold"
                download="/AceProject_Brochure.pdf"
              >
                <BookDown className="w-4 h-4 mr-2" />
                {t('Brochure')}
              </Link>

              <Link
                href="https://acesoft.in/products"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-800 hover:text-orange-600 text-base font-semibold"
              >
                <LayoutList className="w-4 h-4 mr-2" />
                {t('AllProducts')}
              </Link>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="https://project.acesoftcloud.in/login"
            className="border  hover:underline hover:text-blue-700 hover:bg-white text-[#2b2d42] px-3 py-1 md:px-2 lg:px-6 xl:py-2 rounded-md font-medium  transition"
          >
            {t('SignIn')}
          </Link>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0  flex justify-between items-center  md:hidden z-[100]">
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center text-gray-100"
          aria-label="Toggle Menu"
        >
          <div className="w-12 h-12  bg-gray-400 flex items-center justify-center">
            <Menu className="w-6 h-6" />
          </div>
        </button>

        <Link
          href="https://project.acesoftcloud.in/login"
          className="flex flex-col items-center justify-center text-white w-full"
        >
          <span className="w-full h-12  bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center">
            {t('SignIn')}
          </span>
        </Link>

        <Link
          href="/#contact"
          className="flex flex-col items-center justify-center text-gray-600"
        >
          <div className="w-12 h-12  bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
            <Calendar className="w-5 h-8 text-white" />
          </div>
        </Link>
      </div>

      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default Navbar;
