"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = ({ products }) => {
    return (
        <Swiper
            speed={1000}
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="mySwiper h-full"
            style={{
                "--swiper-navigation-color": "#111",
                "--swiper-navigation-size": "30px",
                "--swiper-pagination-color": "#111",
            }}
        >
            <SwiperSlide>
                <img
                    src="./images/productA.webp"
                    alt="Image 1"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="./images/productB.jpg"
                    alt="Image 2"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;
