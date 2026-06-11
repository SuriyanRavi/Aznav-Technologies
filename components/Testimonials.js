'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "Aznav Technologies delivered a highly efficient and scalable solution that transformed our business operations.",
    color: "var(--indigo-primary)",
    role: "Co-Founder & CTO",
    company: "Fintech Services Startup",
  },
  {
    quote: "Their professional team and innovative approach exceeded our expectations.",
    color: "var(--neon-cyan)",
    role: "Director of Product",
    company: "Logistics Solutions Inc",
  },
  {
    quote: "Excellent support, timely delivery, and quality service.",
    color: "var(--neon-purple)",
    role: "Head of Engineering",
    company: "EdTech Platform",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const prev = () => {
    setDirection(-1);
    setIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setDirection(1);
    setIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const setSlide = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const current = testimonials[index];

  // Animation variants for horizontal carousel sliding
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0
    })
  };

  return (
    <section className="section-alt">
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">
            Reviews
          </div>
          <h2 className="section-title">
            What Our Partners <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="section-subtitle">
            We focus on establishing long-term product engineering partnerships. Here is how we help businesses ship software.
          </p>
        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.testimonialContainer}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className={styles.card}
              >
                <div className={styles.iconQuote} style={{ color: current.color }}>
                  <Quote size={40} fill="currentColor" className={styles.quoteIcon} />
                </div>

                <p className={styles.quoteText}>&ldquo;{current.quote}&rdquo;</p>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button onClick={prev} className={styles.ctrlBtn} aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <div className={styles.indicators}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`${styles.indicator} ${i === index ? styles.activeIndicator : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className={styles.ctrlBtn} aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
