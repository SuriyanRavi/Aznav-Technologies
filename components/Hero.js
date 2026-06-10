'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -Math.random() * 0.4 - 0.1;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.life = 1;
        this.decay = Math.random() * 0.002 + 0.0005;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * this.opacity;
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 40; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Background gradient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={`${styles.content} container`}>
        <motion.div
          className={styles.heroCenter}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
           Accelerating Innovation Through <br />
            <span className={styles.heroHighlight}>Smart Technology</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            A design-first development firm engineering high-performance web systems, mobile apps, and custom AI tools for scaling companies.
          </motion.p>

          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button className="btn-primary" onClick={scrollToServices}>
              Explore Services <ArrowRight size={18} />
            </button>
            <button className={styles.btnSecondary} onClick={scrollToContact}>
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Brand Marquee */}
      <div className={styles.brandMarquee}>
        <p className={styles.marqueeTitle}>Providing bespoke technology across industries</p>
        <div className="marquee-container">
          <div className="marquee-content">
            {['Fintech Services', 'AI & Machine Learning', 'Logistics & Supply Chain', 'Custom Enterprise Apps', 'Cloud Architecture', 'E-Commerce Solutions', 'EdTech Systems', 'Cybersecurity Protocols'].map((partner, index) => (
              <div key={index} className={styles.marqueeItem}>
                <span className={styles.marqueeDot} />
                {partner}
              </div>
            ))}
            {['Fintech Services', 'AI & Machine Learning', 'Logistics & Supply Chain', 'Custom Enterprise Apps', 'Cloud Architecture', 'E-Commerce Solutions', 'EdTech Systems', 'Cybersecurity Protocols'].map((partner, index) => (
              <div key={`dup-${index}`} className={styles.marqueeItem}>
                <span className={styles.marqueeDot} />
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
