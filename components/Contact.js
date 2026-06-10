'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [website, setWebsite] = useState(''); // Honeypot state
  const [formLoadTime, setFormLoadTime] = useState(0); // Time-based defense
  const [csrfToken, setCsrfToken] = useState(''); // CSRF token
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [error, setError] = useState(''); // Submission error message

  useEffect(() => {
    setFormLoadTime(Date.now());
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken || ''))
      .catch(() => {});
  }, []);

  const faqs = [
    {
      q: "Do you sign Non-Disclosure Agreements (NDAs)?",
      a: "Yes. Before discussing any project details, we sign a standard mutual NDA to protect your IP."
    },
    {
      q: "How are project payments structured?",
      a: "We structure project payments in milestone-based installments: a kickoff deposit, milestones upon visual review, and a final deployment fee."
    },
    {
      q: "Will we own the full source code?",
      a: "Absolutely. Once the project invoice is completed, 100% of the IP, repositories, and source code ownership transfer to your business."
    },
    {
      q: "What is your typical project timeline?",
      a: "Standard web projects take 4-8 weeks, mobile apps take 6-12 weeks, and custom integrations take 3-5 weeks."
    }
  ];

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          website,
          form_start_time: formLoadTime,
          _csrf: csrfToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSent(true);
        setForm({ name: '', email: '', company: '', service: '', message: '' });
        setWebsite('');
      } else {
        setError(result.error || 'Failed to submit message.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            Contact Us
          </div>
          <h2 className="section-title">
            We Are Ready to Help{' '}
            <span className="gradient-text">Your Business Grow</span>
          </h2>
          <p className="section-subtitle">
            Tell us about your project and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Left – FAQ and Info */}
          <motion.div
            className={styles.infoPanel}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className={styles.infoPanelTitle}>Frequently Asked Questions</h3>
            <p className={styles.infoPanelDesc}>
              Quick answers to common questions about NDAs, source code ownership, and timelines.
            </p>

            <div className={styles.faqList}>
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}>
                    <button type="button" onClick={() => toggleFaq(idx)} className={styles.faqQuestionBtn}>
                      <span>{faq.q}</span>
                      <ChevronDown size={16} className={styles.faqArrow} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className={styles.faqAnswer}
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className={styles.minimalContactRow}>
              <a href="mailto:aznavtechnologies@gmail.com" className={styles.minContactItem}>
                <Mail size={16} /> aznavtechnologies@gmail.com
              </a>
              <a href="tel:+919629304353" className={styles.minContactItem}>
                <Phone size={16} /> +91 96293 04353
              </a>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            className={styles.formPanel}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            {sent ? (
              <div className={styles.successMsg}>
                <CheckCircle2 size={56} className={styles.successIcon} />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSent(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                <h3 className={styles.formTitle}>Send Us a Message</h3>

                {/* Honeypot field for bot trap */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
                  <input
                     type="text"
                     name="website"
                     tabIndex={-1}
                     autoComplete="off"
                     value={website}
                     onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Hidden security token values */}
                <input type="hidden" name="form_start_time" value={formLoadTime} />
                <input type="hidden" name="_csrf" value={csrfToken} />

                {error && (
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '20px'
                  }}>
                    {error}
                  </div>
                )}

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="email">Business Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Your Company"
                      value={form.company}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="service">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={styles.input}
                    >
                      <option value="">Select a service</option>
                      <option value="software">Software Development</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="security">Cybersecurity</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project or requirements..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                  />
                </div>

                <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>Send Message <Send size={17} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
