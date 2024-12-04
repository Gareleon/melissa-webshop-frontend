import React, { useEffect, useState } from "react";
import ProductCard from "../soaps/ProductCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllSoapsQuery } from "../../redux/features/soaps/soapsApi";

function Recommended() {
  const { data: soaps = [] } = useFetchAllSoapsQuery();
  return (
    <div className="pb-16">
      <h2 className="text-3xl font-semibold mb-6">Preporučeno za tebe</h2>
      <Swiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1250: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {soaps.length > 0 &&
          soaps.slice(8, 18).map((soap, index) => (
            <SwiperSlide key={soap._id}>
              <ProductCard soap={soap} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Recommended;
