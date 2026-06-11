'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Brain, Cloud, Shield, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

const servicesData = [
  {
    icon: Code2,
    title: 'Software Development',
    desc: 'Custom SaaS dashboards, internal tooling, and backend systems designed to solve specific bottlenecks.',
    techs: ['Node.js', 'Go', 'PostgreSQL', 'Docker', 'REST APIs', 'Redis'],
    highlight: 'Reduces operational bottlenecks by 75%',
    color: 'var(--indigo-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    desc: 'Fast, SEO-optimized frontends built with modern React frameworks like Next.js.',
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlight: 'Perfect 100/100 Lighthouse speed',
    color: 'var(--neon-cyan)',
    colorRGB: '139, 92, 246',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Native iOS and Android mobile development using React Native or Flutter.',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'App Store Release'],
    highlight: 'Unified cross-platform UX/UI',
    color: 'var(--neon-purple)',
    colorRGB: '139, 92, 246',
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    desc: 'Custom LLM integrations, conversational agents, and predictive data pipelines.',
    techs: ['LangChain', 'OpenAI API', 'PyTorch', 'Pinecone', 'Vector Indexing'],
    highlight: 'Saves 80% on standard support loads',
    color: 'var(--indigo-primary)',
    colorRGB: '15, 95, 220',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'AWS, GCP, and Azure serverless setups, Docker containers, and CI/CD pipelines.',
    techs: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    highlight: 'Configured for 99.99% availability',
    color: 'var(--neon-cyan)',
    colorRGB: '139, 92, 246',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    desc: 'Penetration testing, encryption, IAM configuration, and standard security compliance audits.',
    techs: ['OAuth 2.0', 'SSL/TLS', 'IAM Policies', 'Data Encryption', 'Security Auditing'],
    highlight: 'Complete end-to-end encryption',
    color: 'var(--neon-purple)',
    colorRGB: '139, 92, 246',
  },
];

function ServiceCard({ service }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    
    // Relative mouse position from -0.5 to 0.5
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    
    // Rotation values (max 10 degrees)
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

  const Icon = service.icon;

  return (
    <motion.div
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--accent': service.color,
        '--accent-rgb': service.colorRGB,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${coords.y}deg) rotateY(${coords.x}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Header info */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <Icon size={24} />
        </div>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardText}>{service.desc}</p>
    </motion.div>
  );
}

export default function Services() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="section-alt">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            Capabilities
          </div>
          <h2 className="section-title">
            Bespoke Engineering for{' '}
            <span className="gradient-text">High-Growth Products</span>
          </h2>
          <p className="section-subtitle">
            We don&apos;t offer generic templates. We build custom technology stacks built to scale your business operations and delight your users.
          </p>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <div className={styles.gridWrapper}>
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.title}
              service={service}
            />
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p>Looking for a custom integration or tailored consultation?</p>
          <button className="btn-primary" onClick={scrollToContact}>
            Schedule a Scoping Session <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
