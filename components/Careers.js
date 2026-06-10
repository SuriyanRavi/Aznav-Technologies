'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import styles from './Careers.module.css';

const roles = [
  {
    title: 'Software Developer',
    desc: 'Join our innovative development team and build scalable software solutions that make a real impact.',
    tags: ['React', 'Node.js', 'Python'],
  },
  {
    title: 'AI Engineer',
    desc: 'Build intelligent AI-powered systems. Work on cutting-edge machine learning and NLP projects.',
    tags: ['Python', 'TensorFlow', 'LLMs'],
  },
  {
    title: 'Cloud Engineer',
    desc: 'Design and manage cloud infrastructure that powers modern, scalable digital products.',
    tags: ['AWS', 'Kubernetes', 'Docker'],
  },
];

export default function Careers() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="careers" className="section-alt">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            Careers
          </div>
          <h2 className="section-title">
            Build Your Future{' '}
            <span className="gradient-text">With Us</span>
          </h2>
          <p className="section-subtitle">
            Join a team of passionate innovators building the future of technology. We offer competitive compensation, growth opportunities, and a culture that empowers you.
          </p>
        </motion.div>

        <div className={styles.rolesGrid}>
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              className={styles.roleCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <p className={styles.roleDesc}>{role.desc}</p>
              <div className={styles.roleTags}>
                {role.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <button className={styles.applyBtn} onClick={scrollToContact}>
                Apply Now <ArrowRight size={15} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cultureCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className={styles.cultureIcon}><Zap size={24} /></div>
          <div>
            <h3 className={styles.cultureTitle}>Why Work at Aznav?</h3>
            <p className={styles.cultureDesc}>
              Innovative culture · Competitive packages · Remote flexibility · Fast career growth · Collaborative teams
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
