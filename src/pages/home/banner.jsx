import React, { useRef, useState } from "react";
import { Link } from "react-router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

function Banner() {
  return (
    <div className="flex flex-col-reverse md:flex-row p-2 items-center justify-between shadow-sm shadow-emerald-500">
      <div className="md:w-1/2 w-full flex-col justify-center items-center lg:pr-[14rem]">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">Dobrodošli</h1>
        <p className="mb-10">
          Hemijsko-sapunska laboratorija "Melissa" (11.07.2015, god.),je
          projekat mladih čarapana na inicijativu Aleksandrić Miloša, osnivača
          udruženja građana
        </p>
        <Link to="/register">
          <button className="btn-primary text-white">
            Prijavite se i uštedite
          </button>
        </Link>
      </div>
      <div className="md:w-1/2 w-full">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/assets/photos/banner/img2.jpg" alt="Placeholder" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/photos/banner/img2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/photos/banner/img2.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
