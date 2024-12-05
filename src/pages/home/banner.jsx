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
    <div className="h-screen sm:h-fit w-full flex flex-col-reverse  items-center justify-between md:flex-row md:gap-5 p-3 pt-20 sm:py-16  lg:gap-40 2xl:px-52 2xl:gap-32 bg-banner-bg bg-cover bg-bottom">
      <div className="py-3 px-2 w-full flex-col justify-center items-center md:w-1/2 lg:px-4 lg:py-3 text-white bg-secondary bg-opacity-70 rounded-lg">
        <h1 className="text-3xl md:text-5xl  font-bold mb-7">Dobrodošli</h1>
        <p className="mb-10 fs-1 font-medium ">
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
          className="mySwiper rounded-md"
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
