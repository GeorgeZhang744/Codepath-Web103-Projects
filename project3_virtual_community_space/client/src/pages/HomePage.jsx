/* eslint-disable no-unused-vars */
import React from "react";
import LocationCard from "../components/LocationCard";

export default function HomePage() {
  const eventLocations = [
    { name: "Central Park", imageURL: "https://i.natgeofe.com/n/15ec8dec-df7c-45af-a0ae-08d4e906a134/belvedere-castle.jpg" },
    {
      name: "Downtown Community Center",
      imageURL:
        "https://www.anaheim.net/ImageRepository/Path?filePath=%2Fdocuments%5CIntranet%5C246%5C309%2FDowntown+Community+Center.jpg",
    },
    {
      name: "Riverside Theater",
      imageURL: "https://npr.brightspotcdn.com/d5/c8/6dc4f8ea497dbce5f0435b0dce7a/monday-riverside-by-ann-elise.jpg",
    },
    {
      name: "City Library",
      imageURL: "https://motivational.com/wp-content/uploads/2018/10/300-national-city-library-main-signage-4.jpg",
    },
  ];

  return (
    <div className="w-full mx-auto px-8 py-20">
      <h1 className="text-6xl font-bold text-center mb-16">Event Locations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {eventLocations.map((location) => (
          <LocationCard key={location.id} locationName={location.name} imageURL={location.imageURL} />
        ))}
      </div>
    </div>
  );
}
