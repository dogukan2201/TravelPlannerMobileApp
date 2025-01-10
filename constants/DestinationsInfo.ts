import { ImageSourcePropType } from "react-native";
import imagesSource from "@/constants/SourceImages";

interface PlaceProps {
  name: string;
  description: string;
}
interface Destination {
  id: number;
  name: string;
  country: string;
  img: ImageSourcePropType;
  rating: number;
  description: string;
  places?: PlaceProps[];
}

const popularDestinations: Destination[] = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    img: imagesSource.paris,
    rating: 4.8,
    description:
      "Paris, the City of Light, is renowned for its fashion, art, and iconic landmarks like the Eiffel Tower. Visitors flock here to experience world-class museums like the Louvre and enjoy its romantic ambiance. \n\nThe charming streets of Paris are lined with boutique shops, cozy cafes, and fine dining restaurants offering exquisite French cuisine. Whether it's a leisurely walk along the Seine or a visit to the historic Notre-Dame Cathedral, Paris offers a perfect mix of culture and charm. \n\nKnown for its vibrant neighborhoods such as Montmartre and the Marais, Paris is also a hub of art and creativity. It's a city that inspires both artists and travelers alike.",
    places: [
      { name: "Eiffel Tower", description: "An iconic symbol of Paris." },
      { name: "Louvre Museum", description: "Home to the famous Mona Lisa." },
      { name: "Notre-Dame Cathedral", description: "A Gothic masterpiece." },
    ],
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    img: imagesSource.tokyo,
    rating: 4.9,
    description:
      "Tokyo is a bustling metropolis where cutting-edge technology meets age-old traditions. The city offers a unique blend of neon-lit skyscrapers and serene temples. \n\nVisitors can explore the vibrant districts of Shibuya and Akihabara, known for their shopping and entertainment, or find peace in tranquil gardens like Shinjuku Gyoen. \n\nTokyo is also a food lover's paradise, with a range of dining experiences from Michelin-starred restaurants to traditional ramen shops. The city's seamless mix of modernity and heritage makes it a fascinating destination.",
    places: [
      {
        name: "Shibuya Crossing",
        description: "The world's busiest intersection.",
      },
      { name: "Meiji Shrine", description: "A peaceful Shinto shrine." },
      { name: "Tokyo Tower", description: "A symbol of modern Tokyo." },
    ],
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    img: imagesSource.newYork,
    rating: 4.7,
    description:
      "New York City, often called 'The Big Apple,' is a cultural and economic powerhouse. The city's iconic skyline, anchored by landmarks like the Empire State Building and the Statue of Liberty, is instantly recognizable. \n\nFrom the bright lights of Times Square to the lush greenery of Central Park, New York offers endless attractions. The city's diverse neighborhoods, such as Brooklyn and Harlem, showcase a mix of history, art, and community spirit. \n\nAs a global hub for theater, music, and cuisine, New York provides a dynamic and unforgettable experience for travelers.",
    places: [
      { name: "Statue of Liberty", description: "A symbol of freedom." },
      { name: "Central Park", description: "A massive urban park." },
      { name: "Times Square", description: "The crossroads of the world." },
    ],
  },
  {
    id: 4,
    name: "Rome",
    country: "Italy",
    img: imagesSource.italy,
    rating: 4.6,
    description:
      "Rome, known as the Eternal City, is a treasure trove of history and art. Ancient landmarks like the Colosseum and the Roman Forum take visitors back to the grandeur of the Roman Empire. \n\nBeyond its historical sites, Rome charms with its lively piazzas, bustling markets, and vibrant street life. The Vatican City, with its awe-inspiring St. Peter's Basilica and Sistine Chapel, is a must-visit for art and history enthusiasts. \n\nFrom savoring authentic Italian gelato to dining al fresco on traditional Roman pasta, the city's culinary scene is as iconic as its architecture.",
    places: [
      { name: "Colosseum", description: "A landmark of ancient Rome." },
      {
        name: "Vatican City",
        description: "Home to the Pope and stunning art.",
      },
      { name: "Roman Forum", description: "A historic marketplace." },
    ],
  },
  {
    id: 5,
    name: "Sydney",
    country: "Australia",
    img: imagesSource.sydney,
    rating: 4.8,
    description:
      "Sydney, a stunning harbor city, is a gateway to Australia's natural and cultural wonders. The iconic Sydney Opera House and Harbour Bridge define its skyline, while its beaches, like Bondi and Manly, attract sunseekers and surfers alike. \n\nVisitors can explore Darling Harbour's vibrant attractions or enjoy a ferry ride to discover the city's beautiful coastal scenery. Sydney is also home to a thriving arts scene, with galleries, theaters, and live performances throughout the year. \n\nIts multicultural dining scene and laid-back lifestyle make Sydney a destination loved by locals and tourists alike.",
    places: [
      {
        name: "Sydney Opera House",
        description: "A world-renowned architectural marvel.",
      },
      { name: "Bondi Beach", description: "A surfer's paradise." },
      { name: "Harbour Bridge", description: "A famous steel bridge." },
    ],
  },
  {
    id: 6,
    name: "Barcelona",
    country: "Spain",
    img: imagesSource.barcelona,
    rating: 4.8,
    description:
      "Barcelona, the capital of Catalonia, is a city that dazzles with its unique blend of art, architecture, and Mediterranean vibes. From Antoni Gaudí's breathtaking Sagrada Familia to the whimsical Park Güell, the city is a masterpiece of design. \n\nThe vibrant La Rambla street offers lively markets, cafes, and street performances, while Barcelona's beaches provide the perfect escape for relaxation. \n\nKnown for its rich cultural heritage, Barcelona is also a food lover's paradise, with its tapas bars, fresh seafood, and traditional Catalan cuisine.",
    places: [
      { name: "Sagrada Familia", description: "Gaudí's iconic masterpiece." },
      {
        name: "Park Güell",
        description: "A colorful park with unique architecture.",
      },
      { name: "La Rambla", description: "A lively pedestrian street." },
    ],
  },
  {
    id: 7,
    name: "Istanbul",
    country: "Turkey",
    img: imagesSource.istanbul,
    rating: 4.7,
    description:
      "Istanbul, where East meets West, is a city of contrasts and harmony. The city's historic landmarks, such as Hagia Sophia and Topkapi Palace, reflect its rich Byzantine and Ottoman heritage. \n\nThe bustling Grand Bazaar and Spice Market offer a sensory feast of colors, scents, and sounds. Along the Bosphorus, visitors can enjoy stunning views of the city's skyline and waterfront palaces. \n\nIstanbul's vibrant street food scene, combined with its rich cultural tapestry, makes it a must-visit destination for any traveler.",
    places: [
      {
        name: "Hagia Sophia",
        description: "A historic Byzantine cathedral and mosque.",
      },
      { name: "Grand Bazaar", description: "A vibrant marketplace." },
      {
        name: "Bosphorus Strait",
        description: "A stunning waterway connecting continents.",
      },
    ],
  },
  {
    id: 8,
    name: "Cape Town",
    country: "South Africa",
    img: imagesSource.capeTown,
    rating: 4.7,
    description:
      "Cape Town, nestled between mountains and sea, is a city of breathtaking beauty and adventure. Table Mountain, a UNESCO World Heritage Site, offers panoramic views and hiking trails. \n\nVisitors can explore the Cape Winelands, visit historic Robben Island, or enjoy the city's vibrant arts and culture scene. \n\nWith its pristine beaches, diverse wildlife, and outdoor activities like shark cage diving, Cape Town is a paradise for nature lovers and thrill-seekers alike.",
    places: [
      {
        name: "Table Mountain",
        description: "A flat-topped mountain offering breathtaking views.",
      },
      {
        name: "Cape of Good Hope",
        description: "A historic maritime landmark.",
      },
      { name: "Robben Island", description: "A historic prison island." },
    ],
  },
  {
    id: 9,
    name: "Dubai",
    country: "UAE",
    img: imagesSource.dubai,
    rating: 4.9,
    description:
      "Dubai, a city of superlatives, is known for its futuristic architecture, luxury shopping, and vibrant nightlife. The Burj Khalifa, the world's tallest building, is a testament to its ambition and innovation. \n\nVisitors can experience the traditional charm of the old souks, embark on a desert safari, or unwind at luxurious resorts. \n\nDubai's unique mix of tradition and modernity makes it a city like no other, offering endless possibilities for exploration and enjoyment.",
    places: [
      {
        name: "Burj Khalifa",
        description: "The tallest building in the world.",
      },
      {
        name: "Palm Jumeirah",
        description: "A man-made island shaped like a palm tree.",
      },
      {
        name: "Dubai Mall",
        description: "A massive shopping and entertainment complex.",
      },
    ],
  },
  {
    id: 10,
    name: "Cairo",
    country: "Egypt",
    img: imagesSource.egypt,
    rating: 4.5,
    description:
      "Cairo, the sprawling capital of Egypt, is a city steeped in history and culture. The ancient Pyramids of Giza and the enigmatic Sphinx are enduring symbols of the country's glorious past. \n\nThe city's vibrant bazaars, like Khan el-Khalili, offer a glimpse into its lively commerce and traditions. The Egyptian Museum houses treasures from the pharaohs, including the famous Tutankhamun collection. \n\nWith its lively streets and rich history, Cairo offers an unforgettable journey through time.",
    places: [
      {
        name: "Pyramids of Giza",
        description: "Ancient wonders of the world.",
      },
      {
        name: "Egyptian Museum",
        description: "Home to priceless artifacts from ancient Egypt.",
      },
      { name: "Khan el-Khalili", description: "A historic marketplace." },
    ],
  },
];

export { popularDestinations, Destination };
