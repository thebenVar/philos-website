
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
    { name: "Spicy Crunchy Tuna Roll", price: 650 },
    { name: "Tuna Akami Roll", price: 650 },
  ]},
  { category: "BEVERAGES", items: [
    { name: "Blue Lagoon", price: 160 },
    { name: "Fresh Lime", price: 75 },
    { name: "Iced Tea", price: 125 },
    { name: "Irish Coffee Delight", price: 170 },
    { name: "King Alphonso", price: 180 },
    { name: "Mango Basil Blossom", price: 180 },
    { name: "Passionfruit Spritzer", price: 160 },
    { name: "Pina Colada", price: 170 },
    { name: "Sprite", price: 20 },
    { name: "Virgin Mojito", price: 120 },
  ]},
  { category: "Mains", items: [
    { name: "Grilled Beef Tenderloin", price: 520 },
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
    { name: "Chef Special Pizza (10 Inch)", price: 675 },
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

export default function MenuPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '32px', color: '#b91c1c', textAlign: 'center' }}>Menu</h1>
      {menuData.map((cat) => (
        <section key={cat.category} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#b91c1c', marginBottom: '16px' }}>{cat.category}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
            <tbody>
              {cat.items.map((item) => (
                <tr key={item.name}>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #eee', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #eee', textAlign: 'right', color: '#444' }}>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
