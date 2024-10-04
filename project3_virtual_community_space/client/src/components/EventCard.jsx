/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function EventCard(props) {
  const { event } = props;

  function formatDate(eventTime) {
    const date = new Date(eventTime);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract year, month, and day
    const year = date.getUTCFullYear();
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();

    return `${month} ${day}, ${year}`;
  }

  function eventCountdown(eventTime) {
    // Create Date objects for the current time and the event time
    const currentDate = new Date();
    const eventDate = new Date(eventTime);

    // If the event is in the past, return an informative string
    if (eventDate < currentDate) {
      return {error: "The event has already occurred"};
    }

    // Calculate the year and month difference
    let months = (eventDate.getFullYear() - currentDate.getFullYear()) * 12;
    months += eventDate.getMonth() - currentDate.getMonth();

    // Calculate the day difference
    let days = eventDate.getDate() - currentDate.getDate();

    // Adjust if days are negative
    if (days < 0) {
      // Reduce the month count
      months -= 1;

      // Calculate the number of days in the previous month
      const previousMonth = new Date(eventDate.getFullYear(), eventDate.getMonth(), 0);
      days += previousMonth.getDate(); // Add the days from the previous month
    }

    return { months, days };
  }

  const eventTimeCountdown = eventCountdown(event.date)

  return (
    <div className=" min-w-40 w-64">
      <div
        className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
        style={{ backgroundImage: `url(${event.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <h2 className="text-white text-xl font-semibold mb-2">{event.name}</h2>
          <p className="text-white text-lg mb-2">{event.location}</p>
          <p className="text-white text-lg mb-2">{`${formatDate(event.date)} - ${event.starttime}`}</p>
          <p className="text-white text-lg">
            {eventTimeCountdown.error
              ? eventTimeCountdown.error
              : `${eventTimeCountdown.months} ${eventTimeCountdown.months === 1 ? "month" : "months"}, ${eventTimeCountdown.days} ${eventTimeCountdown.days === 1 ? "day" : "days"}`}
          </p>
        </div>
      </div>
    </div>
  );
}
