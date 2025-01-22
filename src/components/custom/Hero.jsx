import React from "react";
import { Button } from "../ui/button2";
import { Link } from "react-router-dom";


function Hero() {
  return (
    <div className="flex flex-col items-center w-full gap-9 ">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#038C4C]">Trip-ON:</span> <span className="headline">Plan, Connect, Explore</span> 
        - All in One Platform!
      </h1>

      <p className="text-xl text-gray-500 text-center">
        "Discover new destinations, collaborate with travel buddies, and let AI
        handle the details. Whether you're exploring solo or with friends,
        Trip-On is your ultimate travel companion."
      </p>
      
      <Link to={'/create-trip'}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Hero;



// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// // VideoSlider.js
// import React from "react";
// import Slider from "react-slick";

// const VideoSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const videos = [
//     {
//       id: 1,
//       src: "https://www.example.com/video1.mp4",
//       title: "Amazing Beaches",
//       description: "Experience the serenity of pristine beaches.",
//     },
//     {
//       id: 2,
//       src: "https://www.example.com/video2.mp4",
//       title: "Mountain Adventures",
//       description: "Conquer the heights and enjoy breathtaking views.",
//     },
//     {
//       id: 3,
//       src: "https://www.example.com/video3.mp4",
//       title: "City Escapes",
//       description: "Explore vibrant cityscapes and hidden gems.",
//     },
//   ];

//   return (
//       <div className="w-full py-10 bg-red-50">
//         <Slider {...settings}>
//           {videos.map((video) => (
//             <div key={video.id} className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
//               <video
//                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
//                 controls
//                 loop
//                 muted
//                 src={video.src}
//               >
//                 Your browser does not support the video tag.
//               </video>
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-4 rounded text-center">
//                 <h3 className="text-white text-xl font-bold">{video.title}</h3>
//                 <p className="text-gray-200">{video.description}</p>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//   );
// };

// export default VideoSlider;
