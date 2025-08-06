
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
    <nav style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '0 32px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '80px', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', marginRight: '32px', textDecoration: 'none' }}>
          <Image src="/logo.png" alt="Philos Delicacy Logo" width={60} height={60} style={{ marginRight: '12px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#b91c1c', letterSpacing: '1px' }}>Philo's Delicacy</span>
        </Link>
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0, flex: 1, justifyContent: 'flex-end' }}>
          {navLinks.map((link) => (
            <li key={link.href} style={{ position: 'relative' }}>
              <Link
                href={link.href}
                style={{
                  color: '#333',
                  fontWeight: '500',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 0.2s',
                  borderBottom: '2px solid transparent',
                  display: 'inline-block',
                }}
                className="nav-link-custom"
              >
                {link.label}
              </Link>
              <style>{`
                .nav-link-custom:hover {
                  color: #b91c1c !important;
                  border-bottom: 2px solid #b91c1c !important;
                  background: linear-gradient(90deg, #fff 60%, #f7dada 100%);
                  transition: color 0.2s, border-bottom 0.2s, background 0.3s;
                }
                .nav-link-custom:active {
                  color: #b91c1c !important;
                  border-bottom: 2px solid #b91c1c !important;
                }
              `}</style>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
