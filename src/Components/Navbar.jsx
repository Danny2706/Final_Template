import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full  top-0 z-20">
      <div className="hidden md:flex justify-between items-center px-16 py-6">
        {/* Left Links */}
        <ul className="flex gap-12 text-lg font-medium text-[#f3e1c1]">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About me</Link>
          </li>
          <li>
            <Link to="/service">Service</Link>
          </li>
        </ul>

        {/* Right Links */}
        <ul className="flex gap-12 text-lg font-medium text-[#f3e1c1]">
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex justify-between items-center px-6 py-4">
        <button
          className="text-[#f3e1c1] text-2xl z-30"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#01252a] dark:bg-[#0f1c1f] ${
          isOpen ? "max-h-60 py-6" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-[#f3e1c1] text-lg">
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About me
            </Link>
          </li>
          <li>
            <Link to="/service" onClick={() => setIsOpen(false)}>
              Service
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;