/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import OptionCard from "../components/OptionCard";
import TabButtons from "../components/TabButtons";

const EditShirt = () => {
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

        const newPrice = calculatePrice(options, data2);

        setOptions(data1);
        setShirtName(data2.name);
        setSelectedOptions(newSelectedOption);
        setPrice(newPrice);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    return newPrice;
  };

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

  const updateShirt = async () => {
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

      const response = await fetch(`http://localhost:3001/api/shirts/${shirtID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shirt),
      });

      window.location = "/shirts";
    } catch (err) {
      console.error(err);
    }
  };

  const deleteShirt = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/shirts/${shirtID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location = "/shirts";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-500 text-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={shirtName}
            onChange={(e) => setShirtName(e.target.value)}
            placeholder="Custom Shirt Name"
            className="input input-bordered text-black"
          />
          <button className="btn bg-red-600 text-white hover:bg-black" onClick={updateShirt}>
            Update
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

        <div className="space-x-4">
          <button className="btn bg-red-600 text-white text-xl px-6 rounded-md hover:bg-black" onClick={deleteShirt}>
            Delete
          </button>
          <Link to={`/shirts/${shirtID}`}>
            <button className="btn bg-red-600 text-white text-xl px-6 rounded-md hover:bg-black">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditShirt;
