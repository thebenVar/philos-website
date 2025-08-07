"use client";
import { useState } from "react";

export default function MenuPage() {
  const menuData = [
    { category: "Add ons", items: [
      { name: "Beef", price: 120 },
      { name: "Broccoli", price: 50 },
      { name: "Chicken", price: 120 },
      { name: "Chicken (small)", price: 75 },
      { name: "Double Cheese", price: 120 },
      { name: "Jalepino", price: 50 },
      { name: "Mushroom", price: 50 },
      { name: "Olives", price: 50 },
      { name: "Pepperoni Pork/chicken", price: 120 },
      { name: "Sausage Chicken/pork", price: 120 },
      { name: "Sweet Corn", price: 50 },
    ]},
    { category: "Asian", items: [
      { name: "Asian Bbq Pork Ribs", price: 380 },
      { name: "Chicken Karaage", price: 360 },
      { name: "Dynamite Crispy Shrimp", price: 380 },
      { name: "Prawn Tempura", price: 380 },
      { name: "Teriyaki Sliced Beef Tenderloin", price: 360 },
      { name: "Thai Chicken Satay", price: 360 },
      { name: "Thai Paneer Satay", price: 310 },
    ]},
    { category: "Authentic Japanese Sushi", items: [
      { name: "Classic California Roll", price: 700 },
      { name: "Classic Maki", price: 490 },
      { name: "Crispy Salmon Tempura Roll", price: 650 },
      { name: "Crunchy Caprese Roll", price: 450 },
      { name: "Futo Maki", price: 700 },
      { name: "Salmon Tartar Maki", price: 650 },
      { name: "Spicy Crunchy Tuna Roll", price: 650, tags: ["Best Selling"] },
      { name: "Tuna Akami Roll", price: 650 },
    ]},
    { category: "BEVERAGES", items: [
      { name: "Blue Lagoon", price: 160 },
      { name: "Fresh Lime", price: 75 },
      { name: "Iced Tea", price: 125 },
      { name: "Irish Coffee Delight", price: 170 },
      { name: "King Alphonso", price: 180 },
      { name: "Mango Basil Blossom", price: 180, tags: ["New Addition"] },
      { name: "Passionfruit Spritzer", price: 160, tags: ["Discount Available"] },
      { name: "Pina Colada", price: 170 },
      { name: "Sprite", price: 20 },
      { name: "Virgin Mojito", price: 120 },
    ]},
    { category: "Mains", items: [
      { name: "Grilled Beef Tenderloin", price: 520, tags: ["Premium"] },
      { name: "Korean Pork Rice", price: 490 },
      { name: "Korean Prawns Rice", price: 650 },
      { name: "Shepherds Pie", price: 520 },
      { name: "Stuffed Chicken Roulade", price: 490 },
    ]},
    { category: "Non Veg Pizzas", items: [
      { name: "Bbq Chicken Pizza (10 Inch)", price: 575, related: { beverage: "Blue Lagoon", side: "Potato Wedges", addon: "Double Cheese" } },
      { name: "Bbq Chicken Pizza (12 Inch)", price: 725, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Bbq Chicken Pizza (8 Inch)", price: 425, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Capricciosa (10 Inch)", price: 575, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Capricciosa (12 Inch)", price: 700, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Capricciosa (8 Inch)", price: 425, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Chef Special Pizza (10 Inch)", price: 675, tags: ["Premium", "Best Selling"], related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Chef Special Pizza (12 Inch)", price: 875, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
      { name: "Chef Special Pizza (8 Inch)", price: 575, related: { beverage: "Irish Coffee Delight", side: "Masala Omelet", addon: "Sausage Chicken/pork" } },
      { name: "Chefs/jamican", price: 812, related: { beverage: "Fresh Lime", side: "Potato Wedges", addon: "Chicken (small)" } },
      { name: "Chicken Tikka Pizza (10 Inch)", price: 600, related: { beverage: "Blue Lagoon", side: "Loaded Fries", addon: "Double Cheese" } },
      { name: "Chicken Tikka Pizza (12 Inch)", price: 750, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Chicken Tikka Pizza (8 Inch)", price: 450, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Classic Pork (10 Inch)", price: 675, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Classic Pork (12 Inch)", price: 875, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Classic Pork (8 Inch)", price: 550, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Diavola (10 Inch)", price: 600, related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Diavola (12 Inch)", price: 750, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
      { name: "Diavola (8 Inch)", price: 475, related: { beverage: "Irish Coffee Delight", side: "Masala Omelet", addon: "Sausage Chicken/pork" } },
      { name: "Gamberetti (10 Inch)", price: 675, related: { beverage: "Fresh Lime", side: "Potato Wedges", addon: "Chicken (small)" } },
      { name: "Gamberetti (12 Inch)", price: 875, related: { beverage: "Blue Lagoon", side: "Loaded Fries", addon: "Double Cheese" } },
      { name: "Gamberetti (8 Inch)", price: 575, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Italian Salsiccia (10 Inch)", price: 575, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Italian Salsiccia (12 Inch)", price: 700, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Italian Salsiccia (8 Inch)", price: 425, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Jamaican Jerk Pizza (10 Inch)", price: 550, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Jamaican Jerk Pizza (12 Inch)", price: 750, related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Jamaican Jerk Pizza (8 Inch)", price: 425, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
      { name: "Lebanese Chicken Pizza (10 Inch)", price: 575, related: { beverage: "Irish Coffee Delight", side: "Masala Omelet", addon: "Sausage Chicken/pork" } },
      { name: "Lebanese Chicken Pizza (12 Inch)", price: 750, related: { beverage: "Fresh Lime", side: "Potato Wedges", addon: "Chicken (small)" } },
      { name: "Lebanese Chicken Pizza (8 Inch)", price: 450, related: { beverage: "Blue Lagoon", side: "Loaded Fries", addon: "Double Cheese" } },
      { name: "Make Your Own Pizza", price: 1200, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Meat Lovers Pizza (10 Inch)", price: 900, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Meat Lovers Pizza (12 Inch)", price: 1250, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Meat Lovers Pizza (8 Inch)", price: 700, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Pepperoni (10 Inch)", price: 575, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Pepperoni (12 Inch)", price: 750, related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Pepperoni (8 Inch)", price: 425, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
      { name: "Porchetta (10 Inch)", price: 675, related: { beverage: "Irish Coffee Delight", side: "Masala Omelet", addon: "Sausage Chicken/pork" } },
      { name: "Porchetta (12 Inch)", price: 875, related: { beverage: "Fresh Lime", side: "Potato Wedges", addon: "Chicken (small)" } },
      { name: "Porchetta (8 Inch)", price: 550, related: { beverage: "Blue Lagoon", side: "Loaded Fries", addon: "Double Cheese" } },
      { name: "Quattro Formaggi/ Chefspecial", price: 500, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Signature Bolognese Pizza (10 Inch)", price: 650, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Signature Bolognese Pizza (12 Inch)", price: 825, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Signature Bolognese Pizza (8 Inch)", price: 490, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Turkish Meat Pizza (10 Inch)", price: 650, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Turkish Meat Pizza (12 Inch)", price: 825, related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Turkish Meat Pizza (8 Inch)", price: 490, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
    ]},
    { category: "Pastas", items: [
      { name: "Chefs Signature Spaghetti Bolognese", price: 450 },
      { name: "Classic Pasta", price: 470 },
      { name: "Pasta Arabiata", price: 340 },
    ]},
    { category: "Ramen Bowls", items: [
      { name: "Korean Pulled Chicken Ramen", price: 420 },
      { name: "Pork Tonkotsu Ramen", price: 450 },
    ]},
    { category: "Sides", items: [
      { name: "Chilly Cheese Toast", price: 210 },
      { name: "Chilly Cheese Toast (1/2)", price: 95 },
      { name: "French Fries", price: 160 },
      { name: "Garlic Bread", price: 120 },
      { name: "Garlic Bread (half)", price: 60 },
      { name: "Loaded Fries", price: 220 },
      { name: "Masala Omelet", price: 120 },
      { name: "Potato Wedges", price: 180 },
      { name: "Truffle Fries", price: 190 },
      { name: "Veg Soup", price: 220 },
    ]},
    { category: "Veg Pizzas", items: [
      { name: "Grilled Paneer (10 Inch)", price: 525, related: { beverage: "Blue Lagoon", side: "Potato Wedges", addon: "Double Cheese" } },
      { name: "Grilled Paneer (12 Inch)", price: 650, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Grilled Paneer (8 Inch)", price: 375, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Margherita (10 Inch)", price: 450, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Margherita (12 Inch)", price: 600, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Margherita (8 Inch)", price: 325, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Melanzane (10 Inch)", price: 450, related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Melanzane (12 Inch)", price: 550, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
      { name: "Melanzane (8 Inch)", price: 350, related: { beverage: "Irish Coffee Delight", side: "Masala Omelet", addon: "Sausage Chicken/pork" } },
      { name: "Premavera (10 Inch)", price: 525, related: { beverage: "Fresh Lime", side: "Potato Wedges", addon: "Chicken (small)" } },
      { name: "Premavera (12 Inch)", price: 650, related: { beverage: "Blue Lagoon", side: "Loaded Fries", addon: "Double Cheese" } },
      { name: "Premavera (8 Inch)", price: 375, related: { beverage: "Iced Tea", side: "French Fries", addon: "Olives" } },
      { name: "Quattro Formaggi (10 Inch)", price: 575, related: { beverage: "Sprite", side: "Garlic Bread", addon: "Jalepino" } },
      { name: "Quattro Formaggi (12 Inch)", price: 725, related: { beverage: "Virgin Mojito", side: "Loaded Fries", addon: "Mushroom" } },
      { name: "Quattro Formaggi (8 Inch)", price: 425, related: { beverage: "King Alphonso", side: "Truffle Fries", addon: "Pepperoni Pork/chicken" } },
      { name: "Wild Mushroom (10 Inch)", price: 525, related: { beverage: "Pina Colada", side: "Garlic Bread (half)", addon: "Sweet Corn" } },
      { name: "Wild Mushroom (12 Inch)", price: 650, related: { beverage: "Passionfruit Spritzer", side: "Chilly Cheese Toast", addon: "Chicken" } },
      { name: "Wild Mushroom (8 Inch)", price: 375, related: { beverage: "Mango Basil Blossom", side: "Veg Soup", addon: "Broccoli" } },
    ]},
    { category: "Western", items: [
      { name: "Cajun Fried Prawns", price: 380 },
      { name: "Cajun Fried Prawns (1/2)", price: 190 },
      { name: "Jamaican Chicken Skewer", price: 310 },
      { name: "Mexican Nachos (1/2)", price: 130 },
      { name: "Moroccan Meat Balls", price: 360 },
      { name: "Nachos With Confit Tomato Salsa", price: 260 },
      { name: "Spicy Corn & Cheese Balls", price: 310 },
    ]},
    { category: "Wraps/Burger", items: [
      { name: "Chicken Quesadilla", price: 420 },
      { name: "Citys Best Melted Burger", price: 350 },
      { name: "Mexican Tostadas", price: 380 },
    ]},
  ];

const imageMap = {
  "Asian": "/gallery/teriyaki_sliced_beef_tenderloin.png",
  "Authentic Japanese Sushi": "/gallery/spicy_crunchy_tuna_roll.png",
  "BEVERAGES": "/gallery/beverage_bar.png",
  "Mains": "/gallery/restaurant.png",
  "Non Veg Pizzas": "/gallery/diavola.png",
  "Pastas": "/gallery/potato_wedges.png",
  "Ramen Bowls": "/gallery/forno.png",
  "Sides": "/gallery/potato_wedges.png",
  "Veg Pizzas": "/gallery/pizza.png",
  "Western": "/gallery/forno1.png",
  "Wraps/Burger": "/gallery/forno2.png",
  "Add ons": "/gallery/forno.png"
};

  // Placeholder description
  const getDescription = (itemName) => `A delicious choice, prepared with fresh ingredients.`;



  // Category filtering state
  const categories = menuData.map((cat) => cat.category);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Tag filtering state
  // Collect all tags from menuData
  const allTags = Array.from(
    new Set(
      menuData.flatMap((cat) =>
        cat.items.flatMap((item) => item.tags || [])
      )
    )
  );
  const [selectedTag, setSelectedTag] = useState(null);

  // Count items per tag (for display)
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = menuData.reduce(
      (sum, cat) =>
        sum + cat.items.filter((item) => item.tags && item.tags.includes(tag)).length,
      0
    );
    return acc;
  }, {});

  // Cart state
  const [cart, setCart] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [showAddonSelector, setShowAddonSelector] = useState(false);
  const [pendingBaseItem, setPendingBaseItem] = useState(null);
  const [pendingBaseCategory, setPendingBaseCategory] = useState(null);
  // Quantity state for all items (key: item name + category)
  const [quantities, setQuantities] = useState({});

  // Helper: determine if base item is veg or non-veg
  const isVeg = (category, name) => {
    if (category === "Veg Pizzas" || category === "Pastas") return true;
    if (category === "Non Veg Pizzas") return false;
    // For other categories, default to true
    return true;
  };

  // Helper: filter addons by veg/non-veg
  const getCompatibleAddons = (isVegBase) => {
    const allAddons = menuData.find((cat) => cat.category === "Add ons")?.items || [];
    if (isVegBase) {
      // Only veg addons
      return allAddons.filter((addon) => !addon.name.toLowerCase().includes("beef") && !addon.name.toLowerCase().includes("chicken") && !addon.name.toLowerCase().includes("pork") && !addon.name.toLowerCase().includes("sausage") && !addon.name.toLowerCase().includes("pepperoni"));
    } else {
      // All addons
      return allAddons;
    }
  };

  const addToCart = (item, category, quantity, addons=[]) => {
    if (!quantity || quantity < 1) return;
    setCart((prev) => {
      // If item already in cart, update quantity
      const idx = prev.findIndex((ci) => ci.name === item.name && ci.category === category && JSON.stringify(ci.addons) === JSON.stringify(addons));
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, category, quantity, addons }];
    });
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 1200);
    setSelectedAddons([]);
    setShowAddonSelector(false);
    setPendingBaseItem(null);
    setPendingBaseCategory(null);
  };
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };
  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1) + (item.addons ? item.addons.reduce((a, b) => a + b.price * (item.quantity || 1), 0) : 0), 0);

  // Filtered menu data
  let filteredMenu = menuData;
  if (selectedCategory !== "All") {
    filteredMenu = menuData.filter((cat) => cat.category === selectedCategory);
  }
  if (selectedTag) {
    filteredMenu = filteredMenu
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.tags && item.tags.includes(selectedTag)),
      }))
      .filter((cat) => cat.items.length > 0);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-red-700 text-center">Menu</h1>

      {/* Cart Summary */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="font-semibold text-lg text-gray-700">Cart: {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} item{cart.reduce((sum, item) => sum + (item.quantity || 1), 0) !== 1 ? "s" : ""}</div>
        <div className="text-gray-600">Total: <span className="text-red-700 font-bold">₹{cartTotal}</span></div>
        <button
          className="mt-2 sm:mt-0 px-4 py-1 bg-blue-700 text-white rounded-full text-sm font-semibold hover:bg-blue-800 transition"
          onClick={() => setShowCart(true)}
          disabled={cart.length === 0}
        >
          View Cart
        </button>
      </div>

      {/* View Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4 text-center">Your Cart</h3>
            {cart.length === 0 ? (
              <div className="text-gray-500 text-center">Your cart is empty.</div>
            ) : (
              <ul className="mb-4">
                {cart.map((item, idx) => (
                  <li key={idx} className="border-b py-2 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-gray-500">x{item.quantity || 1}</span>
                      <span className="text-red-700 font-semibold">₹{item.price * (item.quantity || 1)}</span>
                      <button className="ml-2 text-gray-400 hover:text-red-700" title="Remove" onClick={() => removeFromCart(idx)}>
                        ×
                      </button>
                    </div>
                    {item.addons && item.addons.length > 0 && (
                      <div className="pl-4 text-xs text-gray-600">
                        Addons:
                        <ul>
                          {item.addons.map((addon, aidx) => (
                            <li key={aidx} className="flex justify-between">
                              <span>{addon.name}</span>
                              <span>₹{addon.price * (item.quantity || 1)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div className="text-right font-bold text-lg text-red-700 mb-4">Total: ₹{cartTotal}</div>
            <div className="flex justify-center gap-2">
              <button
                className="px-4 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold"
                onClick={() => setShowCart(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add to Cart Success Toast */}
      {addSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow-lg z-50 transition">Item added to cart!</div>
      )}

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-full border font-semibold transition-colors text-sm ${selectedCategory === "All" ? "bg-red-700 text-white" : "bg-white text-red-700 border-red-700 hover:bg-red-50"}`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-semibold transition-colors text-sm ${selectedCategory === cat ? "bg-red-700 text-white" : "bg-white text-red-700 border-red-700 hover:bg-red-50"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag Filter Buttons */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`flex items-center px-3 py-1 rounded-full border font-semibold text-xs transition-colors ${selectedTag === tag ? "bg-blue-700 text-white border-blue-700" : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"}`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              <span>{tag}</span>
              <span className="ml-2 bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">{tagCounts[tag]}</span>
              {selectedTag === tag && (
                <span className="ml-2 cursor-pointer text-white bg-blue-500 rounded-full px-2" title="Remove filter">×</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Menu Sections */}
      {filteredMenu
        .filter((cat) => cat.category !== "Add ons")
        .map((cat) => (
          <section key={cat.category} className="mb-14">
            <h2 className="text-2xl font-semibold text-red-700 mb-6">{cat.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {cat.items.map((item) => {
                const itemKey = `${cat.category}-${item.name}`;
                const quantity = quantities[itemKey] || 1;
                const isPizzaOrPasta = cat.category === "Veg Pizzas" || cat.category === "Non Veg Pizzas" || cat.category === "Pastas";
                return (
                  <div key={item.name} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center">
                    <img
                      src={imageMap[cat.category] || "/gallery/restaurant.png"}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded mb-4 border"
                      loading="lazy"
                    />
                    <div className="w-full flex flex-col items-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">{item.name}</h3>
                      {/* Visual tags/badges */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1 mb-2 justify-center">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                                tag === "Premium"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                  : tag === "Best Selling"
                                  ? "bg-red-100 text-red-700 border-red-300"
                                  : tag === "New Addition"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : tag === "Discount Available"
                                  ? "bg-blue-100 text-blue-700 border-blue-300"
                                  : "bg-gray-100 text-gray-700 border-gray-300"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-gray-500 mb-2 text-center">{getDescription(item.name)}</p>
                      <span className="text-red-700 font-semibold text-base">₹{item.price}</span>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={e => {
                            const val = Math.max(1, Number(e.target.value));
                            setQuantities((prev) => ({ ...prev, [itemKey]: val }));
                          }}
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                        />
                        <button
                          className="px-4 py-1 bg-red-700 text-white rounded-full text-sm font-semibold hover:bg-red-800 transition"
                          onClick={() => {
                            if (isPizzaOrPasta) {
                              setShowAddonSelector(true);
                              setPendingBaseItem(item);
                              setPendingBaseCategory(cat.category);
                            } else {
                              addToCart(item, cat.category, quantity);
                            }
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

      {/* Addon Selector Modal */}
      {showAddonSelector && pendingBaseItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-center">Select Addons for {pendingBaseItem.name}</h3>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                {getCompatibleAddons(isVeg(pendingBaseCategory, pendingBaseItem.name)).map((addon) => (
                  <label key={addon.name} className="flex items-center gap-2 border rounded px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedAddons.some((a) => a.name === addon.name)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedAddons((prev) => [...prev, addon]);
                        } else {
                          setSelectedAddons((prev) => prev.filter((a) => a.name !== addon.name));
                        }
                      }}
                    />
                    <span>{addon.name}</span>
                    <span className="text-red-700 font-semibold">₹{addon.price}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="px-4 py-1 bg-red-700 text-white rounded-full text-sm font-semibold hover:bg-red-800 transition"
                onClick={() => addToCart(pendingBaseItem, pendingBaseCategory, 1, selectedAddons)}
              >
                Add to Cart
              </button>
              <button
                className="px-4 py-1 bg-gray-300 text-gray-700 rounded-full text-sm font-semibold"
                onClick={() => {
                  setShowAddonSelector(false);
                  setSelectedAddons([]);
                  setPendingBaseItem(null);
                  setPendingBaseCategory(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
