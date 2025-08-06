
export default function Footer() {
  const footerStyle = {
    background: 'var(--text-dark)',
    color: 'var(--white)',
    textAlign: 'center' as const,
    padding: 'var(--spacing-lg) 0',
    marginTop: 'var(--spacing-2xl)'
  };

  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0 }}>© 2025 Philos Delicacy. All rights reserved.</p>
    </footer>
  );
}
