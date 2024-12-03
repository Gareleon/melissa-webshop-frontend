import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="">
      {/* Basic Footer Section */}
      <div className="bg-gray-800 flex-row pl-8 md:flex md:pl-0 justify-evenly align-middle  items-center mt-10 py-5 text-white">
        {/* Mobile Number */}
        <div className="mb-4 md:mb-0">
          <div className="size-9 inline-block mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
              <path d="M15 7a2 2 0 0 1 2 2"></path>
              <path d="M15 3a6 6 0 0 1 6 6"></path>
            </svg>
          </div>
          <div className="inline-block">
            <Link to="#">+381 601519995</Link>
            <p>Pon-Pet 9-18h</p>
          </div>
        </div>

        {/* Location */}
        <div className="mb-4 md:mb-0">
          <div className="size-9 inline-block mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5"></path>
              <path d="M9 4v13"></path>
              <path d="M15 7v5.5"></path>
              <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z"></path>
              <path d="M19 18v.01"></path>
            </svg>
          </div>
          <div className="inline-block">
            <Link to="#">SAVE ŠUMANOVIĆA 5</Link>
            <p>37000, Kruševac, RS</p>
          </div>
        </div>

        {/* Email address */}
        <div className="">
          <div className="size-9 inline-block mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
              <path d="M3 7l9 6l9 -6"></path>
            </svg>
          </div>
          <div className="inline-block">
            <Link to="#">+381 653317335</Link>
            <p>Online support</p>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className=" bg-gray-400 text-white">
        <div className=" py-4 text-center flex-row justify-center items-center md:flex md:justify-evenly">
          <div className="">
            <p>Connect with us on social media</p>
          </div>
          <div className="flex gap-5 mt-3 mb-2 justify-center align-middle">
            <Link to="">
              <FaFacebook className="size-7" />
            </Link>
            <Link to="">
              <FaSquareInstagram className="size-7" />
            </Link>
            <Link to="">
              <FaLinkedin className="size-7" />
            </Link>
            <Link to="">
              <FaYoutube className="size-7" />
            </Link>
          </div>
        </div>
      </div>

      {/* Company Info */}

      <div className="grid grid-cols-1 grid-rows-1 py-5 px-4 w-full  gap-5 md:grid-cols-2 md:justify-center lg:flex lg:justify-evenly md:px-10  bg-gray-800 text-white ">
        <div className="lg:col-span-2 lg:w-[25%]">
          <h5 className="">HEMIJSKO-SAPUNSKA LABORATORIJA MELISSA</h5>
          <hr
            className="text-black mb-3"
            style={{ width: "60px", height: "2px" }}
          />
          <p className="">
            Hemijsko-sapunska laboratorija "Melissa" (11.07.2015, god.),je
            projekat mladih čarapana na inicijativu Aleksandrić Miloša, osnivača
            udruženja građana.
          </p>
        </div>
        <div className="">
          <h5 className="">Proizvodi</h5>
          <hr
            className="bg-white mb-3"
            style={{ width: "60px", height: "2px" }}
          />
          <ul className="">
            <li>
              <Link to="">Link</Link>
            </li>
            <li>
              <Link to="">Link</Link>
            </li>
            <li>
              <Link to="">Link</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h5 className="">Useful Links</h5>
          <hr
            className="bg-white mb-3"
            style={{ width: "60px", height: "2px" }}
          />
          <ul className="">
            <li>
              <Link to="">Link</Link>
            </li>
            <li>
              <Link to="">Link</Link>
            </li>
            <li>
              <Link to="">Link</Link>
            </li>
            <li>
              <Link to="">Pomoć</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h5 className="">Kontakt</h5>
          <hr
            className="bg-white mb-3"
            style={{ width: "60px", height: "2px" }}
          />
          <ul className="">
            <li>
              <Link to="tel:+381653317335">+381/601519995</Link>
            </li>
            <li>
              <Link to="mailto:aleksandricmilos@gmail.com">
                aleksandricmilos@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="bg-white" />
      <div className="bg-gray-950 text-white text-center py-4 fw-light">
        <p>
          &copy; 2018-2024 HEMIJSKO-SAPUNSKA LABORATORIJA MELISSA. Sva prava
          zadržana. <br />
          Izradio{" "}
          <Link to="https://simplifyproblems.com" className="text-primary">
            Simplify Problems LLC
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
