import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Top-Rated Hotels in the Area</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
            <HotelCardItem hotel={hotel} index={index}/>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
