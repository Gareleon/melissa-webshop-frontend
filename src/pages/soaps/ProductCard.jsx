import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

function ProductCard({ soap }) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="p-2 rounded-md transition-shadow duration-300 border h-fit w-fit flex justify-center items-center">
      {/* sm:flex-row sm:items-center sm:h-72 sm:justify-center */}
      <div className="flex flex-col gap-2 h-fit w-[17rem]">
        {/*Image Column*/}
        <div className="flex justify-center items-center h-[15rem] px-1 rounded-md overflow-hidden border">
          <Link
            to={`/soaps/${soap._id}`}
            className="w-fit h-fit rounded-md hover:scale-125 duration-300 overflow-hidden"
          >
            <img
              src={`${getImgUrl(soap?.coverImage)}`}
              alt={soap?.title}
              className="w-full h-full"
            />
          </Link>
        </div>
        {/*Text Column*/}
        <div className="h-fit w-fit grid grid-rows-3 grid-cols-1 justify-around items-center">
          <Link to={`/soaps/${soap._id}`}>
            <h3 className="text-xl font-semibold hover:text-secondary">
              {soap?.title}
            </h3>
          </Link>
          <p className="text-gray-600">
            {soap?.description?.length > 80
              ? `${soap?.description.slice(0, 80)}...`
              : soap?.description}
          </p>
          <p className="font-medium">
            {soap?.newPrice} {" RSD"}
            <span className="line-through font-normal ml-2">
              {soap?.oldPrice} {" RSD"}
            </span>
          </p>
          {/*Buttons*/}
          <div className="flex justify-start items-center">
            <button
              onClick={() => handleAddToCart(soap)}
              className="bg-primary h-fit w-fit text-white rounded-md p-3 flex items-center gap-1 hover:text-white hover:bg-secondary duration-200"
            >
              <FiShoppingCart className="size-7" />
              <span className="font-semibold">Dodaj u korpu</span>
            </button>
            <button
              //onClick={() => handleAddToFavorites(soap)}
              className=" h-fit w-fit text-pink-500 p-1 flex items-center hover:text-fuchsia-500 hover:scale-110 duration-150 ml-5"
            >
              <FiHeart className="size-11" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
