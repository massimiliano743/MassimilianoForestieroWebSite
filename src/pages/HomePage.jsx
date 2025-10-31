import React, { useState, useEffect } from "react";
import { SliderHome } from "../components/SliderHome/SliderHome";

export function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://massimilianoforesti-3914-5d676.web.app/api/get-latest-images")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.files) {
          setImages(data.files);
        }
      })
      .catch((error) => console.error("Error fetching latest images:", error));
  }, []);

  return (
    <div>
      <SliderHome images={images} />
    </div>
  );
}
