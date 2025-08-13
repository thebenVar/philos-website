// TypeScript interfaces for menu data
export interface MenuItem {
  name: string;
  price: number;
  tags?: string[];
  related?: {
    beverage: string;
    side: string;
    addon: string;
  };
  image?: string | null; // Optional image field for per-item images
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  category: string;
  quantity: number;
  addons?: MenuItem[];
}

export type MenuData = MenuCategory[];

// Tag type for better type safety
export type MenuTag = "Premium" | "Best Selling" | "New Addition" | "Discount Available";

// Category type
export type CategoryName = 
  | "Add ons" 
  | "Asian" 
  | "Authentic Japanese Sushi" 
  | "BEVERAGES" 
  | "Mains" 
  | "Non Veg Pizzas" 
  | "Pastas" 
  | "Ramen Bowls" 
  | "Sides" 
  | "Veg Pizzas" 
  | "Western" 
  | "Wraps/Burger";
