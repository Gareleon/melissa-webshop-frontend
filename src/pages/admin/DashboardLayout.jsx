import { Link, Outlet, useNavigate } from "react-router";
import { useRef, useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaWarehouse } from "react-icons/fa6";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null); // Reference to the menu container
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <div className="flex-grow text-gray-800">
        <header className="relative h-fit w-full flex justify-center items-center text-gray-500 bg-gray-800 px-2 md:px-5 lg:px-10">
          {/* Menu button */}
          <button
            onClick={handleToggleMenu}
            className="block flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full"
          >
            <span className="sr-only z-50">Meni</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          {/* Search bar */}
          <div
            className={`absolute left-12 md:left-16 lg:left-24 h-fit w-fit p-1 mt-1 text-gray-500 bg-gray-800 transition-all duration-1000 ease-in-out transform ${
              isMenuOpen
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 -translate-x-full pointer-events-none"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              role="search"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
            />
          </div>
          {/* Menu items Left side*/}
          <nav className={`inline-grid grid-cols-3 mx-2 gap-4 `}>
            <Link
              to="/dashboard"
              className="mr-2 inline-block w-fit h-fit text-purple-600 bg-white rounded-lg"
            >
              <span className="sr-only">Kontrolna Tabla</span>
              <RiDashboardHorizontalFill className="size-7" />
            </Link>
            <Link
              to="/dashboard/add-new-soap"
              className="mr-2 inline-block w-fit h-fit hover:text-gray-400 hover:bg-gray-700  focus:bg-white rounded-lg focus:text-purple-600"
            >
              <MdLibraryAdd className="size-7" />
              <span className="sr-only">Kreiraj proizvod</span>
            </Link>
            <Link
              to="/dashboard/manage-soaps"
              className="inline-block w-fit h-fit hover:text-gray-400 hover:bg-gray-700  focus:bg-white rounded-lg focus:text-purple-600"
            >
              <FaWarehouse className="size-7" />
              <span className="sr-only"> Upravljaj proizvodima</span>
            </Link>
          </nav>
          {/* Menu items right side */}
          <div className={` flex flex-shrink-0 items-center ml-auto `}>
            <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
              <span className="sr-only">Korisnički meni</span>
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span className="font-semibold">Ime i prezime</span>
                <span className="text-sm text-gray-600">Administrator</span>
              </div>
              <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/13.jpg"
                  alt="user profile photo"
                  className="h-full w-full object-cover"
                />
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="hidden sm:block h-6 w-6 text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="border-l pl-3 ml-3 space-x-1">
              <button
                onClick={handleLogout}
                className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
              >
                <span className="sr-only">Odjava</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="p-6 sm:p-10 space-y-6 ">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Kontrolna tabla
              </h1>
              <h2 className="text-gray-600 ml-0.5">Invertar proizvoda</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <Link
                to="/dashboard/manage-soaps"
                className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Upravljaj proizvodima
              </Link>
              <Link
                to="/dashboard/add-new-soap"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md md:ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Kreiraj novi proizvod
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
