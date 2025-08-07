
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="bg-white shadow-sm px-8 sticky top-0 z-50">
      <div className="flex items-center h-20 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center mr-8 no-underline">
          <Image 
            src="/logo.png" 
            alt="Philos Delicacy Logo" 
            width={60} 
            height={60} 
          />
          <span className="font-bold text-2xl text-primary-red tracking-wide ml-3">
            Philo's Delicacy
          </span>
        </Link>
        <ul className="flex gap-8 list-none m-0 p-0 flex-1 justify-end items-center">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className="text-text-dark font-medium text-lg no-underline py-2 transition-colors duration-200 border-b-2 border-transparent inline-block nav-link-custom"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://www.swiggy.com/city/kochi/philos-delicacy-kakkanad-rest1076417"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-[#fc8019] text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-[#e46a0a] hover:text-white text-base"
            >
              Order on Swiggy
            </a>
          </li>
          <li>
            <a
              href="https://www.zomato.com/kochi/philos-delicacy-kakkanad/order"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-[#e23744] text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-[#b71c1c] hover:text-white text-base"
            >
              Order on Zomato
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
