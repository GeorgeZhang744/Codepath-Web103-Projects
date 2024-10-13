/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";

import ShirtCard from "../components/ShirtCard";

function AllShirts() {
  const basePrice = 15;
  const [shirts, setShirts] = useState([]);
  const [designOptions, setDesignOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);

  useEffect(() => {
    const getShirts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/shirts");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setShirts(data);
      } catch (err) {
        console.error(err);
      }
    };

    const getPriceOptions = async () => {
      try {
        const response1 = await fetch("http://localhost:3001/api/options/designs");
        const response2 = await fetch("http://localhost:3001/api/options/materials");

        if (!response1.ok && !response2) {
          throw new Error("Network response was not ok");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();

        setDesignOptions(data1);
        setMaterialOptions(data2);
      } catch (err) {
        console.error(err);
      }
    };

    getShirts();
    getPriceOptions();
  }, []);

  return (
    <div className="bg-gray-500 text-white min-h-screen p-8 space-y-8">
      {shirts.map((shirt, idx) => {
        let price = basePrice;

        designOptions.forEach((option) => {
          if (option.design === shirt.design) {
            price += option.price;
          }
        });

        materialOptions.forEach((option) => {
          if (option.material === shirt.material) {
            price += option.price;
          }
        });

        return <ShirtCard key={idx} shirt={shirt} price={price} />;
      })}
    </div>
  );
}

export default AllShirts;
