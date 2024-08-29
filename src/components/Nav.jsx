import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white shadow-md">
      <div className="flex gap-8">
        <Link to="/" className="hover:underline text-lg">
          Home
        </Link>
        <Link to="/all-orders" className="hover:underline text-lg">
          Orders
        </Link>
        <Link to="/all-suppliers" className="hover:underline text-lg">
          Suppliers
        </Link>
        <Link to="/tracking" className="hover:underline text-lg">
          Track
        </Link>
      </div>
      <div className="text-3xl">
        <FaUserCircle />
      </div>
    </nav>
  );
};

export default Nav;
