import "swiper/css/effect-coverflow";
import "./Swipe.css";
import "swiper/css";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import dogCard from "../../utils/images/dogCard.avif";

// Import Swiper React components

// Import Swiper styles

//untill i have backend

function Swipe({ IMAGE }: { IMAGE: String[] }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      breakpoints={{
        800: {
          slidesPerView: 2,
        },
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      initialSlide={1}
      className="mySwiper"
    >
      {IMAGE.map((singleImage) => {
        console.log(singleImage);
        return (
          //fix the key ! its not individual
          <SwiperSlide key={Math.random() * Math.random()}>
            <img className="swipe-image" src={dogCard}></img>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Swipe;
