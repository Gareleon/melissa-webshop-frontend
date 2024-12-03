import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../soaps/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllSoapsQuery } from "../../redux/features/soaps/soapsApi";

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

function TopSelling() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: soaps = [], isLoading } = useFetchAllSoapsQuery();

  const filteredSoaps = useMemo(() => {
    return selectedCategory === ""
      ? soaps
      : soaps.filter((soap) => soap.category === selectedCategory);
  }, [soaps, selectedCategory]);

  if (isLoading) {
    return <p>Učitavanje proizvoda...</p>;
  }

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Najprodavanije</h2>
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
      <div>
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1250: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredSoaps.length > 0 ? (
            filteredSoaps.map((soap) => (
              <SwiperSlide key={soap._id}>
                <ProductCard soap={soap} />
              </SwiperSlide>
            ))
          ) : (
            <p>Nema proizvoda u traženoj kategoriji.</p>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default TopSelling;
