import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const userNavigation = [
  { name: "Kontrolna tabla", href: "/dashboard" },
  { name: "Moje porudžbine", href: "/orders" },
  { name: "Korpa", href: "/cart" },
  { name: "Plaćanje", href: "/check-out" },
];

export const Navbar = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const numberOfCartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logOut } = useAuth();
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  const handleLogOut = () => {
    logOut();
    setUserDropDown(false); // Close dropdown after logging out
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropDown(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-gradient-primary-secondary rounded-sm shadow-lg ">
      <nav className="flex justify-between items-center  max-w-screen-2xl mx-auto px-4 py-2 text-white ">
        {/*Left Side*/}
        <div className="flex justify-evenly items-center md:gap-16 gap-1">
          <Link to="/">
            <FaBars className="size-6" />
          </Link>
          {/*Search Input*/}
          <div className="hidden sm:block relative sm:w-72 w-40 space-x-2 ">
            <BiSearchAlt className="size-5 absolute top-2.5 inline-block left-3" />
            <input
              type="text"
              placeholder="Pretraži proizvode"
              className=" bg-slate-800 bg-opacity-30 placeholder:text-slate-200 w-full lg:text-[1rem] py-2 md:px-8 pl-7 rounded-md focus:outline-none text-[0.9rem]"
            />
          </div>
        </div>
        {/*Right Side*/}
        <div className="flex justify-between items-center md:space-x-3 space-x-2 relative">
          {currentUser ? (
            <>
              <button onClick={() => setUserDropDown(!userDropDown)}>
                <img
                  src="https://randomuser.me/api/portraits/men/13.jpg"
                  alt="Avatar user image"
                  className={`size-7 rounded-full ${
                    currentUser
                      ? "ring-2 ring-primary hover:ring-cyan-700 duration-200"
                      : ""
                  }`}
                />
              </button>
              {/*Show DropDown*/}
              {userDropDown && (
                <div
                  ref={dropdownRef} // Assigning the ref to the dropdown
                  className="absolute top-9 right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40"
                >
                  <ul className="py-2 text-gray-900 ">
                    {userNavigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="px-4 py-2 block text-sm hover:bg-slate-100"
                          onClick={() => setUserDropDown(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 block text-sm hover:bg-slate-100 hover:text-red-500"
                        onClick={handleLogOut}
                      >
                        Odjavi se
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <FaRegUser className="size-7" />
            </Link>
          )}
          <Link to="/favorites">
            <button className="hidden sm:block">
              <FaRegHeart className="size-7" />
            </button>
          </Link>
          <Link
            to="/cart"
            className="relative bg-primary pl-2 pr-5 pt-3 py-1 w-fit flex items-center rounded-sm text-white"
          >
            <IoMdCart className="size-7" />
            <span className="absolute bottom-4 right-2 text-[1.2rem] font-semibold ">
              {numberOfCartItems.length > 0 ? numberOfCartItems.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
