

import Image from "next/image";

const featuredItems = [
  {
    name: "Kerala Sadya",
    description: "Traditional Kerala feast with a variety of vegetarian dishes.",
    image: "/sadya.jpg",
  },
  {
    name: "Malabar Chicken Biryani",
    description: "Aromatic rice and tender chicken cooked with Malabar spices.",
    image: "/biryani.jpg",
  },
  {
    name: "Appam & Stew",
    description: "Soft appams served with creamy vegetable stew.",
    image: "/appam.jpg",
  },
];


const galleryImages = [
  { src: "/gallery/beverage_bar.png", caption: "Our Modern Bar" },
  { src: "/gallery/diavola.png", caption: "Wood-fired Pizzas" },
  { src: "/gallery/passionfruit_spritzer.png", caption: "Handcrafted Beverages" },
  { src: "/gallery/philos_exterior.png", caption: "Our Unique Exterior" },
  { src: "/gallery/potato_wedges.png", caption: "Gourmet Loaded Fries" },
  { src: "/gallery/restaurant.png", caption: "Warm and Inviting Ambience" },
  { src: "/gallery/spicy_crunchy_tuna_roll.png", caption: "Authentic Japanese Sushi" },
];

const reviews = [
  {
    name: "Akhil P.",
    text: "Amazing food and great hospitality! Highly recommend Philos Delicacy.",
  },
  {
    name: "Meera S.",
    text: "Authentic Kerala flavors, cozy ambiance, and friendly staff.",
  },
  {
    name: "John D.",
    text: "The Sadya was a highlight. Will visit again!",
  },
];

export default function Home() {
  return (
    <main style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* Global Gallery Overlay CSS */}
      <style>{`
        .gallery-caption-overlay:hover, .gallery-caption-overlay:focus {
          opacity: 1 !important;
          pointer-events: auto;
        }
        .gallery-caption-overlay {
          opacity: 0;
          pointer-events: none;
        }
        .gallery-image-card:hover > .gallery-caption-overlay {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
      {/* Hero Section */}
      <section style={{ background: '#fff', padding: '48px 0 32px 0', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
        <Image src="/logo.png" alt="Philo's Delicacy Logo" width={120} height={120} style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#b91c1c', marginBottom: '12px' }}>Savor The Uniqueness</h1>
        <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '24px' }}>A culinary journey from authentic Italian pizzas to exquisite global flavors, right here in the heart of Kakkanad.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '8px' }}>
          <a href="/menu" style={{ background: '#b91c1c', color: '#fff', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>View Menu</a>
          <a href="/contact" style={{ background: '#fff', color: '#b91c1c', border: '2px solid #b91c1c', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Contact Us</a>
        </div>
      </section>
      {/* Gallery Section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '48px', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#b91c1c', textAlign: 'center', marginBottom: '32px' }}>A Glimpse Inside</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="gallery-image-card"
              style={{
                position: 'relative',
                borderRadius: '16px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                width: '220px',
                height: '150px',
                marginBottom: '8px',
                background: '#fff',
              }}
            >
              <Image src={img.src} alt={img.caption} width={220} height={150} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div
                className="gallery-caption-overlay"
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
