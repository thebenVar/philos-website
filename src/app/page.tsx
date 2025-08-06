


"use client";
import { useState } from "react";
import Image from "next/image";

const featuredItems = [
  {
    name: "Wood-fired Pizza",
    description: "Signature Italian pizza baked in our wood-fired oven.",
    image: "/dishes/pizza.png",
  },
  {
    name: "Spicy Crunchy Tuna Sushi",
    description: "Authentic Japanese sushi with a spicy crunchy twist.",
    image: "/dishes/sushi.png",
  },
  {
    name: "Teriyaki Sliced Beef Tenderloin",
    description: "Premium beef tenderloin glazed with teriyaki sauce.",
    image: "/dishes/teriyaki_sliced_beef_tenderloin.png",
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
    name: "Catherine Chacko",
    text: "Tried the pork ribs and Chef’s Special Pizza from Philo's Delicacy — both were fantastic! The pizza was loaded with toppings, each flavor standing out yet blending beautifully. You can tell the chef truly knows what he’s doing. He was very hospitable and made the whole experience feel warm and special. Will definitely be back! Food: 5 Service: 5 Atmosphere: 5",
    rating: 5,
  },
  {
    name: "Rahul Raj",
    text: "I was never a pizza lover, but after trying the pizza at this cafe in Kochi, I’m now a big fan.Best pizza in Kochi... superb, worth it.Must try \"chef special pizza\" Food: 5 Service: 5 Atmosphere: 5",
    rating: 5
  },
  {
    name: "Sohail Zakir",
    text: "Philo's Delicacy has been an experience unlike anything else. If you haven’t tried it yet, you are seriously missing out. We’ve been making our way through different items on the menu each visit, and every single dish has been a wow wow wow moment.\
    If you're going for the first time, I highly recommend trying the sushi, quesadilla, and pizza – each one is a standout in its own right. But if you can only get one thing, make it the sushi. It’s god tier. Hands down the best we’ve ever had.\n\
    Philo’s is more than just a meal – it’s an experience worth savoring.\n\
    \nFood: 5/5 Service: 5/5 Atmosphere: 5/5",
    rating: 5
  }

];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <main style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* Global Gallery Overlay CSS */}
      <style>{`
        .gallery-caption-overlay {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .gallery-image-card:hover .gallery-caption-overlay,
        .gallery-image-card:focus .gallery-caption-overlay {
          opacity: 1 !important;
          pointer-events: auto !important;
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

      {/* Signature Dishes Section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', marginBottom: '48px', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#b91c1c', textAlign: 'center', marginBottom: '32px' }}>Signature Dishes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {featuredItems.map((item, idx) => (
            <div key={idx} style={{ width: '260px', background: '#fff', borderRadius: '18px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '18px', textAlign: 'center', marginBottom: '8px' }}>
              <Image src={item.image} alt={item.name} width={220} height={150} style={{ borderRadius: '12px', objectFit: 'cover', marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#b91c1c', marginBottom: '8px' }}>{item.name}</h3>
              <p style={{ fontSize: '1rem', color: '#444', marginBottom: 0 }}>{item.description}</p>
            </div>
          ))}
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
                cursor: 'pointer',
              }}
              onClick={() => openModal(img)}
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
      {/* Reviews Section */}
      <section style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '48px', padding: '0 16px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#b91c1c', textAlign: 'center', marginBottom: '32px' }}>What Our Guests Say</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {reviews.map((review, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 'bold', color: '#b91c1c', fontSize: '1.1rem', marginBottom: '6px' }}>{review.name}</div>
              {review.rating && (
                <div style={{ color: '#fbbf24', fontSize: '1.1rem', marginBottom: '6px' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              )}
              <div style={{ color: '#444', fontSize: '1.05rem' }}>{review.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for enlarged gallery image */}
      {modalOpen && modalImg && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
              padding: '24px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image src={modalImg.src} alt={modalImg.caption} width={600} height={400} style={{ maxWidth: '80vw', maxHeight: '60vh', borderRadius: '12px', objectFit: 'contain', marginBottom: '18px' }} />
            <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#b91c1c', textAlign: 'center', marginBottom: '8px' }}>{modalImg.caption}</div>
            <button
              onClick={closeModal}
              style={{ marginTop: '8px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
