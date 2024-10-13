/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import OptionCard from "../components/OptionCard";
import TabButtons from "../components/TabButtons";

const DetailShirt = () => {
  const { shirtID } = useParams();
  const basePrice = 15;
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
  const [price, setPrice] = useState(basePrice);
  const [selectedOptions, setSelectedOptions] = useState(baseSelectedOption);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response1 = await fetch("http://localhost:3001/api/options");
        const response2 = await fetch(`http://localhost:3001/api/shirts/${shirtID}`);

        if (!response1.ok && !response2.ok) {
          throw new Error("Network response was not ok");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();

        const newSelectedOption = {
          size: "",
          color: "",
          design: "",
          material: "",
        };

        Object.keys(data2).forEach((option) => {
          if (option in newSelectedOption) {
            newSelectedOption[option] = data2[option];
          }
        });

        const newPrice = calculatePrice(options, data2)
        
        setOptions(data1);
        setShirtName(data2.name);
        setSelectedOptions(newSelectedOption);
        setPrice(newPrice);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOptions();
  }, [options, shirtID]);

  const calculatePrice = (options, shirt) => {
    let newPrice = basePrice;

    options.designOptions.forEach((option) => {
      if (option.design === shirt.design) {
        newPrice += option.price;
      }
    });

    options.materialOptions.forEach((option) => {
      if (option.material === shirt.material) {
        newPrice += option.price;
      }
    });

    return newPrice
  }

  // Function to render options based on the active tab
  const renderOptions = () => {
    switch (activeTab) {
      case "Size":
        return (
          <OptionCard options={options.sizeOptions} optionName={"size"} isPriced={false} selectedOptions={selectedOptions} />
        );
      case "Color":
        return (
          <OptionCard options={options.colorOptions} optionName={"color"} isPriced={false} selectedOptions={selectedOptions} />
        );
      case "Design":
        return (
          <OptionCard options={options.designOptions} optionName={"design"} isPriced={true} selectedOptions={selectedOptions} />
        );
      case "Material":
        return (
          <OptionCard
            options={options.materialOptions}
            optionName={"material"}
            isPriced={true}
            selectedOptions={selectedOptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-500 text-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-4xl font-bold">{shirtName}</div>
        <div className="flex space-x-4">
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
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

        <div className="space-x-4">
          <Link to={`/edit/${shirtID}`}>
            <button className="btn bg-red-600 text-white text-xl px-6 rounded-md hover:bg-black">Update</button>
          </Link>
          <Link to="/shirts">
            <button className="btn bg-red-600 text-white text-xl px-6 rounded-md hover:bg-black">Done</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailShirt;
