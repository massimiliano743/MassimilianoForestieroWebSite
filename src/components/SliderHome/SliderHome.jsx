import './SliderHome.less';
import { Ribbon } from "../Ribbon/Ribbon";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// The component now accepts 'images' as a prop
export function SliderHome({ images }) {
    const oggettoPrincipale = {
        slide1: {
            title: "Welcome to My photography portal",
            subtitle: "a good snapshot keeps a moment from running away",
            ribbonText: "Take a look!",
            ribbonLink: "/mario"
        },
        slide2: {
            title: "Landscape",
            subtitle: "",
            ribbonText: "Take a look!",
            ribbonLink: "/mario"
        },
        slide3: {
            title: "sports activities",
            subtitle: "",
            ribbonText: "Take a look!",
            ribbonLink: "/mario"
        },
        slide4: {
            title: "ARCHITECTURE PHOTOGRAPHY",
            subtitle: "",
            ribbonText: "Take a look!",
            ribbonLink: "/mario"
        },
        slide5: {
            title: "CITY PHOTOGRAPHY",
            subtitle: "",
            ribbonText: "Take a look!",
            ribbonLink: "/mario"
        }
    };

    // The internal fetch is removed, as we now get images from props.

    return (
        <>
            <Swiper
                className="mySwiper"
                direction={'vertical'}
                modules={[Pagination, Mousewheel, Keyboard]}
                mousewheel={true}
                pagination={{ clickable: true }}
                keyboard={true}
            >
                {/* We map over the 'images' prop now */}
                {images && images.map((file, idx) => {
                    const slideKey = `slide${idx + 1}`;
                    const slideData = oggettoPrincipale[slideKey];
                    return (
                        <SwiperSlide key={file}>
                            <div className="single-slide">
                                <img src={file} alt={`Slide ${idx + 1}`} />
                                <div className="slide-gradient"></div>
                                <div className={'text-and-ribbon'}>
                                    <div className="slide-text fade-bottom">
                                        <h1 className={"uppercase"}>{slideData?.title}</h1>
                                        <h3 className={"uppercase"}>{slideData?.subtitle}</h3>
                                    </div>
                                    <Ribbon
                                        color={'bg-white'}
                                        textColor={'text-black'}
                                        textRibbon={slideData?.ribbonText}
                                        position={'bottom-left'}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
