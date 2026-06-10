'use client';
import { motion } from 'framer-motion';
import { Eye, Rocket, CheckCircle2 } from 'lucide-react';
import styles from './About.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const highlights = [
  'Digital Transformation Experts',
  'Agile & Scalable Delivery',
  'Dedicated Technical Teams',
  'Transparent Communication',
];

export default function About() {
  return (
    <section id="about" className="section-alt">
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Left */}
          <motion.div
            className={styles.aboutLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <div className="section-label">
                About Us
              </div>
              <h2 className="section-title">
                Engineering Intelligent{' '}
                <span className="gradient-text">Digital Experiences</span>
              </h2>
              <div className="divider" />
            </motion.div>

            <motion.p variants={fadeUp} className="section-subtitle">
              Aznav Technologies is a next-generation technology company focused on delivering innovative digital solutions that help businesses accelerate growth, improve efficiency, and achieve digital excellence.
            </motion.p>

            <motion.ul variants={fadeUp} className={styles.highlights}>
              {highlights.map((item) => (
                <li key={item} className={styles.highlight}>
                  <CheckCircle2 size={18} className={styles.check} />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right – Cards */}
          <motion.div
            className={styles.aboutRight}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.whoWeAre}>
              <h3 className={styles.cardTitle}>Who We Are</h3>
              <p>A passionate team of engineers, designers, and strategists committed to delivering technology solutions that drive real business impact. We combine technical expertise with deep domain knowledge to build products that scale.</p>
            </div>

            <div className={styles.pillars}>
              <div className={styles.pillar}>
                <div className={styles.pillarIcon}><Eye size={22} /></div>
                <div>
                  <h4 className={styles.pillarTitle}>Our Vision</h4>
                  <p className={styles.pillarText}>To become a globally trusted technology partner empowering organizations through innovation, intelligence, and digital transformation.</p>
                </div>
              </div>
              <div className={styles.pillar}>
                <div className={styles.pillarIcon}><Rocket size={22} /></div>
                <div>
                  <h4 className={styles.pillarTitle}>Our Mission</h4>
                  <p className={styles.pillarText}>Deliver high-quality technology solutions, empower businesses with digital innovation, and build sustainable and scalable IT ecosystems.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
