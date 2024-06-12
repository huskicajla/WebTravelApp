/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";

function Highlight() {
  const[destination, setDestination] = useState([]);
  useEffect(() => {
      const getDestination = async () => {
          try{
              const res = await axios.get("http://localhost:4001/destination");
              const data = res.data.filter((data) => data.category === "disc");
              console.log(data);
              setDestination(data);
          } catch (error) {
              console.log(error);
          }
      };
      getDestination();
  }, []);


var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
  <>
  <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
    <div>
        <h1 className="font-semibold text-xl pb-2">Last minute and discounts</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex sit repellat voluptas labore! Fugit autem libero amet saepe unde. Et perferendis molestias, quos quis rerum ducimus corrupti obcaecati modi praesentium!</p>
    </div>

    <div>
      <Slider {...settings}>
        {destination.map((item) => (
          <Cards item={item} key={item.id} />
        ))}
      </Slider>
    </div>
  </div>
  
  </>
  )
}

export default Highlight;