'use client';
import { motion } from 'framer-motion';
import styles from './Technologies.module.css';

const techCategories = [
  {
    category: 'Artificial Intelligence',
    desc: 'Integrating custom LLMs, building autonomous conversational agents, and deploying secure RAG pipelines to automate support and drive user engagement.',
    color: 'var(--blue-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    category: 'Machine Learning',
    desc: 'Designing predictive data pipelines, custom recommendation engines, and advanced analytics models to extract actionable insights from business data.',
    color: 'var(--blue-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    category: 'Robotic Process Automation',
    desc: 'Streamlining complex workflows, automating manual data entry, and connecting disparate legacy systems using modern RPA APIs and tools.',
    color: 'var(--blue-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    category: 'Blockchain',
    desc: 'Developing secure smart contracts, decentralized applications (dApps), and tokenization systems on Ethereum and other modern protocols.',
    color: 'var(--blue-accent)',
    colorRGB: '139, 92, 246',
  },
  {
    category: 'Internet of Things (IoT)',
    desc: 'Configuring edge computing firmware, connecting hardware arrays, and setting up secure, real-time telemetry pipelines via MQTT.',
    color: 'var(--blue-accent)',
    colorRGB: '139, 92, 246',
  },
  {
    category: 'Augmented/Virtual Reality (AR/VR)',
    desc: 'Creating immersive WebXR, Unity, and Unreal experiences designed for next-generation platforms like the Meta Quest.',
    color: 'var(--blue-accent)',
    colorRGB: '139, 92, 246',
  },
];

export default function Technologies() {
  return (
    <section id="technologies" className={styles.sectionHighlight}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            Technologies We Use
          </div>
          <h2 className="section-title">
            Modern Tech Stack for{' '}
            <span className="gradient-text">Scalable Solutions</span>
          </h2>
          <p className="section-subtitle">
            We leverage the latest technologies and frameworks to build robust, scalable, and future-proof solutions.
          </p>
        </motion.div>
 
        <div className={styles.categoriesGrid}>
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              className={styles.category}
              style={{
                '--accent': cat.color,
                '--accent-rgb': cat.colorRGB,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <h3 className={styles.catTitle}>{cat.category}</h3>
              <p className={styles.catDesc}>{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
