


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
    <main style={{ background: 'var(--background-light)', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'var(--white)', 
        padding: 'var(--spacing-2xl) 0 var(--spacing-xl) 0', 
        textAlign: 'center', 
        boxShadow: 'var(--shadow-sm)', 
        marginBottom: 'var(--spacing-xl)' 
      }}>
        <Image 
          src="/logo.png" 
          alt="Philo's Delicacy Logo" 
          width={120} 
          height={120} 
          style={{ marginBottom: 'var(--spacing-md)' }} 
        />
        <h1 style={{ 
          fontSize: 'var(--font-size-4xl)', 
          fontWeight: 'bold', 
          color: 'var(--primary-red)', 
          marginBottom: 'var(--spacing-sm)' 
        }}>
          Savor The Uniqueness
        </h1>
        <p style={{ 
          fontSize: 'var(--font-size-xl)', 
          color: 'var(--text-medium)', 
          marginBottom: 'var(--spacing-lg)' 
        }}>
          A culinary journey from authentic Italian pizzas to exquisite global flavors, right here in the heart of Kakkanad.
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-xs)' 
        }}>
          <a href="/menu" className="btn-primary">View Menu</a>
          <a href="/contact" className="btn-secondary">Contact Us</a>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="section">
        <h2 className="section-title">Signature Dishes</h2>
        <div className="grid-center">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="card" style={{ 
              width: '260px', 
              textAlign: 'center' 
            }}>
              <Image 
                src={item.image} 
                alt={item.name} 
                width={220} 
                height={150} 
                style={{ 
                  borderRadius: 'var(--border-radius-md)', 
                  objectFit: 'cover', 
                  marginBottom: 'var(--spacing-sm)' 
                }} 
              />
              <h3 style={{ 
                fontSize: 'var(--font-size-xl)', 
                fontWeight: 'bold', 
                color: 'var(--primary-red)', 
                marginBottom: 'var(--spacing-xs)' 
              }}>
                {item.name}
              </h3>
              <p style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: 'var(--text-medium)', 
                marginBottom: 0 
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Gallery Section */}
      <section className="section">
        <h2 className="section-title">A Glimpse Inside</h2>
        <div className="grid-gallery">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="gallery-image-card"
              onClick={() => openModal(img)}
            >
              <Image 
                src={img.src} 
                alt={img.caption} 
                width={220} 
                height={150} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div className="gallery-caption-overlay">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Reviews Section */}
      <section className="section-narrow">
        <h2 className="section-title">What Our Guests Say</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {reviews.map((review, idx) => (
            <div key={idx} className="card" style={{ alignItems: 'flex-start' }}>
              <div style={{ 
                fontWeight: 'bold', 
                color: 'var(--primary-red)', 
                fontSize: 'var(--font-size-lg)', 
                marginBottom: 'var(--spacing-xs)' 
              }}>
                {review.name}
              </div>
              {review.rating && (
                <div style={{ 
                  color: 'var(--gold)', 
                  fontSize: 'var(--font-size-lg)', 
                  marginBottom: 'var(--spacing-xs)' 
                }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              )}
              <div style={{ 
                color: 'var(--text-medium)', 
                fontSize: 'var(--font-size-md)' 
              }}>
                {review.text}
              </div>
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
            background: 'var(--overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--border-radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              padding: 'var(--spacing-lg)',
              maxWidth: '90vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image 
              src={modalImg.src} 
              alt={modalImg.caption} 
              width={600} 
              height={400} 
              style={{ 
                maxWidth: '80vw', 
                maxHeight: '60vh', 
                borderRadius: 'var(--border-radius-md)', 
                objectFit: 'contain', 
                marginBottom: 'var(--spacing-lg)' 
              }} 
            />
            <div style={{ 
              fontSize: 'var(--font-size-xl)', 
              fontWeight: 600, 
              color: 'var(--primary-red)', 
              textAlign: 'center', 
              marginBottom: 'var(--spacing-xs)' 
            }}>
              {modalImg.caption}
            </div>
            <button
              onClick={closeModal}
              className="btn-primary"
              style={{ marginTop: 'var(--spacing-xs)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
