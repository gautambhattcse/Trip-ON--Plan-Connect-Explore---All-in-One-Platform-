import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px]text-center mt-16">
        <span className="text-[#48b2f8]">Trip-ON:</span> <span class="headline">Plan, Connect, Explore</span> 
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
