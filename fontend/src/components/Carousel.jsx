import React, { useState, useEffect } from "react";
import Cou1Image from "../assets/Cou1.jpg";
import Cou2Image from "../assets/Cou2.jpeg";
import Cou3Image from "../assets/Cou3.png";

const carouselItems = [
  {
    id: 1,
    src: Cou1Image,
    title: "Sony",
    description: "Sony Phone",
  },
  {
    id: 2,
    src: Cou2Image,
    title: "Sony",
    description: "Camera Product",
  },
  {
    id: 3,
    src: Cou3Image,
    title: "Sony",
    description: "Play Station 5",
  },
];

export default function CarouselDefault() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={item.src}
            alt={`carousel-${index}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-20 left-0 w-full text-white text-center">
            <h5 className="text-xl font-bold">{item.title}</h5>
            <p className="text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
