import React, {useState, useEffect} from "react";
import {SliderHome} from "../../components/SliderHome/SliderHome";

export function HomePage() {
    const [images, setImages] = useState([]);

    // Use local emulator in development, and production URL otherwise
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:5001/massimilianoforesti-3914-5d676/us-central1'
        : 'https://massimilianoforesti-3914-5d676.web.app';

    useEffect(() => {
        fetch(`${baseUrl}/api/get-latest-images`)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.files) {
                setImages(data.files);
            }
        })
        .catch((error) => console.error("Error fetching latest images:", error));
    }, [baseUrl]);

    return (
        <div>
            <SliderHome images={images}/>
        </div>
    );
}
