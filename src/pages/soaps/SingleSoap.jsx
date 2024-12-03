import React from "react";
import { useParams, Link } from "react-router";
import { useFetchSoapByIdQuery } from "../../redux/features/soaps/soapsApi";
import { getImgUrl } from "../../utils/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { retry } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

function SingleSoap() {
  const { id } = useParams();
  const { data: soap = [], isLoading, isError } = useFetchSoapByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <p>Proizvod se učituje...</p>;
  }
  if (isError) {
    return <pr>Greška prilikom učitavanja proizvoda...</pr>;
  }

  return (
    <div className=" rounded-lg transition-shadow duration-300">
      <h1 className="text-xl font-semibold hover:text-secondary mb-3">
        {soap?.title}
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-2">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/soaps/${soap._id}`}>
            <img
              src={`${getImgUrl(soap?.coverImage)}`}
              alt=""
              className="img-fluid md:h-[18rem] md:w-[15rem]  bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div className="h-full grid grid-rows-3 grid-cols-1 justify-between items-center gap-2">
          <p className="text-gray-600 mb-5">Opis: {soap?.description}</p>
          <p className="text-gray-600 mb-5">
            Objavljen: {new Date(soap?.createdAt).toLocaleDateString()}
          </p>
          <p className="font-medium mb-5">
            {"$"}
            {soap?.newPrice}
            <span className="line-through font-normal ml-2">
              {"$"}
              {soap?.oldPrice}
            </span>
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleAddToCart(soap)}
              className="bg-primary h-fit w-fit text-white rounded-md p-3 flex items-center gap-1 hover:text-white hover:bg-secondary "
            >
              <FiShoppingCart className="size-7" />
              <span className="font-semibold">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSoap;
