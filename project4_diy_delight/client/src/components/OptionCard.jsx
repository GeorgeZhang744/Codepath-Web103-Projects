/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function OptionCard(props) {
  const { options, optionName, isPriced } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {options.map((option, index) => {
        const imagePath = `/src/assets/${option[optionName]}.png`;

        return (
          <div
            key={index}
            className="card bg-primary text-white rounded-md p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <div className="h-full bg-gray-300 mb-2">
              <img
                src={imagePath}
                alt={`${option[optionName]} T-shirt`}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xl text-center">{option[optionName]}</span>
            {isPriced && <p className="text-lg text-yellow-400 mt-2">+${option.price}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default OptionCard;
