import React, { useState } from "react";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const userNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/check-out" },
];

export const Navbar = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const numberOfCartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 fixed-top">
      <nav className="flex justify-between items-center">
        {/*Left Side*/}
        <div className="flex justify-evenly items-center md:gap-16 gap-1">
          <Link to="/">
            <FaBars className="size-6" />
          </Link>
          {/*Search Input*/}
          <div className=" relative sm:w-72 w-40 space-x-2">
            <BiSearchAlt className="size-5 absolute top-2.5 inline-block left-3" />
            <input
              type="text"
              placeholder="Pretraži proizvode"
              className="bg-[#EAEAEA] w-full lg:text-[1rem] py-2 md:px-8 pl-7 rounded-md focus:outline-none text-[0.9rem]"
            />
          </div>
        </div>
        {/*Right Side*/}
        <div className="flex justify-between items-center md:space-x-3 space-x-2 relative">
          <Link to={!currentUser ? "/login" : "/"}>
            {currentUser ? (
              <>
                <button onClick={() => setUserDropDown(!userDropDown)}>
                  <img
                    src="/assets/book-store-app-ui-assets-main/assets/avatar.png"
                    alt="Avatar user image"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-green-500" : ""
                    }`}
                  />
                </button>
                {/*Show DropDown*/}
                {userDropDown && (
                  <div className=" absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {userNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className=" px-4 py-2 block text-sm hover:bg-slate-100"
                            onClick={() => setUserDropDown(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 block text-sm hover:bg-slate-100"
                          onClick={handleLogOut}
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <FaRegUser className="size-6" />
            )}
          </Link>
          <button className=" hidden sm:block">
            <FaRegHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="relative bg-primary pl-2 pr-5 pt-3 py-1 w-fit  flex items-center rounded-sm text-white"
          >
            <IoMdCart className="size-7 " />
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
