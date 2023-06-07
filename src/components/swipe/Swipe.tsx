import React from 'react';
import './Swipe.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function Swipe({ imagesUrl }: { imagesUrl: String[] }) {
  return (
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {imagesUrl.map((singleImageUrl) => {
        return (
          <SwiperSlide key={singleImageUrl as string}>
            <img className="swipe-image" src={singleImageUrl as string}></img>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Swipe;
