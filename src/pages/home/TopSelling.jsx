import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../soaps/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllSoapsQuery } from "../../redux/features/soaps/soapsApi";
import categories from "./data";
import Loading from "../../components/Loading";

function TopSelling() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: soaps = [], isLoading } = useFetchAllSoapsQuery();

  const filteredSoaps = useMemo(() => {
    return selectedCategory === ""
      ? soaps
      : soaps.filter((soap) => soap.category === selectedCategory);
  }, [soaps, selectedCategory]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-10">
      {/*Heading and Category Filter*/}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full h-fit">
        <div className="h-fit w-fit">
          <h2 className="text-secondary text-3xl font-bold ">Najprodavanije</h2>
          <div className="h-1 w-full bg-gradient-primary-secondary mb-6 mt-1"></div>
        </div>
        {/* Category Filter */}
        <div className="w-fit h-fit mb-8 flex items-center">
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
      {/*SWIPER PREVIEW*/}
      <div>
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
            1250: { slidesPerView: 4, spaceBetween: 50 },
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
