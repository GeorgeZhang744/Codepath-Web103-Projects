/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from "react";

import EventCard from '../components/EventCard';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/events");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full mx-auto px-8 py-20">
      <h1 className="text-5xl font-bold mb-6">Event List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <li key={event.id} className="bg-white shadow-md rounded-lg p-4">
            <EventCard key={event.id} event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
