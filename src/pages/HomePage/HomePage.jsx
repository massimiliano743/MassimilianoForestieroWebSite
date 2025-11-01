import {useEffect, useState} from "react";
import {SliderHome} from "../../components/SliderHome/SliderHome.jsx";

export function HomePage() {
    const [images, setImages] = useState([]);
    
    // Use local emulator in development, and production URL otherwise
    const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://127.0.0.1:5001/massimilianoforesti-3914-5d676/us-central1' 
        : 'https://massimilianoforesti-3914-5d676.web.app';

    useEffect(() => {
        fetch(`${baseUrl}/api/get-latest-images`)
            .then(res => res.json())
            .then(data => {
                if(data.files) {
                    setImages(data.files);
                }
            })
            .catch(err => console.error('API Error:', err));
    }, []);

    return (
        <div className={'content-page-template'}>
            <div className={'home-page'}>
                <SliderHome images={images}/>
            </div>
        </div>
    );
}