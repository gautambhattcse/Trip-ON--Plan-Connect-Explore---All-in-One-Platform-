import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel, index }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotel_name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotel_name +
        "," +
        hotel?.hotel_address
      }
      target="_blank"
    >
      <div
        key={index}
        className="hover:scale-105 transition-all cursor-pointer my-5"
      >
        <img
          src={photoUrl?photoUrl:"/placeholder.jpg"}
          alt="placeholder-image"
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2 ">
          <h2 className="font-medium">{hotel?.hotel_name}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotel_address}</h2>
          <h2 className="text-sm">💸 {hotel?.price}</h2>
          <h2 className="text-sm">🌟 {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
