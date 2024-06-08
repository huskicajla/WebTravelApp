/* eslint-disable no-unused-vars */
import React from "react";
import list from "../../public/list.json";
import { Link } from "react-router-dom";
import Cards from "./Cards";

function Destination() {
    console.log(list);
  return (
    <>
        <div 
            className= "max-w-screen-2xl container mx-auto md:px-20 px-4"
        >
            <div
                className="mt-28 items-center justify-center text-center"
            >
                <h1 className="text-2xl  md:text-4xl">
                    Happy to see you{" "}
                    <span className="text-pink-500"> here :)</span>
                </h1>
                <Link to="/">
                    <button 
                        className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
                    >
                        Go back to HomePage
                    </button>
                </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
                {
                    list.map((item) => (
                        <Cards key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    </>
  );
}

export default Destination;