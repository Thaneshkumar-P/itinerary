import { ItineraryDocument } from "@/models/Itinerary";
// import IMG1 from '@/assets/CardImg2.png'
// import IMG2 from '@/assets/friends.jpg'


export const mockItineraryData: ItineraryDocument = {
  _id: "itinerary_001",
  title: "Discover the Wonders of Italy",
  subTitle: "7-day tour across historic cities and landscapes",
  template: 'friends',
  days: 7,
  overview: "Experience the rich culture, history, and culinary delights of Italy as you explore Rome, Florence, and Venice.",
  stay: "Luxury hotels and boutique stays throughout the trip.",
  meals: "Daily breakfast, selected lunches, and dinners at authentic local restaurants.",
  transport: "Private coach for all inter-city travel and airport transfers.",
  offer: "Book before Oct 15 to receive a 10% discount!",
  client: "John Doe",
  locations: [
    {
      locationName: "Rome",
      locationDays: "Day 1 - Day 3",
      nights: "2 nights",
      date: "2024-09-10",
      locationStay: "Hotel Quirinale",
      locationMeals: "Breakfast included, welcome dinner on the first night.",
      locationHighlight: "Guided tour of the Colosseum and Vatican City.",
      overview: "Rome, the Eternal City, offers a breathtaking array of historical and cultural landmarks.",
      images: ["rome_image_1.jpg", "rome_image_2.jpg"]
    },
    {
      locationName: "Florence",
      locationDays: "Day 4 - Day 5",
      nights: "1 night",
      date: "2024-09-12",
      locationStay: "Hotel Brunelleschi",
      locationMeals: "Breakfast and dinner included.",
      locationHighlight: "Visit the Uffizi Gallery and Florence Cathedral.",
      overview: "Florence, the heart of the Renaissance, is home to some of the most famous art in the world.",
      images: ["florence_image_1.jpg", "florence_image_2.jpg"]
    },
    {
      locationName: "Venice",
      locationDays: "Day 6 - Day 7",
      nights: "1 night",
      date: "2024-09-14",
      locationStay: "Ca' Sagredo Hotel",
      locationMeals: "Breakfast and a farewell dinner.",
      locationHighlight: "Private gondola ride through the canals of Venice.",
      overview: "Venice, the city of canals, offers an unforgettable romantic experience.",
      images: ["venice_image_1.jpg", "venice_image_2.jpg"]
    },
    {
      locationName: "Venice",
      locationDays: "Day 6 - Day 7",
      nights: "1 night",
      date: "2024-09-14",
      locationStay: "Ca' Sagredo Hotel",
      locationMeals: "Breakfast and a farewell dinner.",
      locationHighlight: "Private gondola ride through the canals of Venice.",
      overview: "Venice, the city of canals, offers an unforgettable romantic experience.",
      images: ["venice_image_1.jpg", "venice_image_2.jpg"]
    }
  ],
  toc: [
    { text: "Terms of Service", svg: "<svg>...</svg>" },
    { text: "Cancellation Policy", svg: "<svg>...</svg>" }
  ],
  included: [
    { text: "Guided tours", svg: "<svg>...</svg>" },
    { text: "Accommodation", svg: "<svg>...</svg>" }
  ],
  excluded: [
    { text: "International flights", svg: "<svg>...</svg>" },
    { text: "Personal expenses", svg: "<svg>...</svg>" }
  ]
};
