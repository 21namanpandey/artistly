export interface Artist {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  image: string;
  bio: string;
  languages: string[];
  experience: string;
  availableForTravel: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export const mockArtists: Artist[] = [
  {
    id: 1,
    name: "Priya Sharma",
    category: ["Singer"],
    priceRange: "₹15,000-₹50,000",
    location: "Mumbai",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Professional playback singer with 8 years of experience in Bollywood and regional cinema.",
    languages: ["Hindi", "English", "Marathi"],
    experience: "5-10",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    category: ["DJ"],
    priceRange: "₹25,000-₹75,000",
    location: "Delhi",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "International DJ specializing in electronic music and Bollywood remixes for weddings and corporate events.",
    languages: ["Hindi", "English", "Punjabi"],
    experience: "10+",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 3,
    name: "Meera Nair",
    category: ["Dancer", "Choreographer"],
    priceRange: "₹20,000-₹60,000",
    location: "Bangalore",
    image: "https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Classical and contemporary dance expert with performances across India and abroad.",
    languages: ["Tamil", "English", "Hindi", "Malayalam"],
    experience: "5-10",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 4,
    name: "Arjun Singh",
    category: ["Speaker", "Comedian"],
    priceRange: "₹10,000-₹30,000",
    location: "Pune",
    image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Motivational speaker and stand-up comedian with expertise in corporate training and entertainment.",
    languages: ["Hindi", "English", "Marathi"],
    experience: "2-5",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 5,
    name: "Kavitha Reddy",
    category: ["Singer"],
    priceRange: "₹12,000-₹35,000",
    location: "Chennai",
    image: "https://images.pexels.com/photos/1687678/pexels-photo-1687678.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Carnatic and playback singer specializing in South Indian classical and film music.",
    languages: ["Tamil", "Telugu", "Hindi", "English"],
    experience: "5-10",
    availableForTravel: false,
    status: 'approved'
  },
  {
    id: 6,
    name: "Vikram Joshi",
    category: ["Musician"],
    priceRange: "₹18,000-₹45,000",
    location: "Jaipur",
    image: "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Multi-instrumentalist specializing in Indian classical and fusion music performances.",
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "10+",
    availableForTravel: true,
    status: 'pending'
  },
  {
    id: 7,
    name: "Sneha Gupta",
    category: ["Dancer"],
    priceRange: "₹15,000-₹40,000",
    location: "Kolkata",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Bharatanatyam and Bollywood dance performer with national level competition wins.",
    languages: ["Bengali", "Hindi", "English"],
    experience: "2-5",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 8,
    name: "Rohit Mehta",
    category: ["DJ", "Musician"],
    priceRange: "₹30,000-₹80,000",
    location: "Goa",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Electronic music producer and DJ with international festival experience.",
    languages: ["English", "Hindi", "Konkani"],
    experience: "5-10",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 9,
    name: "Anita Kumari",
    category: ["Speaker"],
    priceRange: "₹8,000-₹25,000",
    location: "Lucknow",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Corporate trainer and motivational speaker specializing in leadership and personal development.",
    languages: ["Hindi", "English", "Urdu"],
    experience: "10+",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 10,
    name: "Karthik Iyer",
    category: ["Musician", "Singer"],
    priceRange: "₹20,000-₹55,000",
    location: "Kochi",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Playback singer and music composer with credits in Malayalam and Tamil cinema.",
    languages: ["Malayalam", "Tamil", "Hindi", "English"],
    experience: "5-10",
    availableForTravel: true,
    status: 'pending'
  },
  {
    id: 11,
    name: "Deepika Sharma",
    category: ["Comedian"],
    priceRange: "₹12,000-₹35,000",
    location: "Chandigarh",
    image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Stand-up comedian and content creator with viral social media presence.",
    languages: ["Hindi", "English", "Punjabi"],
    experience: "2-5",
    availableForTravel: true,
    status: 'approved'
  },
  {
    id: 12,
    name: "Ramesh Patel",
    category: ["Magician"],
    priceRange: "₹10,000-₹30,000",
    location: "Ahmedabad",
    image: "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Professional magician and mentalist entertaining audiences for over 15 years.",
    languages: ["Gujarati", "Hindi", "English"],
    experience: "10+",
    availableForTravel: true,
    status: 'approved'
  }
];

export const categories = ["Singer", "Dancer", "Speaker", "DJ", "Musician", "Comedian", "Magician", "Choreographer"];
export const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Kolkata", "Jaipur", "Goa", "Lucknow", "Kochi", "Chandigarh", "Ahmedabad"];
export const priceRanges = ["₹5,000-₹15,000", "₹15,000-₹50,000", "₹50,000-₹1,00,000", "₹1,00,000+"];
export const languages = ["Hindi", "English", "Tamil", "Bengali", "Telugu", "Marathi", "Gujarati", "Punjabi", "Malayalam", "Kannada", "Urdu", "Rajasthani", "Konkani"];
export const experienceRanges = ["0-2", "2-5", "5-10", "10+"];