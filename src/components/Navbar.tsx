
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const navbarStyle = {
    background: 'var(--white)',
    boxShadow: 'var(--shadow-sm)',
    padding: `0 var(--spacing-xl)`,
    position: 'sticky' as const,
    top: 0,
    zIndex: 100
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: 'var(--spacing-xl)',
    textDecoration: 'none'
  };

  const logoTextStyle = {
    fontWeight: 'bold',
    fontSize: 'var(--font-size-2xl)',
    color: 'var(--primary-red)',
    letterSpacing: '1px',
    marginLeft: 'var(--spacing-sm)'
  };

  const navListStyle = {
    display: 'flex',
    gap: 'var(--spacing-xl)',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'flex-end'
  };

  const navLinkStyle = {
    color: 'var(--text-dark)',
    fontWeight: '500',
    fontSize: 'var(--font-size-lg)',
    textDecoration: 'none',
    padding: 'var(--spacing-xs) 0',
    transition: `color var(--transition-fast)`,
    borderBottom: '2px solid transparent',
    display: 'inline-block'
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <Link href="/" style={logoStyle}>
          <Image 
            src="/logo.png" 
            alt="Philos Delicacy Logo" 
            width={60} 
            height={60} 
          />
          <span style={logoTextStyle}>Philo's Delicacy</span>
        </Link>
        <ul style={navListStyle}>
          {navLinks.map((link) => (
            <li key={link.href} style={{ position: 'relative' }}>
              <Link
                href={link.href}
                style={navLinkStyle}
                className="nav-link-custom"
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
