"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  { title: "HOME", path: "/" },
  { title: "ABOUT", path: "/about" },
  { title: "SERVICES", path: "/services" },
  { title: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black border-b border-gray-600 shadow-md bg-opacity-90">

      <div className="container flex flex-wrap items-center justify-between px-4 py-3 mx-auto">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-white">IBILLS</span>{" "}
          <span className="text-red-600">AUTO LANKA</span>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 text-white border border-white rounded hover:text-red-500 hover:border-red-500"
          >
            {navbarOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="hidden space-x-6 md:flex md:items-center">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              href={link.path}
              title={link.title}
              className="text-sm font-medium text-white hover:text-red-500"
            />
          ))}

          {/* Sign In / Sign Up Buttons */}
          <Link
            href="/login"
            className="text-sm font-medium text-white hover:text-red-500"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {navbarOpen && (
        <MenuOverlay links={navLinks}>
          <div className="flex flex-col mt-4 space-y-3">
            <Link href="/login" className="text-white hover:text-red-500">
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-center text-white bg-red-600 rounded hover:bg-red-700"
            >
              Sign Up
            </Link>
          </div>
        </MenuOverlay>
      )}
    </nav>
  );
};

export default Navbar;
