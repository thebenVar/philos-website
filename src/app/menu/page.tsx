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
      { name: "Bbq Chicken Pizza (10 Inch)", price: 575 },
      { name: "Bbq Chicken Pizza (12 Inch)", price: 725 },
      { name: "Bbq Chicken Pizza (8 Inch)", price: 425 },
      { name: "Capricciosa (10 Inch)", price: 575 },
      { name: "Capricciosa (12 Inch)", price: 700 },
      { name: "Capricciosa (8 Inch)", price: 425 },
      { name: "Chef Special Pizza (10 Inch)", price: 675, tags: ["Premium", "Best Selling"] },
      { name: "Chef Special Pizza (12 Inch)", price: 875 },
      { name: "Chef Special Pizza (8 Inch)", price: 575 },
      { name: "Chefs/jamican", price: 812 },
      { name: "Chicken Tikka Pizza (10 Inch)", price: 600 },
      { name: "Chicken Tikka Pizza (12 Inch)", price: 750 },
      { name: "Chicken Tikka Pizza (8 Inch)", price: 450 },
      { name: "Classic Pork (10 Inch)", price: 675 },
      { name: "Classic Pork (12 Inch)", price: 875 },
      { name: "Classic Pork (8 Inch)", price: 550 },
      { name: "Diavola (10 Inch)", price: 600 },
      { name: "Diavola (12 Inch)", price: 750 },
      { name: "Diavola (8 Inch)", price: 475 },
      { name: "Gamberetti (10 Inch)", price: 675 },
      { name: "Gamberetti (12 Inch)", price: 875 },
      { name: "Gamberetti (8 Inch)", price: 575 },
      { name: "Italian Salsiccia (10 Inch)", price: 575 },
      { name: "Italian Salsiccia (12 Inch)", price: 700 },
      { name: "Italian Salsiccia (8 Inch)", price: 425 },
      { name: "Jamaican Jerk Pizza (10 Inch)", price: 550 },
      { name: "Jamaican Jerk Pizza (12 Inch)", price: 750 },
      { name: "Jamaican Jerk Pizza (8 Inch)", price: 425 },
      { name: "Lebanese Chicken Pizza (10 Inch)", price: 575 },
      { name: "Lebanese Chicken Pizza (12 Inch)", price: 750 },
      { name: "Lebanese Chicken Pizza (8 Inch)", price: 450 },
      { name: "Make Your Own Pizza", price: 1200 },
      { name: "Meat Lovers Pizza (10 Inch)", price: 900 },
      { name: "Meat Lovers Pizza (12 Inch)", price: 1250 },
      { name: "Meat Lovers Pizza (8 Inch)", price: 700 },
      { name: "Pepperoni (10 Inch)", price: 575 },
      { name: "Pepperoni (12 Inch)", price: 750 },
      { name: "Pepperoni (8 Inch)", price: 425 },
      { name: "Porchetta (10 Inch)", price: 675 },
      { name: "Porchetta (12 Inch)", price: 875 },
      { name: "Porchetta (8 Inch)", price: 550 },
      { name: "Quattro Formaggi/ Chefspecial", price: 500 },
      { name: "Signature Bolognese Pizza (10 Inch)", price: 650 },
      { name: "Signature Bolognese Pizza (12 Inch)", price: 825 },
      { name: "Signature Bolognese Pizza (8 Inch)", price: 490 },
      { name: "Turkish Meat Pizza (10 Inch)", price: 650 },
      { name: "Turkish Meat Pizza (12 Inch)", price: 825 },
      { name: "Turkish Meat Pizza (8 Inch)", price: 490 },
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
      { name: "Grilled Paneer (10 Inch)", price: 525 },
      { name: "Grilled Paneer (12 Inch)", price: 650 },
      { name: "Grilled Paneer (8 Inch)", price: 375 },
      { name: "Margherita (10 Inch)", price: 450 },
      { name: "Margherita (12 Inch)", price: 600 },
      { name: "Margherita (8 Inch)", price: 325 },
      { name: "Melanzane (10 Inch)", price: 450 },
      { name: "Melanzane (12 Inch)", price: 550 },
      { name: "Melanzane (8 Inch)", price: 350 },
      { name: "Premavera (10 Inch)", price: 525 },
      { name: "Premavera (12 Inch)", price: 650 },
      { name: "Premavera (8 Inch)", price: 375 },
      { name: "Quattro Formaggi (10 Inch)", price: 575 },
      { name: "Quattro Formaggi (12 Inch)", price: 725 },
      { name: "Quattro Formaggi (8 Inch)", price: 425 },
      { name: "Wild Mushroom (10 Inch)", price: 525 },
      { name: "Wild Mushroom (12 Inch)", price: 650 },
      { name: "Wild Mushroom (8 Inch)", price: 375 },
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

  // Filtered menu data
  let filteredMenu = selectedCategory === "All" ? menuData : menuData.filter((cat) => cat.category === selectedCategory);
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
      {filteredMenu.map((cat) => (
        <section key={cat.category} className="mb-14">
          <h2 className="text-2xl font-semibold text-red-700 mb-6">{cat.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cat.items.map((item) => (
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
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
