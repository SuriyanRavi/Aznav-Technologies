'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, HeartPulse, ShoppingCart, GraduationCap, Landmark, Factory, Truck, Rocket } from 'lucide-react';
import styles from './Industries.module.css';

const industries = [
  { icon: HeartPulse, label: 'Healthcare', desc: 'Digital health platforms' },
  { icon: GraduationCap, label: 'Education', desc: 'EdTech & learning platforms' },
  { icon: Landmark, label: 'Finance', desc: 'Fintech & banking apps' },
  { icon: ShoppingCart, label: 'Retail', desc: 'E-commerce & retail solutions' },
  { icon: Factory, label: 'Manufacturing', desc: 'Industrial automation' },
  { icon: Truck, label: 'Logistics', desc: 'Supply chain management' },
  { icon: Building2, label: 'Government', desc: 'Public sector & civic tech' },
  { icon: Rocket, label: 'Startups', desc: 'MVP & product development' },
];

function IndustryCard({ item, index }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    
    // Rotate max 10 degrees
    const rotateX = -y * 10;
    const rotateY = x * 10;
    setCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const Icon = item.icon;
  // Alternate highlight color between blue and violet for the dual-tone theme
  const accentColor = index % 2 === 0 ? 'var(--blue-primary)' : 'var(--blue-accent)';
  const accentRGB = index % 2 === 0 ? '15, 95, 220' : '139, 92, 246';

  return (
    <motion.div
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--accent': accentColor,
        '--accent-rgb': accentRGB,
        transform: isHovered 
          ? `perspective(800px) rotateX(${coords.y}deg) rotateY(${coords.x}deg) scale3d(1.03, 1.03, 1.03)` 
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
      }}
    >
      <div className={styles.iconWrap}>
        <Icon size={24} />
      </div>
      <h3 className={styles.label}>{item.label}</h3>
      <p className={styles.desc}>{item.desc}</p>
    </motion.div>
  );
}

export default function Industries() {
  return (
    <section id="industries" className="section-dark">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.labelWhite}>
            <Building2 size={14} /> Industries We Serve
          </div>
          <h2 className="section-title-white">
            Empowering Businesses Across{' '}
            <span className={styles.blueText}>Multiple Domains</span>
          </h2>
          <p className="section-subtitle-white">
            We bring deep domain expertise and proven technology frameworks to every industry we work with.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {industries.map((item, index) => (
            <IndustryCard 
              key={item.label} 
              item={item} 
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
