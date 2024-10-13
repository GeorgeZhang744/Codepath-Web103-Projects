/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";

import OptionCard from "../components/OptionCard";

const AddShirt = () => {
  const basePrice = 15.0;
  const baseSelectedOption = {
    size: "",
    color: "",
    design: "",
    material: "",
  };

  const [activeTab, setActiveTab] = useState("Size");
  const [shirtName, setShirtName] = useState("");
  const [options, setOptions] = useState({
    sizeOptions: [],
    colorOptions: [],
    designOptions: [],
    materialOptions: [],
  });
  const [price, setPrice] = useState(basePrice); // Base price
  const [selectedOptions, setSelectedOptions] = useState(baseSelectedOption);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/options");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setOptions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOptions();
  }, []);

  const onSelectOption = (optionName, optionValue) => {
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[optionName] = optionValue;

    let newPrice = basePrice;

    options.designOptions.forEach((option) => {
      if (option.design === newSelectedOptions.design) {
        newPrice += option.price;
      }
    });

    options.materialOptions.forEach((option) => {
      if (option.material === newSelectedOptions.material) {
        newPrice += option.price;
      }
    });

    setSelectedOptions(newSelectedOptions);
    setPrice(newPrice);
  };

  // Function to render options based on the active tab
  const renderOptions = () => {
    switch (activeTab) {
      case "Size":
        return (
          <OptionCard
            options={options.sizeOptions}
            optionName={"size"}
            isPriced={false}
            selectedOptions={selectedOptions}
            onSelect={onSelectOption}
          />
        );
      case "Color":
        return (
          <OptionCard
            options={options.colorOptions}
            optionName={"color"}
            isPriced={false}
            selectedOptions={selectedOptions}
            onSelect={onSelectOption}
          />
        );
      case "Design":
        return (
          <OptionCard
            options={options.designOptions}
            optionName={"design"}
            isPriced={true}
            selectedOptions={selectedOptions}
            onSelect={onSelectOption}
          />
        );
      case "Material":
        return (
          <OptionCard
            options={options.materialOptions}
            optionName={"material"}
            isPriced={true}
            selectedOptions={selectedOptions}
            onSelect={onSelectOption}
          />
        );
      default:
        return null;
    }
  };

  const reset = () => {
    setShirtName("")
    setActiveTab("Size")
    setSelectedOptions(baseSelectedOption);
    setPrice(basePrice)
  }

  const createShirt = async () => {
    try {
      for (const option of Object.keys(selectedOptions)) {
        if (!selectedOptions[option]) {
          alert(`Please select the ${option} for your T-shirt!`);
          return;
        }
      }

      const shirt = {
        name: shirtName,
        ...selectedOptions,
      };

      console.log(shirt)

      const response = await fetch("http://localhost:3001/api/shirts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shirt),
      });

      reset();
    } catch (err) {
      console.error(err);
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
          <button className="btn bg-red-600 text-white hover:bg-black" onClick={createShirt}>
            Create
          </button>
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
