import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Explore These Incredible Spots</h2>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.places.map((place, placeIndex) => (
                <div key={placeIndex} className="">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.best_time_to_visit}
                  </h2>

                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
