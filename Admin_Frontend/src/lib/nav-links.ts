import {
  LayoutGrid,
  ClipboardList,
  Package,
  Sparkles,
  Users,
  MessagesSquare,
  UserCog,
  Truck,
  Settings,
  Tag,
  ShoppingBag,
  Bike,
  type LucideIcon,
} from "lucide-react";

export type NavLink = { href: string; label: string; icon: LucideIcon; badge?: number };

export const mainLinks: NavLink[] = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/orders", label: "Orders", icon: ShoppingBag, badge: 3 },
  { href: "/bookings", label: "Bookings", icon: ClipboardList, badge: 7 },
  { href: "/products", label: "Products", icon: Package },
  { href: "/services", label: "Services", icon: Sparkles },
  { href: "/offers", label: "Offers", icon: Tag },
];

export const peopleLinks: NavLink[] = [
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/customer-service", label: "Customer service", icon: MessagesSquare, badge: 3 },
  { href: "/employees", label: "Employees", icon: UserCog },
];

export const logisticsLinks: NavLink[] = [
  { href: "/delivery", label: "Delivery", icon: Truck, badge: 4 },
  { href: "/drivers", label: "Drivers", icon: Bike },
];

export const systemLinks: NavLink[] = [{ href: "/settings", label: "Settings", icon: Settings }];
