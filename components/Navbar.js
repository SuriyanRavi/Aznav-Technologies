'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map(i => i.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {menuOpen && (
        <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
      )}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.navInner} container`}>
          <a href="#home" className={styles.logo} onClick={() => handleNavClick('#home')}>
            <img src="/logo.png" alt="Aznav Technologies Logo" className={styles.logoImg} />
          </a>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.mobileOpen : ''}`}>
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`${styles.navLink} ${activeSection === item.href.replace('#', '') ? styles.active : ''}`}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/919629304353"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
                aria-label="Chat on WhatsApp"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className={styles.whatsappIcon} />
              </a>
            </li>
          </ul>

          <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </>
  );
}
