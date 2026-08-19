export type ServiceIcon = "stethoscope" | "scissors" | "syringe" | "home" | "activity" | "building";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  nameEn: string;
  nameAr: string;
  description: string;
  price: number;
  durationMin: number;
  category: "Medical" | "Grooming" | "Preventive" | "Boarding" | "Surgery" | "Home Visit";
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Dog food" | "Cat food" | "Medication" | "Accessories" | "Toys";
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  description?: string;
};

export const services: Service[] = [
  {
    slug: "medical-consultation",
    icon: "stethoscope",
    nameEn: "Medical Consultation",
    nameAr: "استشارة طبية",
    description: "Full health check-ups and diagnosis by licensed veterinarians.",
    price: 150,
    durationMin: 30,
    category: "Medical",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "grooming-session",
    icon: "scissors",
    nameEn: "Grooming Session",
    nameAr: "جلسة عناية",
    description: "Bathing, trimming, and styling to keep your pet fresh and healthy.",
    price: 120,
    durationMin: 60,
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "vaccination",
    icon: "syringe",
    nameEn: "Vaccination",
    nameAr: "تطعيم",
    description: "Core and lifestyle vaccines to protect your pet year-round.",
    price: 80,
    durationMin: 15,
    category: "Preventive",
    image: "https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "home-visit",
    icon: "home",
    nameEn: "Home Visit",
    nameAr: "زيارة منزلية",
    description: "Veterinary care in the comfort of your own home.",
    price: 350,
    durationMin: 45,
    category: "Home Visit",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "surgery-neutering",
    icon: "activity",
    nameEn: "Surgery — Neutering",
    nameAr: "جراحة — تعقيم",
    description: "Safe, modern surgical suites with full pre/post-op care.",
    price: 800,
    durationMin: 120,
    category: "Surgery",
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "boarding",
    icon: "building",
    nameEn: "Boarding",
    nameAr: "إقامة",
    description: "Comfortable overnight and long-stay boarding with round-the-clock care.",
    price: 200,
    durationMin: 1440,
    category: "Boarding",
    image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=1200&auto=format&fit=crop",
  },
];

export const products: Product[] = [
  {
    slug: "royal-canin-dry-2kg",
    name: "Royal Premium Dry Food 2kg",
    category: "Dog food",
    price: 185,
    oldPrice: 220,
    stock: 48,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=800&auto=format&fit=crop",
    description: "A complete, balanced dry food for adult dogs made with real chicken and wholesome grains. Supports healthy digestion, a shiny coat, and steady energy throughout the day.",
  },
  {
    slug: "whiskas-ocean-fish",
    name: "Whiskas Ocean Fish 1.5kg",
    category: "Cat food",
    price: 140,
    stock: 22,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
    description: "Wet cat food made with real ocean fish, rich in omega-3s for a healthy coat and skin. Cats love the taste, and it's gentle on sensitive stomachs.",
  },
  {
    slug: "anti-flea-collar",
    name: "Anti-flea Collar — All Breeds",
    category: "Medication",
    price: 95,
    stock: 2,
    image: "https://images.unsplash.com/photo-1601758064135-ba51726824f2?q=80&w=800&auto=format&fit=crop",
    description: "A lightweight, adjustable collar that protects against fleas and ticks for up to 8 months. Water-resistant and suitable for cats and dogs of all breeds.",
  },
  {
    slug: "chew-toy-bundle",
    name: "Durable Chew Toy Bundle",
    category: "Toys",
    price: 65,
    stock: 34,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
    description: "A bundle of durable, non-toxic chew toys designed to withstand tough chewers while helping keep teeth clean. Great for solo play or fetch.",
  },
  {
    slug: "cat-scratch-post",
    name: "Cat Scratch Post & Lounge",
    category: "Accessories",
    price: 310,
    stock: 9,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=800&auto=format&fit=crop",
    description: "A sturdy scratch post with a cozy lounging platform, helping protect your furniture while giving your cat a favorite spot to relax and stretch.",
  },
  {
    slug: "vitamin-supplement",
    name: "Multivitamin Supplement Drops",
    category: "Medication",
    price: 75,
    stock: 40,
    image: "https://images.unsplash.com/photo-1628557010735-e12e8ce8f6b0?q=80&w=800&auto=format&fit=crop",
    description: "An easy-to-dose daily multivitamin supporting immune health, joints, and coat condition. Add directly to food or water — most pets love the flavor.",
  },
];
