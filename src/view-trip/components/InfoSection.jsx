import { Button } from "@/components/ui/button2";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";


function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      // console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div>
      <img
        src={photoUrl?photoUrl:"/placeholder.jpg"}
        alt="placeholder-pic"
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                🗓️ {trip?.userSelection?.noOfDays} Day
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                💸 {trip?.userSelection?.budget} Budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                😎 Travelers count: {trip?.userSelection?.traveler}
              </h2>
            </div>
            <div>
              <Button className="flex items-center"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
