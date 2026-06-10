'use client';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Brain, Package, HeartPulse } from 'lucide-react';
import styles from './CaseStudies.module.css';

const cases = [
  {
    icon: Brain,
    tag: 'AI & Analytics',
    title: 'AI Student Analytics',
    desc: 'Developed an intelligent academic analytics platform with predictive insights to identify at-risk students and optimize learning outcomes.',
    result: '40% improvement in student retention',
    color: '#1A73E8',
    image: '/student_analytics.jpg',
  },
  {
    icon: Package,
    tag: 'Cloud Solutions',
    title: 'Smart Inventory Management',
    desc: 'Cloud-based inventory solution with real-time stock monitoring, automated reorder alerts, and cross-location visibility.',
    result: '60% reduction in stockout incidents',
    color: '#0D47A1',
    image: '/inventory_management.jpg',
  },
  {
    icon: HeartPulse,
    tag: 'Healthcare',
    title: 'Healthcare Digital Platform',
    desc: 'Secure healthcare management system with analytics-driven patient monitoring, appointment scheduling, and compliance management.',
    result: '35% improvement in patient outcomes',
    color: '#1565C0',
    image: '/healthcare_digital_platform.jpg',
  },
];

export default function CaseStudies() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            Case Studies
          </div>
          <h2 className="section-title">
            Real Business{' '}
            <span className="gradient-text">Transformation Stories</span>
          </h2>
          <p className="section-subtitle">
            See how we&apos;ve helped businesses overcome challenges and achieve measurable results through technology.
          </p>
        </motion.div>

        <div className={styles.casesGrid}>
          {cases.map((c, i) => {
            const hasImage = !!c.image;
            
            return (
              <motion.div
                key={c.title}
                className={`${styles.caseCard} ${hasImage ? styles.withImage : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {hasImage ? (
                  <>
                    <div className={styles.imageContainer}>
                      <img src={c.image} alt={c.title} className={styles.cardImage} />
                    </div>
                    
                    <div className={styles.cardBody}>
                      <div className={styles.tag}>{c.tag}</div>
                      <h3 className={styles.caseTitle}>{c.title}</h3>
                      
                      <div className={styles.slidingContainer}>
                        <p className={styles.caseDesc}>{c.desc}</p>
                        <div className={styles.result}>
                          <TrendingUp size={16} />
                          <span>{c.result}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.caseHeader}>
                      <div className={styles.caseIcon} style={{ '--color': c.color }}>
                        <c.icon size={22} />
                      </div>
                    </div>
                    <h3 className={styles.caseTitle}>{c.title}</h3>
                    <p className={styles.caseDesc}>{c.desc}</p>
                    <div className={styles.result}>
                      <TrendingUp size={16} />
                      <span>{c.result}</span>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={styles.footerCta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>Want to be our next success story?</p>
          <button className="btn-primary" onClick={scrollToContact}>
            Start Your Project <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
