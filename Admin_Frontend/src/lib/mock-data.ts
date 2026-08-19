export type Booking = {
  id: string;
  client: string;
  phone: string;
  pet: string;
  service: string;
  vet?: string;
  date: string;
  status: "Confirmed" | "Pending" | "Upcoming" | "Cancelled";
  whatsapp: "Sent" | "Pending";
};

export const bookings: Booking[] = [
  { id: "AWH-2891", client: "Ahmed Sayed", phone: "+20 100 000 0000", pet: "Max", service: "Medical consultation", vet: "Dr. Hana", date: "Aug 20 · 10:30 AM", status: "Confirmed", whatsapp: "Sent" },
  { id: "AWH-2892", client: "Sara Hassan", phone: "+20 101 111 1111", pet: "Luna", service: "Grooming session", vet: "Mohamed S.", date: "Aug 20 · 12:00 PM", status: "Pending", whatsapp: "Pending" },
  { id: "AWH-2893", client: "Nour Khalil", phone: "+20 102 222 2222", pet: "Fluffy", service: "Vaccination", vet: "Dr. Hana", date: "Aug 21 · 9:00 AM", status: "Upcoming", whatsapp: "Sent" },
  { id: "AWH-2894", client: "Tarek Ramadan", phone: "+20 103 333 3333", pet: "Buddy", service: "Surgery — neutering", vet: "Dr. Mostafa", date: "Aug 22 · 8:00 AM", status: "Pending", whatsapp: "Pending" },
  { id: "AWH-2895", client: "Yara Adel", phone: "+20 104 444 4444", pet: "Simba", service: "Home visit", vet: "Dr. Hana", date: "Aug 22 · 4:00 PM", status: "Confirmed", whatsapp: "Sent" },
];

export type Product = {
  id: string;
  name: string;
  category: "Dog food" | "Cat food" | "Medication" | "Accessories";
  price: number;
  oldPrice?: number;
  stock: number;
  active: boolean;
  image: string;
};

export const products: Product[] = [
  { id: "p1", name: "Royal Premium Dry Food 2kg", category: "Dog food", price: 185, oldPrice: 220, stock: 48, active: true, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=600&auto=format&fit=crop" },
  { id: "p2", name: "Whiskas Ocean Fish 1.5kg", category: "Cat food", price: 140, stock: 22, active: true, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop" },
  { id: "p3", name: "Anti-flea Collar — All Breeds", category: "Medication", price: 95, stock: 2, active: false, image: "https://images.unsplash.com/photo-1601758064135-ba51726824f2?q=80&w=600&auto=format&fit=crop" },
  { id: "p4", name: "Cat Scratch Post & Lounge", category: "Accessories", price: 310, stock: 9, active: true, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop" },
];

export type ServiceRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  status: "Active" | "Limited";
  bookingsThisMonth: number;
  image: string;
};

export const services: ServiceRow[] = [
  { id: "s1", name: "Medical consultation", category: "Medical", price: 150, duration: "30 min", status: "Active", bookingsThisMonth: 89, image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=400&auto=format&fit=crop" },
  { id: "s2", name: "Grooming session", category: "Grooming", price: 120, duration: "60 min", status: "Active", bookingsThisMonth: 54, image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=400&auto=format&fit=crop" },
  { id: "s3", name: "Vaccination", category: "Preventive", price: 80, duration: "15 min", status: "Active", bookingsThisMonth: 42, image: "https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80&w=400&auto=format&fit=crop" },
  { id: "s4", name: "Home visit", category: "Medical", price: 350, duration: "45 min", status: "Limited", bookingsThisMonth: 18, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=400&auto=format&fit=crop" },
  { id: "s5", name: "Surgery — neutering", category: "Surgery", price: 800, duration: "2 hrs", status: "Active", bookingsThisMonth: 11, image: "https://images.unsplash.com/photo-1584553421349-3557471bed79?q=80&w=400&auto=format&fit=crop" },
];

export type Offer = {
  id: string;
  targetType: "Product" | "Service";
  targetName: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Scheduled" | "Expired";
};

export const offers: Offer[] = [
  { id: "o1", targetType: "Product", targetName: "Royal Premium Dry Food 2kg", discountPercent: 15, startDate: "Aug 15, 2026", endDate: "Aug 31, 2026", status: "Active" },
  { id: "o2", targetType: "Service", targetName: "Grooming session", discountPercent: 20, startDate: "Aug 20, 2026", endDate: "Sep 5, 2026", status: "Scheduled" },
  { id: "o3", targetType: "Service", targetName: "Vaccination", discountPercent: 10, startDate: "Jul 1, 2026", endDate: "Jul 31, 2026", status: "Expired" },
  { id: "o4", targetType: "Product", targetName: "Whiskas Ocean Fish 1.5kg", discountPercent: 12, startDate: "Aug 10, 2026", endDate: "Aug 25, 2026", status: "Active" },
];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  pets: string;
  totalBookings: number;
  lastVisit: string;
};

export const customers: Customer[] = [
  { id: "c1", name: "Ahmed Sayed", phone: "+20 100 000 0000", pets: "Max, Luna", totalBookings: 12, lastVisit: "Aug 15, 2026" },
  { id: "c2", name: "Sara Hassan", phone: "+20 101 111 1111", pets: "Luna", totalBookings: 5, lastVisit: "Aug 12, 2026" },
  { id: "c3", name: "Karim Ali", phone: "+20 102 222 2222", pets: "Buddy", totalBookings: 8, lastVisit: "Aug 10, 2026" },
];

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Staff" | "Vet";
  department: string;
  permissions: string;
  status: "Active" | "On leave";
};

export const employees: Employee[] = [
  { id: "e1", name: "Dr. Mostafa Ali", email: "mostafa@awh.com", role: "Owner", department: "Management", permissions: "Full access", status: "Active" },
  { id: "e2", name: "Dr. Hana Mostafa", email: "hana@awh.com", role: "Vet", department: "Medical", permissions: "Assigned bookings", status: "Active" },
  { id: "e3", name: "Yara Gamal", email: "yara@awh.com", role: "Manager", department: "Operations", permissions: "Products, services, bookings", status: "Active" },
  { id: "e4", name: "Mohamed Samir", email: "moh@awh.com", role: "Staff", department: "Grooming", permissions: "Own bookings only", status: "On leave" },
];

export type DeliveryOrder = {
  id: string;
  client: string;
  items: string;
  total: number;
  address: string;
  status: "Pending" | "In transit" | "Delivered";
  driver: string;
  currentLocation: string;
};

export const deliveries: DeliveryOrder[] = [
  { id: "AWH-2891", client: "Ahmed Sayed", items: "Dog food ×1, toy bundle ×2", total: 335, address: "Cairo, Nasr City", status: "In transit", driver: "Mahmoud Fathy", currentLocation: "Salah Salem Rd, near City Stars" },
  { id: "AWH-2890", client: "Sara Hassan", items: "Whiskas cat food ×2", total: 280, address: "Giza, Dokki", status: "Delivered", driver: "Ibrahim Naser", currentLocation: "Delivered to address" },
  { id: "AWH-2889", client: "Nour Khalil", items: "Anti-flea collar ×1", total: 95, address: "Alexandria, Smouha", status: "Pending", driver: "Unassigned", currentLocation: "Awaiting dispatch" },
];

export type OrderItem = { name: string; qty: number; price: number };

export type ClientOrder = {
  id: string;
  client: string;
  phone: string;
  items: OrderItem[];
  addressLine: string;
  city: string;
  notes: string;
  location: { lat: number; lng: number; accuracy: number } | null;
  driver: string;
  status: "New" | "Assigned" | "In transit" | "Delivered";
  createdAt: string;
};

export const clientOrders: ClientOrder[] = [
  {
    id: "ORD-1042",
    client: "Ahmed Sayed",
    phone: "+20 100 000 0000",
    items: [
      { name: "Royal Premium Dry Food 2kg", qty: 2, price: 185 },
      { name: "Durable Chew Toy Bundle", qty: 1, price: 65 },
    ],
    addressLine: "12 El-Nasr St, Building 4, Apt 7",
    city: "Cairo, Nasr City",
    notes: "Ring the bell twice, dog barks but is friendly.",
    location: { lat: 30.0596, lng: 31.3238, accuracy: 18 },
    driver: "Unassigned",
    status: "New",
    createdAt: "Aug 19, 2026 · 9:14 AM",
  },
  {
    id: "ORD-1041",
    client: "Sara Hassan",
    phone: "+20 101 111 1111",
    items: [{ name: "Whiskas Ocean Fish 1.5kg", qty: 2, price: 140 }],
    addressLine: "3 Tahrir St, Villa 9",
    city: "Giza, Dokki",
    notes: "Leave with doorman if not home.",
    location: { lat: 30.0409, lng: 31.2114, accuracy: 22 },
    driver: "Mahmoud Fathy",
    status: "Assigned",
    createdAt: "Aug 18, 2026 · 4:52 PM",
  },
  {
    id: "ORD-1040",
    client: "Nour Khalil",
    phone: "+20 102 222 2222",
    items: [
      { name: "Anti-flea Collar — All Breeds", qty: 1, price: 95 },
      { name: "Cat Scratch Post & Lounge", qty: 1, price: 310 },
    ],
    addressLine: "45 Corniche Rd, Tower B, Floor 6",
    city: "Alexandria, Smouha",
    notes: "",
    location: { lat: 31.2156, lng: 29.9553, accuracy: 15 },
    driver: "Ibrahim Naser",
    status: "In transit",
    createdAt: "Aug 18, 2026 · 11:05 AM",
  },
];

export type Driver = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: "Active" | "Off duty";
};

export const initialDrivers: Driver[] = [
  { id: "d1", name: "Mahmoud Fathy", phone: "+20 111 222 3333", vehicle: "Motorcycle · 2 8371", status: "Active" },
  { id: "d2", name: "Ibrahim Naser", phone: "+20 112 333 4444", vehicle: "Van · 3 1092", status: "Active" },
  { id: "d3", name: "Khaled Reda", phone: "+20 113 444 5555", vehicle: "Motorcycle · 1 5520", status: "Active" },
  { id: "d4", name: "Amr Sobhy", phone: "+20 114 555 6666", vehicle: "Motorcycle · 4 7712", status: "Off duty" },
];

export type ChatThread = {
  id: string;
  name: string;
  bookingRef: string;
  phone: string;
  lastMessageTime: string;
  unread: boolean;
  messages: { from: "in" | "out"; text: string; time: string; sender?: string }[];
};

export const chatThreads: ChatThread[] = [
  {
    id: "t1",
    name: "Sara Hassan",
    bookingRef: "AWH-2891",
    phone: "+20 101 111 1111",
    lastMessageTime: "2m",
    unread: true,
    messages: [
      { from: "in", text: "Hi, my cat Luna has been vomiting since this morning. She's not eating either. Should I bring her in?", time: "10:32 AM" },
      { from: "out", text: "Hello Sara! Sorry to hear about Luna. How many times has she vomited, and is there any blood or unusual color?", time: "10:35 AM", sender: "Dr. Hana" },
      { from: "in", text: "About 3-4 times. Yellowish, no blood. She's a bit lethargic too.", time: "10:38 AM" },
      { from: "out", text: "With that many episodes we'd like to see her — I'll book you in today at 3:30 PM. Does that work?", time: "10:40 AM", sender: "Dr. Hana" },
    ],
  },
  { id: "t2", name: "Karim Ali", bookingRef: "AWH-2870", phone: "+20 102 222 2222", lastMessageTime: "14m", unread: true, messages: [{ from: "in", text: "Can I change my appointment to tomorrow?", time: "10:20 AM" }] },
  { id: "t3", name: "Nada Youssef", bookingRef: "AWH-2865", phone: "+20 105 555 5555", lastMessageTime: "1h", unread: true, messages: [{ from: "in", text: "When will my order arrive?", time: "9:40 AM" }] },
  { id: "t4", name: "Omar Farouk", bookingRef: "AWH-2850", phone: "+20 106 666 6666", lastMessageTime: "3h", unread: false, messages: [{ from: "in", text: "Thank you for the great service!", time: "7:10 AM" }] },
];

export const kpis = {
  bookingsThisMonth: { value: 248, change: 12, up: true },
  todaysAppointments: { value: 18, change: 8, up: true },
  pendingOrders: { value: 34, change: 2, up: false },
  monthlyRevenue: { value: 87400, change: 18, up: true },
};

export const bookingsOverTime = [
  { label: "1", value: 52 }, { label: "3", value: 68 }, { label: "5", value: 44 },
  { label: "7", value: 84 }, { label: "9", value: 58 }, { label: "11", value: 89 },
  { label: "13", value: 100 }, { label: "15", value: 73 }, { label: "17", value: 80 }, { label: "19", value: 66 },
];

export const topServices = [
  { label: "Medical", value: 36, color: "#C41E3A" },
  { label: "Grooming", value: 22, color: "#F6A8B4" },
  { label: "Vaccines", value: 17, color: "#F9C9CF" },
  { label: "Other", value: 25, color: "#E8E9EC" },
];

export const peakHours = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  hours: ["9am", "10am", "11am", "12pm", "2pm", "4pm", "6pm", "8pm"],
  grid: [
    [2, 3, 4, 2, 1, 3, 2, 1],
    [3, 5, 5, 4, 2, 4, 3, 2],
    [1, 4, 5, 3, 2, 5, 2, 1],
    [2, 3, 4, 5, 3, 4, 3, 2],
    [0, 1, 2, 1, 0, 2, 1, 0],
    [4, 5, 5, 4, 3, 4, 4, 3],
    [3, 4, 4, 3, 2, 3, 3, 2],
  ],
};
