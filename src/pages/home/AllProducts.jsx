import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../soaps/ProductCard";
import { useFetchAllSoapsQuery } from "../../redux/features/soaps/soapsApi";

// Categories with better handling of values
const categories = [
  { label: "Izaberi kategoriju", value: "" },
  { label: "Aromaterapija", value: "aromaterapija" },
  { label: "Piling", value: "piling" },
  { label: "Osvežavajući", value: "osvežavajući" },
  { label: "Detoks", value: "detoks" },
  { label: "Hidratantni", value: "hidratantni" },
  { label: "Umirujući", value: "umirujući" },
  { label: "Luksuzni", value: "luksuzni" },
  { label: "Energizujući", value: "energizujući" },
];

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadMore, setLoadMore] = useState(6);
  const { data: soaps = [], isLoading } = useFetchAllSoapsQuery();

  function loadMoreProducts() {
    setLoadMore((prevLoadMore) => prevLoadMore + 6);
  }

  // Optimized filtering using useMemo
  const filteredSoaps = useMemo(() => {
    return selectedCategory === ""
      ? soaps
      : soaps.filter((soap) => soap.category === selectedCategory);
  }, [soaps, selectedCategory]);

  if (isLoading) {
    return <p>Učitavanje proizvoda...</p>;
  }

  return (
    <div className="">
      <h2 className="text-3xl font-semibold mb-6">Svi proizvodi</h2>
      {/* Category Filter */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-slate-200 border-gray-200 rounded-md p-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        {/* Product Grid */}
        <div
          id="products-container"
          className="inline-grid h-fit grid-rows-2 md:gap-3 lg:grid-cols-2 2xl:grid-cols-3 w-full items-center justify-center gap-4 d-block"
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
