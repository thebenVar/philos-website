
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text-dark)] text-white pt-12 pb-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center mb-2">
            <Image src="/logo.png" alt="Philo's Delicacy Logo" width={48} height={48} />
            <span className="ml-3 font-bold text-xl tracking-wide">Philo's Delicacy</span>
          </Link>
          <p className="text-sm text-gray-300 max-w-xs">
            A culinary journey from authentic Italian pizzas to exquisite global flavors.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-2 text-accent-gold">Contact Info</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>8/4166, Vayanasala Road, Edachira, Kakkanad, Cochin 682030</li>
            <li>8891655177</li>
            <li>
              <a href="mailto:philosdelicacy@gmail.com" className="hover:underline text-accent-gold">philosdelicacy@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="font-semibold text-lg mb-2 text-accent-gold">Opening Hours</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Mon - Sat: 12:00 PM - 11:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-2 text-accent-gold">Quick Links</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li><Link href="/menu" className="hover:text-accent-gold">Menu</Link></li>
            <li><Link href="/about" className="hover:text-accent-gold">About</Link></li>
            <li><Link href="/contact" className="hover:text-accent-gold">Contact</Link></li>
            <li>
              <a
                href="https://www.swiggy.com/city/kochi/philos-delicacy-kakkanad-rest1076417"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold"
              >
                Order on Swiggy
              </a>
            </li>
            <li>
              <a
                href="https://www.zomato.com/kochi/philos-delicacy-kakkanad/order"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-gold"
              >
                Order on Zomato
              </a>
            </li>
            <li><a href="#" className="hover:text-accent-gold">Online Ordering</a></li>
            <li><a href="#" className="hover:text-accent-gold">Catering Services</a></li>
            <li><a href="#" className="hover:text-accent-gold">Private Events</a></li>
            <li><a href="#" className="hover:text-accent-gold">Gift Cards</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-2">
        <span>© 2025 Philo's Delicacy. All rights reserved. Savor the Uniqueness.</span>
        <span className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="inline-flex items-center h-8 px-3 rounded-full" style={{ background: '#e0e7ef' }}>
            <img src="/fssai.png" alt="FSSAI Logo" className="h-6 w-6 object-contain mr-2" />
            <span className="text-xs font-semibold text-accent-gold tracking-wider">11325007000632</span>
          </span>
        </span>
        <span className="mt-2 md:mt-0">Made with <span className="text-accent-gold">&#10084;</span> by benVar</span>
      </div>
    </footer>
  );
}
