'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = ['Home', 'About', 'Services', 'Contact'];
const services = ['AI Solutions', 'Cloud Computing', 'Cybersecurity', 'Web Development'];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.topWave} />
      <div className={`container ${styles.footerInner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <img src="/logo-light.png" alt="Aznav Technologies Logo" className={styles.logoImg} />
          </div>
          <p className={styles.brandDesc}>
            Empowering Digital Innovation Through Intelligent Technology Solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>Quick Links</h4>
          <ul className={styles.links}>
            {quickLinks.map(link => (
              <li key={link}>
                <button onClick={() => scrollTo(link.toLowerCase())} className={styles.link}>
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>Services</h4>
          <ul className={styles.links}>
            {services.map(s => (
              <li key={s}>
                <button onClick={() => scrollTo('services')} className={styles.link}>{s}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>Contact</h4>
          <div className={styles.contactInfo}>
            <a href="mailto:aznavtechnologies@gmail.com" className={styles.contactLine}>
              <Mail size={15} /> aznavtechnologies@gmail.com
            </a>
            <a href="tel:+919629304353" className={styles.contactLine}>
              <Phone size={15} /> +91 96293 04353
            </a>
            <div className={styles.contactLine}>
              <MapPin size={15} /> Bengaluru, Karnataka, India
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Aznav Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
