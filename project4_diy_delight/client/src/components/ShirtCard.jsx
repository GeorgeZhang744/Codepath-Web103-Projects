/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { Link } from "react-router-dom";

function ShirtCard(props) {
  const { shirt, price } = props;

  return (
    <div className="bg-gray-800 max-w-screen-2xl mx-auto h-60 text-white rounded-lg px-20 shadow-lg flex justify-between items-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col justify-center space-y-4">
        <h1 className="flex text-2xl font-bold">
          <div aria-label="t-shirt" className="mb-2 mr-1">
            👕
          </div>
          <div className="my-auto">{shirt.name}</div>
        </h1>

        <div className="grid grid-cols-2 gap-4 gap-x-20 text-lg text-center">
          <p className="flex">
            <span role="img" aria-label="size" className="mr-2">
              📏
            </span>
            <p>
              <strong>Size:</strong> {shirt.size}
            </p>
          </p>
          <p className="flex">
            <span role="img" aria-label="color" className="mr-2">
              🎨
            </span>
            <p>
              <strong>Color:</strong> {shirt.color}
            </p>
          </p>

          <p className="flex">
            <span role="img" aria-label="design" className="mr-2">
              🖊️
            </span>
            <p>
              <strong>Design:</strong> {shirt.design}
            </p>
          </p>
          <p className="flex">
            <span role="img" aria-label="material" className="mr-2">
              🧵
            </span>
            <p>
              <strong>Material:</strong> {shirt.material}
            </p>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-4">
        <div className="flex items-center space-x-2 text-3xl font-bold">
          <span role="img" aria-label="money bag">
            💰
          </span>
          <span>${price.toFixed(2)}</span>
        </div>
        <Link to={`/shirts/${shirt.id}`}>
          <button className="btn bg-red-600 text-white text-lg font-bold px-4 py-2 rounded-md hover:bg-black">DETAILS</button>
        </Link>
      </div>
    </div>
  );
}

export default ShirtCard;
