import './SliderHome.less';
import {useEffect, useState} from "react";

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Mousewheel, Pagination} from 'swiper/modules';

export function SliderHome() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('/api/get-image-hp-slider')
        .then(res => res.json())
        .then(data => setFiles(data.filteredFiles))
        .catch(err => console.error('Errore:', err));
    }, []);


    return (
        <>
            <Swiper
                className="mySwiper"
                direction={'vertical'}
                modules={[Pagination, Mousewheel]}
                mousewheel={true}
                pagination={{clickable: true}}
            >
                {files.map(file => (
                    <SwiperSlide key={file}>
                        <div className="single-slide">
                            <img src={`/imagePersonalWebsite/Home/${file}`} alt={file}/>
                            <div className="slide-gradient"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </>
    );

}
