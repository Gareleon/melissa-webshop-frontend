import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../soaps/ProductCard";
import { useFetchAllSoapsQuery } from "../../redux/features/soaps/soapsApi";
import Loading from "../../components/Loading";
// Categories with better handling of values
import categories from "./data";

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadMore, setLoadMore] = useState(8);
  const { data: soaps = [], isLoading } = useFetchAllSoapsQuery();

  function loadMoreProducts() {
    setLoadMore((prevLoadMore) => prevLoadMore + 8);
  }

  // Optimized filtering using useMemo
  const filteredSoaps = useMemo(() => {
    return selectedCategory === ""
      ? soaps
      : soaps.filter((soap) => soap.category === selectedCategory);
  }, [soaps, selectedCategory]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      {/*Heading and Category Filter*/}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full h-fit">
        <div className="h-fit w-fit">
          <h2 className="text-secondary text-3xl font-bold ">Svi proizvodi</h2>
          <div className="h-1 w-full bg-gradient-primary-secondary mb-6 mt-1"></div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex items-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
            id="category"
            className="border bg-slate-200 border-gray-200 rounded-md p-1 text-gray-800 focus:outline-none "
          >
            {categories.map((category, index) => (
              <option key={index} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full sm:px-10">
        {/* Product Grid */}
        <div
          id="products-container"
          className="inline-grid h-fit w-full grid-rows-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 xl:gap-y-8 items-start justify-evenly gap-4"
        >
          {filteredSoaps.length > 0 ? (
            filteredSoaps
              .slice(0, loadMore)
              .map((soap) => <ProductCard key={soap._id} soap={soap} />)
          ) : (
            <p>Nema proizvoda u traženoj kategoriji.</p>
          )}
        </div>
        {/* Load More Button */}
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className={` mt-16 ${
              loadMore >= filteredSoaps.length ? "btn-invalid" : "btn-secondary"
            }`}
            onClick={loadMoreProducts}
            disabled={loadMore >= filteredSoaps.length}
          >
            {loadMore >= filteredSoaps.length
              ? "Nema više proizvoda"
              : "Još proizvoda..."}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
