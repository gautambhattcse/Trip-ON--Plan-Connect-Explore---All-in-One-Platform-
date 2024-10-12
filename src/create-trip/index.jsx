// import React, { useState, useEffect } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { LoadScriptNext } from "@react-google-maps/api";
// import { Input } from "@/components/ui/input";
// import { AI_PROMPT, SelectBudgetList, SelectTravelsList } from "@/constants/options";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { chatSession } from "@/service/AiModel";

// function CreateTrip() {
//   const [place, setPlace] = useState();
//   const [formData, setFormData] = useState([]);

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const onGenerateTrip=async()=>{
//     if(formData?.noOfDays>5&&!formData?.location||!formData?.budget||!formData?.traveler)
//     {
//       toast("Please fill all details correctly!")
//       return ;
//     }
//     console.log(formData);

//     const Final_Prompt=AI_PROMPT.replace('{location}',formData?.location?.label)
//     .replace('{totalDays}',formData?.noOfDays)
//     .replace('{traveler}',formData?.traveler)
//     .replace('{budget}',formData?.budget)
//     .replace('{totalDays}',formData?.noOfDays)

//     console.log(Final_Prompt);

//     const result=await chatSession.sendMessage(Final_Prompt);
//     console.log(result?.response?.text());
//   }


//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
//       <h2 className="font-bold text-3xl">
//         Your trip, your way! Tell us your preferences🧳✈️📍
//       </h2>
//       <p className="mt-3 text-gray-500 text-xl">
//         Tell us your travel style, and we will create a personalized trip just
//         for you—simple, effortless, and tailored to your preferences.
//       </p>

//       <div className="mt-20 flex flex-col gap-10">
//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             Pick your spot—where's your next trip?
//           </h2>

//           {/* Use LoadScriptNext to improve performance */}
//           <LoadScriptNext
//             googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             libraries={["places"]}
//           >
//             <GooglePlacesAutocomplete
//               selectProps={{
//                 onChange: (v) => {
//                   setPlace(v);
//                   console.log(v);
//                   handleInputChange("location", v);
//                 },
//               }}
//             />
//           </LoadScriptNext>
//         </div>
//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             Let us know the number of days for your trip!
//           </h2>
//           <Input
//             placeholder={"Ex.3 (Maximum: 5)"}
//             type="number"
//             onChange={(e) => handleInputChange("noOfDays", e.target.value)}
//           />
//         </div>
//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             What’s your preferred budget?
//           </h2>
//           <div className="grid grid-cols-3 gap-5 mt-5">
//             {SelectBudgetList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={()=>handleInputChange('budget',item.title)}
//                 className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
//                   ${formData?.budget==item.title&&'shadow-lg border-black'}
//                   `}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             Who are you planning to explore with?
//           </h2>
//           <div className="grid grid-cols-3 gap-5 mt-5">
//             {SelectTravelsList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={()=>handleInputChange('traveler',item.people)}
//                 className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
//                   ${formData?.traveler==item.people&&'shadow-lg border-black'}
//                   `}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="my-10 flex justify-end">
//         <Button onClick={onGenerateTrip}>Generate Trip {"🚀"}</Button>
//       </div>
//     </div>
//   );
// }

// export default CreateTrip;












import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetList, SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});

  // Fetch location suggestions from LocationIQ API
  const fetchLocationSuggestions = async (input) => {
    if (!input) return;
    
    const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${input}&limit=5&format=json`;

    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      if (error.response?.status === 429) {
        toast("Too many requests. Please slow down!");
      } else {
        console.error("Error fetching location suggestions:", error);
      }
    }
  };

  const debouncedFetchSuggestions = debounce(fetchLocationSuggestions, 500);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
    debouncedFetchSuggestions(e.target.value);
  };

  const onGenerateTrip = async () => {
    if (formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details correctly!");
      return;
    }

    const Final_Prompt = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log(Final_Prompt);

    const result = await chatSession.sendMessage(Final_Prompt);
    console.log(result?.response?.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Your trip, your way! Tell us your preferences 🧳✈️📍
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Tell us your travel style, and we will create a personalized trip just for you—simple, effortless, and tailored to your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Pick your spot—where's your next trip?</h2>
          <Input
            placeholder="Enter a place"
            value={place}
            onChange={handlePlaceChange}
          />
          {suggestions.length > 0 && (
            <ul className="mt-3 border border-gray-300 rounded-lg">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setPlace(suggestion.display_name);
                    handleInputChange("location", suggestion.display_name);
                    setSuggestions([]);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Let us know the number of days for your trip!</h2>
          <Input
            placeholder="Ex. 3 (Maximum: 5)"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What’s your preferred budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Who are you planning to explore with?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData?.traveler === item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={onGenerateTrip}>Generate Trip {"🚀"}</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
