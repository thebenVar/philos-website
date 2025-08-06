
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
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
        <ul className="flex gap-8 list-none m-0 p-0 flex-1 justify-end">
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
        </ul>
      </div>
    </nav>
  );
}
