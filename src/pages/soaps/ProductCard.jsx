import React from "react";
import { FiShoppingCart } from "react-icons/fi";
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
    <div className=" rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-2">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/soaps/${soap._id}`}>
            <img
              src={`${getImgUrl(soap?.coverImage)}`}
              alt={soap?.title}
              className="img-fluid md:h-[18rem] md:w-[15rem]  bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div className="h-full grid grid-rows-3 grid-cols-1 justify-between items-center gap-2">
          <Link to={`/soaps/${soap._id}`}>
            <h3 className="text-xl font-semibold hover:text-secondary mb-3">
              {soap?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {soap?.description?.length > 80
              ? `${soap?.description.slice(0, 80)}...`
              : soap?.description}
          </p>
          <p className="font-medium mb-5">
            {soap?.newPrice} {" RSD"}
            <span className="line-through font-normal ml-2">
              {soap?.oldPrice} {" RSD"}
            </span>
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleAddToCart(soap)}
              className="bg-primary h-fit w-fit text-white rounded-md p-3 flex items-center gap-1 hover:text-white hover:bg-secondary "
            >
              <FiShoppingCart className="size-7" />
              <span className="font-semibold">Dodaj u korpu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
