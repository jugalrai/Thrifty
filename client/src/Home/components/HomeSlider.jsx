import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import "./HomeSliderStyle.css";

export default function HomeSlider() {
  var img1 = "https://i.pinimg.com/564x/a7/0e/a9/a70ea960f50d2d8afa0d81b16e6690f6.jpg"
  var img2 = "https://i.pinimg.com/564x/70/a2/7c/70a27c2aa141d943c3a4b397fff94afb.jpg"
  var img3 = "https://i.pinimg.com/564x/7b/8d/44/7b8d44ebcf95f46baeccf792c00771b2.jpg"
  var img4 = "https://icms-image.slatic.net/images/ims-web/4965cc7c-9333-4e8a-a634-acf951964627.jpg"
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide style={{backgroundColor: '#6F4E53 '}}>
          <img src={img1} alt="slideimg"  />
        </SwiperSlide>
        <SwiperSlide style={{backgroundColor: '#516493 '}}>
          <img src={img2} alt="slideimg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundColor: '#A94B31 '}}>
          <img src={img3} alt="slideimg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
