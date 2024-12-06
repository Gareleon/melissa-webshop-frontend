import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { clearFavorites } from "../../redux/features/favorites/favoritesSlice";
import ProductCard from "../soaps/ProductCard";
import { BsArrowDownRight, BsArrowRight } from "react-icons/bs";

function Favotires() {
  const favoritesItems = useSelector((state) => state.favorites.favoritesItems);
  const totalItems = favoritesItems.length;
  const dispatch = useDispatch();

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };
  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-medium text-gray-900">
              Omiljeni proizvodi
            </h1>
            <div className="ml-3 flex h-7 items-center ">
              <button
                type="button"
                onClick={handleClearFavorites}
                className="relative py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
              >
                <span className="">Ukloni sve</span>
              </button>
            </div>
          </div>

          <div className="mt-8 ">
            {favoritesItems.length > 0 ? (
              <div
                id="products-container"
                className="inline-grid h-fit w-full grid-rows-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 xl:gap-y-8 items-start justify-evenly gap-4"
              >
                {favoritesItems?.map((product) => (
                  <ProductCard key={product._id} soap={product} />
                ))}
              </div>
            ) : (
              <div className="min-h-96 flex flex-col justify-center items-center text-xl">
                <Link
                  to="/"
                  className="font-medium text-primary hover:text-secondary"
                >
                  <p>
                    Dodaj proizvode <BsArrowRight className="inline-block" />
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="w-full text-right text-xl font-medium text-gray-900">
            <p>Ukupno predmeta: {totalItems}</p>
          </div>
          <div className="mt-6 w-full flex flex-col justify-between gap-5 items-center lg:items-end text-sm text-gray-500 ">
            <Link to="/cart" className="w-full lg:w-fit">
              <button
                type="button"
                className="font-medium w-full lg:w-fit btn-secondary "
              >
                Korpa
              </button>
            </Link>
            <Link to="/">
              <p className="font-medium text-indigo-500 hover:underline-offset-4 hover:underline hover:text-indigo-400">
                Nastavak kupovine
                <span aria-hidden="true"> &rarr;</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favotires;
