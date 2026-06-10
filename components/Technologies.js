'use client';
import { motion } from 'framer-motion';
import styles from './Technologies.module.css';

const techCategories = [
  {
    category: 'Artificial Intelligence',
    techs: ['OpenAI API', 'LangChain', 'LlamaIndex', 'NLP', 'RAG Pipelines'],
    color: 'var(--blue-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    category: 'Machine Learning',
    techs: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'Predictive Modeling'],
    color: 'var(--blue-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    category: 'Robotic Process Automation',
    techs: ['UiPath', 'Automation Anywhere', 'Blue Prism', 'API Integration', 'Workflow Automation'],
    color: 'var(--blue-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    category: 'Blockchain',
    techs: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'dApps'],
    color: 'var(--blue-accent)',
    colorRGB: '139, 92, 246',
  },
  {
    category: 'Internet of Things (IoT)',
    techs: ['MQTT', 'Raspberry Pi', 'Edge Computing', 'Arduino', 'Sensors & Firmware'],
    color: 'var(--blue-accent)',
    colorRGB: '139, 92, 246',
  },
  {
    category: 'Augmented/Virtual Reality (AR/VR)',
    techs: ['Unity', 'Unreal Engine', 'WebXR', 'Three.js', 'Meta Quest SDK'],
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
              <div className={styles.techTags}>
                {cat.techs.map((tech, j) => (
                  <motion.span
                    key={tech}
                    className={styles.tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.04, duration: 0.3 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
