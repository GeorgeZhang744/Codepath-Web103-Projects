/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function TabButtons(props) {
  const tabs = ["Size", "Color", "Design", "Material"];

  const { activeTab, setActiveTab } = props
  
  return (
    <>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`btn ${
            activeTab === tab ? "bg-black text-white" : "bg-primary text-white"
          } px-6 py-2 rounded-md hover:bg-black`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </>
  );
}

export default TabButtons