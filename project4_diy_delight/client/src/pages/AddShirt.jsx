/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import OptionCard from "../components/OptionCard";

const AddShirt = () => {
  const [activeTab, setActiveTab] = useState("Size");
  const [shirtName, setShirtName] = useState("");
  const [price, setPrice] = useState(79.99); // Base price

  const sizeOptions = [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }];

  const colorOptions = [{ color: "Black" }, { color: "White" }, { color: "Blue" }, { color: "Red" }];

  // Sample prices for design and material options
  const designOptions = [
    { design: "Logo", price: 10 },
    { design: "Slogan", price: 5 },
    { design: "CustomText", price: 15 },
  ];

  const materialOptions = [
    { material: "Cotton", price: 0 },
    { material: "Polyester", price: 5 },
    { material: "Blend", price: 10 },
  ];

  // Function to render options based on the active tab
  const renderOptions = () => {
    switch (activeTab) {
      case "Size":
        return <OptionCard options={sizeOptions} optionName={"size"} isPriced={false} />;
      case "Color":
        return <OptionCard options={colorOptions} optionName={"color"} isPriced={false} />;
      case "Design":
        return <OptionCard options={designOptions} optionName={"design"} isPriced={true} />;
      case "Material":
        return <OptionCard options={materialOptions} optionName={"material"} isPriced={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-500 text-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`btn ${
              activeTab === "Size" ? "bg-black text-white" : "bg-primary text-white"
            } px-6 py-2 rounded-md hover:bg-black`}
            onClick={() => setActiveTab("Size")}
          >
            Size
          </button>
          <button
            className={`btn ${
              activeTab === "Color" ? "bg-black text-white" : "bg-primary text-white"
            } px-6 py-2 rounded-md hover:bg-black`}
            onClick={() => setActiveTab("Color")}
          >
            Color
          </button>
          <button
            className={`btn ${
              activeTab === "Design" ? "bg-black text-white" : "bg-primary text-white"
            } px-6 py-2 rounded-md hover:bg-black`}
            onClick={() => setActiveTab("Design")}
          >
            Design
          </button>
          <button
            className={`btn ${
              activeTab === "Material" ? "bg-black text-white" : "bg-primary text-white"
            } px-6 py-2 rounded-md hover:bg-black`}
            onClick={() => setActiveTab("Material")}
          >
            Material
          </button>
        </div>

        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={shirtName}
            onChange={(e) => setShirtName(e.target.value)}
            placeholder="Custom Shirt Name"
            className="input input-bordered text-black"
          />
          <button className="btn bg-red-600 text-white hover:bg-black">Create</button>
        </div>
      </div>

      <div className="bg-gray-900 p-6 border-2 border-red-600 rounded-lg mb-6">{renderOptions()}</div>

      <div className="flex justify-between items-center">
        <div className="bg-red-600 p-4 rounded-md text-2xl">
          <span role="img" aria-label="money">
            💰
          </span>{" "}
          ${price.toFixed(2)}
        </div>

        <button className="btn bg-red-600 text-white text-xl px-6 rounded-md hover:bg-black">Done</button>
      </div>
    </div>
  );
};

export default AddShirt;
