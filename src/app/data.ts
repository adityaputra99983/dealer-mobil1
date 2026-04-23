export interface Car {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  year: number;
  engine: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  seats: number;
  image: string;
  description: string;
  features: string[];
}

export interface Inquiry {
  id: string;
  carId: number;
  carName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: "inquiry" | "testdrive";
  date: string;
  status: "unread" | "read" | "approved";
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Phantom VIII",
    brand: "Rolls-Royce",
    category: "Sedan",
    price: 8500000000,
    year: 2024,
    engine: "6.75L V12 Twin-Turbo",
    power: "563 HP",
    acceleration: "5.1s (0-100 km/h)",
    topSpeed: "250 km/h",
    transmission: "8-Speed Automatic",
    drivetrain: "RWD",
    fuelType: "Bensin",
    seats: 5,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    description: "Puncak kemewahan otomotif. Rolls-Royce Phantom VIII menghadirkan ketenangan berkendara yang tak tertandingi dengan interior handcrafted terbaik di dunia.",
    features: ["Starlight Headliner", "Rear Theatre", "Champagne Cooler", "Bespoke Audio", "Self-Closing Doors", "Massaging Seats"],
  },
  {
    id: 2,
    name: "Urus Performante",
    brand: "Lamborghini",
    category: "SUV",
    price: 12500000000,
    year: 2024,
    engine: "4.0L V8 Twin-Turbo",
    power: "666 HP",
    acceleration: "3.3s (0-100 km/h)",
    topSpeed: "306 km/h",
    transmission: "8-Speed Automatic",
    drivetrain: "AWD",
    fuelType: "Bensin",
    seats: 5,
    image: "https://images.unsplash.com/photo-1669725083185-503c402ecc68?w=800&q=80",
    description: "Super SUV tercepat di dunia. Lamborghini Urus Performante menggabungkan performa ganas dengan kepraktisan SUV mewah.",
    features: ["Carbon Ceramic Brakes", "Akrapovič Exhaust", "Rally Mode", "Carbon Fiber Package", "Bang & Olufsen Audio", "Heads-Up Display"],
  },
  {
    id: 3,
    name: "SF90 Stradale",
    brand: "Ferrari",
    category: "Sport",
    price: 18000000000,
    year: 2024,
    engine: "4.0L V8 Twin-Turbo + 3 Electric Motors",
    power: "986 HP",
    acceleration: "2.5s (0-100 km/h)",
    topSpeed: "340 km/h",
    transmission: "8-Speed DCT",
    drivetrain: "AWD",
    fuelType: "Hybrid",
    seats: 2,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
    description: "Supercar hybrid pertama dari Ferrari. SF90 Stradale adalah mahakarya teknologi dengan performa yang memukau.",
    features: ["eManettino", "Assetto Fiorano Package", "Full LED Matrix", "Carbon Fiber Cockpit", "JBL Premium Audio", "Launch Control"],
  },
  {
    id: 4,
    name: "Continental GT",
    brand: "Bentley",
    category: "Coupe",
    price: 7800000000,
    year: 2024,
    engine: "4.0L V8 Twin-Turbo",
    power: "542 HP",
    acceleration: "4.0s (0-100 km/h)",
    topSpeed: "318 km/h",
    transmission: "8-Speed DCT",
    drivetrain: "AWD",
    fuelType: "Bensin",
    seats: 4,
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
    description: "Grand Tourer sempurna yang memadukan kemewahan Inggris dengan performa bertenaga. Setiap detail dirajut dengan presisi tinggi.",
    features: ["Rotating Display", "Naim Audio", "Diamond Knurling", "Mulliner Specification", "Adaptive Cruise", "Night Vision"],
  },
  {
    id: 5,
    name: "Taycan Turbo S",
    brand: "Porsche",
    category: "Sport",
    price: 5200000000,
    year: 2024,
    engine: "Dual Electric Motors",
    power: "750 HP",
    acceleration: "2.8s (0-100 km/h)",
    topSpeed: "260 km/h",
    transmission: "2-Speed Automatic",
    drivetrain: "AWD",
    fuelType: "Electric",
    seats: 4,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    description: "Masa depan performa elektrik. Porsche Taycan Turbo S membuktikan bahwa mobil listrik bisa sangat mendebarkan.",
    features: ["800V Architecture", "Porsche Electric Sport Sound", "Adaptive Air Suspension", "Matrix LED", "Burmester Audio", "Wireless Charging"],
  },
  {
    id: 6,
    name: "G-Class AMG G63",
    brand: "Mercedes-Benz",
    category: "SUV",
    price: 6800000000,
    year: 2024,
    engine: "4.0L V8 Biturbo",
    power: "577 HP",
    acceleration: "4.5s (0-100 km/h)",
    topSpeed: "220 km/h",
    transmission: "9-Speed Automatic",
    drivetrain: "AWD",
    fuelType: "Bensin",
    seats: 5,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&q=80",
    description: "Ikon yang tak lekang waktu. Mercedes-AMG G63 adalah simbol kekuatan dan kemewahan yang tak terbantahkan.",
    features: ["AMG Performance Exhaust", "3 Differential Locks", "Burmester Surround Sound", "MBUX System", "AMG Ride Control", "360° Camera"],
  },
  {
    id: 7,
    name: "Huracán Tecnica",
    brand: "Lamborghini",
    category: "Sport",
    price: 10500000000,
    year: 2024,
    engine: "5.2L V10 Naturally Aspirated",
    power: "631 HP",
    acceleration: "3.2s (0-100 km/h)",
    topSpeed: "325 km/h",
    transmission: "7-Speed DCT",
    drivetrain: "RWD",
    fuelType: "Bensin",
    seats: 2,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    description: "Supercar dengan jiwa balap sejati. Huracán Tecnica menawarkan koneksi mengemudi yang murni dan tak terfilter.",
    features: ["LDVI System", "Carbon Ceramic Brakes", "Lamborghini Dinamica Veicolo", "Alcantara Interior", "Sensonum Audio", "Rear-Wheel Steering"],
  },
  {
    id: 8,
    name: "Flying Spur",
    brand: "Bentley",
    category: "Sedan",
    price: 6500000000,
    year: 2024,
    engine: "6.0L W12 Twin-Turbo",
    power: "626 HP",
    acceleration: "3.7s (0-100 km/h)",
    topSpeed: "333 km/h",
    transmission: "8-Speed DCT",
    drivetrain: "AWD",
    fuelType: "Bensin",
    seats: 5,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    description: "Sedan sport termewah di dunia. Flying Spur menggabungkan performa supercar dengan kenyamanan limousine.",
    features: ["All-Wheel Steering", "Bentley Rotating Display", "Naim for Bentley", "Mood Lighting", "Rear Amenity", "Air Ioniser"],
  },
];

export const categories = ["Semua", "Sedan", "SUV", "Sport", "Coupe"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
