

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaUsers, FaUtensils, FaChalkboardTeacher, FaBriefcase } from "react-icons/fa";

const specialServices = [
  {
    icon: <FaUsers className="text-4xl text-accent-gold mb-3" />,
    title: "Private Events",
    description: "Host your special occasion in our private dining room (up to 40 guests)",
  },
  {
    icon: <FaUtensils className="text-4xl text-accent-gold mb-3" />,
    title: "Catering Services",
    description: "Bring authentic Italian flavors to your office or event",
  },
  {
    icon: <FaChalkboardTeacher className="text-4xl text-accent-gold mb-3" />,
    title: "Cooking Classes",
    description: "Learn to make authentic Italian pizza and pasta from our chefs",
  },
  {
    icon: <FaBriefcase className="text-4xl text-accent-gold mb-3" />,
    title: "Corporate Lunch",
    description: "Special lunch packages for business meetings and corporate events",
  },
];

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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextReview = () => {
    setCurrentReviewIndex(
      currentReviewIndex === reviews.length - 1 ? 0 : currentReviewIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex(
      currentReviewIndex === 0 ? reviews.length - 1 : currentReviewIndex - 1
    );
  };

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <main className="min-h-screen" style={{ background: '#f7f7f7' }}>
      {/* Hero Section */}
      <section className="bg-white py-12 px-8 text-center mb-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <Image 
          src="/logo.png" 
          alt="Philo's Delicacy Logo" 
          width={120} 
          height={120} 
          className="mb-4 mx-auto" 
        />
        <h1 className="text-5xl font-bold mb-3" style={{ color: '#b91c1c' }}>
          Savor The Uniqueness
        </h1>
        <p className="text-xl mb-6" style={{ color: '#444' }}>
          A culinary journey from authentic Italian pizzas to exquisite global flavors, right here in the heart of Kakkanad.
        </p>
        <div className="flex justify-center gap-4 mb-2">
          <a href="/menu" className="btn-primary">View Menu</a>
          <a href="/contact" className="btn-secondary">Contact Us</a>
        </div>
      </section>

      {/* Reviews Slider Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#b91c1c' }}>
            What Our Guests Say
          </h2>
          <div className="relative">
            {/* Review Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevReview}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  style={{ color: '#b91c1c' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>
                
                <div className="flex-1 text-center">
                  <div className="font-bold text-xl mb-2" style={{ color: '#b91c1c' }}>
                    {reviews[currentReviewIndex].name}
                  </div>
                  <div className="text-2xl mb-4" style={{ color: '#fbbf24' }}>
                    {'★'.repeat(reviews[currentReviewIndex].rating)}{'☆'.repeat(5 - reviews[currentReviewIndex].rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {reviews[currentReviewIndex].text}
                  </p>
                </div>
                
                <button
                  onClick={nextReview}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  style={{ color: '#b91c1c' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentReviewIndex 
                        ? 'bg-red-700' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="section">
        <h2 className="section-title">Signature Dishes</h2>
        <div className="grid-center">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="card text-center" style={{ width: '260px' }}>
              <Image 
                src={item.image} 
                alt={item.name} 
                width={220} 
                height={150} 
                className="object-cover mb-3 mx-auto" 
                style={{ borderRadius: '12px' }}
              />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#b91c1c' }}>
                {item.name}
              </h3>
              <p className="text-base mb-0" style={{ color: '#444' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Special Services Section */}
      <section className="section bg-white rounded-xl shadow-lg my-12">
        <h2 className="section-title mb-8">Special Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specialServices.map((service, idx) => (
            <div key={idx} className="card flex flex-col items-center text-center p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-primary-red">{service.title}</h3>
              <p className="text-gray-700 text-base mb-0">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <a href="/special-services" className="btn-primary">Learn More</a>
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
                className="w-full h-full object-cover" 
              />
              <div className="gallery-caption-overlay">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for enlarged gallery image */}
      {modalOpen && modalImg && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl p-6 max-w-[90vw] max-h-[80vh] flex flex-col items-center"
          >
            <Image 
              src={modalImg.src} 
              alt={modalImg.caption} 
              width={600} 
              height={400} 
              className="max-w-[80vw] max-h-[60vh] rounded-md object-contain mb-6" 
            />
            <div className="text-xl font-semibold text-primary-red text-center mb-2">
              {modalImg.caption}
            </div>
            <button
              onClick={closeModal}
              className="btn-primary mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
