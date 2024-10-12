import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: New Delhi, for 3 Days for Couple with a Cheap budget , Give me a Hotels options list with HotelName, Hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, ticket Pricing, rating, Time Travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotel_options": [\n    {\n      "hotel_name": "The Metropolitan Hotel & Spa",\n      "hotel_address": "19, Ashoka Road, Connaught Place, New Delhi, Delhi 110001",\n      "price": "$50 - $80 per night",\n      "hotel_image_url": "https://www.themetropolitanhotel.com/images/gallery/gallery-img-1.jpg",\n      "geo_coordinates": "28.6328° N, 77.2185° E",\n      "rating": "4.5 stars",\n      "description": "A centrally located hotel with modern amenities and a spa."\n    },\n    {\n      "hotel_name": "Hotel The Manor",\n      "hotel_address": "1, Safdarjung Enclave, New Delhi, Delhi 110029",\n      "price": "$40 - $60 per night",\n      "hotel_image_url": "https://www.themanorhotel.in/images/gallery/gallery-img-1.jpg",\n      "geo_coordinates": "28.5672° N, 77.2245° E",\n      "rating": "4 stars",\n      "description": "A budget-friendly hotel with comfortable rooms and a convenient location."\n    },\n    {\n      "hotel_name": "The Bloom Hotel",\n      "hotel_address": "10, Tolstoy Marg, New Delhi, Delhi 110001",\n      "price": "$30 - $50 per night",\n      "hotel_image_url": "https://www.thebloomhotel.com/images/gallery/gallery-img-1.jpg",\n      "geo_coordinates": "28.6340° N, 77.2192° E",\n      "rating": "3.5 stars",\n      "description": "A basic hotel with clean rooms and a good location for exploring the city."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "Day 1",\n      "places": [\n        {\n          "place_name": "Red Fort",\n          "place_details": "A UNESCO World Heritage Site and a must-visit for its historical significance.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Red_Fort_Delhi.jpg/1200px-Red_Fort_Delhi.jpg",\n          "geo_coordinates": "28.6560° N, 77.2399° E",\n          "ticket_pricing": "₹ 20 for Indians, ₹ 500 for foreigners",\n          "rating": "4.5 stars",\n          "time_travel": "2 hours",\n          "best_time_to_visit": "Sunrise to sunset"\n        },\n        {\n          "place_name": "Chandni Chowk",\n          "place_details": "A bustling market offering everything from street food to traditional handicrafts.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Chandni_Chowk_Delhi.jpg/1200px-Chandni_Chowk_Delhi.jpg",\n          "geo_coordinates": "28.6485° N, 77.2301° E",\n          "ticket_pricing": "N/A",\n          "rating": "4 stars",\n          "time_travel": "1 hour",\n          "best_time_to_visit": "Early morning or evening to avoid crowds"\n        },\n        {\n          "place_name": "Jama Masjid",\n          "place_details": "The largest mosque in India, a beautiful example of Mughal architecture.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Jama_Masjid_Delhi.jpg/1200px-Jama_Masjid_Delhi.jpg",\n          "geo_coordinates": "28.6498° N, 77.2343° E",\n          "ticket_pricing": "Free entry, shoes must be removed",\n          "rating": "4.5 stars",\n          "time_travel": "1 hour",\n          "best_time_to_visit": "Morning or evening"\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "places": [\n        {\n          "place_name": "Humayun\'s Tomb",\n          "place_details": "A UNESCO World Heritage Site and a beautiful example of Mughal architecture.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Humayuns_Tomb_Delhi.jpg/1200px-Humayuns_Tomb_Delhi.jpg",\n          "geo_coordinates": "28.6131° N, 77.2306° E",\n          "ticket_pricing": "₹ 30 for Indians, ₹ 600 for foreigners",\n          "rating": "4.5 stars",\n          "time_travel": "2 hours",\n          "best_time_to_visit": "Morning or evening"\n        },\n        {\n          "place_name": "Lotus Temple",\n          "place_details": "A unique and modern temple dedicated to all religions.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Lotus_Temple_Delhi.jpg/1200px-Lotus_Temple_Delhi.jpg",\n          "geo_coordinates": "28.5532° N, 77.2583° E",\n          "ticket_pricing": "Free entry",\n          "rating": "4.5 stars",\n          "time_travel": "1 hour",\n          "best_time_to_visit": "Any time of day"\n        },\n        {\n          "place_name": "India Gate",\n          "place_details": "A war memorial dedicated to the Indian soldiers who died in World War I.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/India_Gate_Delhi.jpg/1200px-India_Gate_Delhi.jpg",\n          "geo_coordinates": "28.6129° N, 77.2294° E",\n          "ticket_pricing": "Free entry",\n          "rating": "4 stars",\n          "time_travel": "1 hour",\n          "best_time_to_visit": "Evening for a beautiful view"\n        }\n      ]\n    },\n    {\n      "day": "Day 3",\n      "places": [\n        {\n          "place_name": "Qutub Minar",\n          "place_details": "The tallest brick minaret in the world and a UNESCO World Heritage Site.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Qutub_Minar_2008.jpg/1200px-Qutub_Minar_2008.jpg",\n          "geo_coordinates": "28.5840° N, 77.1734° E",\n          "ticket_pricing": "₹ 30 for Indians, ₹ 600 for foreigners",\n          "rating": "4.5 stars",\n          "time_travel": "2 hours",\n          "best_time_to_visit": "Morning or evening"\n        },\n        {\n          "place_name": "National Museum",\n          "place_details": "A museum housing a vast collection of Indian art and artifacts.",\n          "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/National_Museum_Delhi.jpg/1200px-National_Museum_Delhi.jpg",\n          "geo_coordinates": "28.6128° N, 77.2260° E",\n          "ticket_pricing": "₹ 10 for Indians, ₹ 500 for foreigners",\n          "rating": "4 stars",\n          "time_travel": "2 hours",\n          "best_time_to_visit": "Morning or afternoon"\n        }\n      ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
