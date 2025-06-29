import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const FreeCourses = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("/list.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5%",
    slidesToShow: 1,
    speed: 500,
    dots: true,
    focusOnSelect:true
  };
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-[5%]">
      <h1 className="font-semibold text-xl pb-2">Free Courses</h1>
      <p>Checkout our free courses and enchance your knowledge.</p>
      <div className="slider-container">
        <Slider {...settings}>
          {items
            .filter(
              (item) => item.price === 0 || item.category.includes("free")
            )
            .map((item) => (
              <div className="" key={item.id}>
                <center>
                  <Card
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    price={item.price}
                  />
                </center>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default FreeCourses;
