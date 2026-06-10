'use client';
import { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight } from 'lucide-react';
import styles from './Estimator.module.css';

const PROJECT_TYPES = [
  { id: 'web', name: 'Web Application', basePrice: 4000, baseWeeks: 4 },
  { id: 'mobile', name: 'Mobile App (iOS/Android)', basePrice: 6000, baseWeeks: 6 },
  { id: 'ai', name: 'AI & Analytics Integration', basePrice: 8000, baseWeeks: 8 },
  { id: 'fullstack', name: 'Full-Stack Enterprise', basePrice: 12000, baseWeeks: 10 },
];

const SCOPES = [
  { id: 'small', name: 'Lightweight (1-5 screens)', multiplier: 1.0 },
  { id: 'medium', name: 'Standard (6-15 screens)', multiplier: 1.4 },
  { id: 'large', name: 'Complex (16+ screens)', multiplier: 2.0 },
];

const FEATURES = [
  { id: 'auth', name: 'User Authentication', price: 800, weeks: 1 },
  { id: 'payments', name: 'Payment Integrations', price: 1200, weeks: 1 },
  { id: 'admin', name: 'Admin Control Panel', price: 1500, weeks: 2 },
  { id: 'ai', name: 'Custom AI Agents / RAG', price: 3000, weeks: 3 },
  { id: 'security', name: 'Security Hardening', price: 2000, weeks: 2 },
];

export default function Estimator() {
  const [projectType, setProjectType] = useState('web');
  const [scope, setScope] = useState('small');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (id) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const selectedType = PROJECT_TYPES.find(t => t.id === projectType);
    const selectedScope = SCOPES.find(s => s.id === scope);
    
    let basePrice = selectedType.basePrice * selectedScope.multiplier;
    let baseWeeks = selectedType.baseWeeks;

    selectedFeatures.forEach(featId => {
      const feat = FEATURES.find(f => f.id === featId);
      if (feat) {
        basePrice += feat.price;
        baseWeeks += feat.weeks;
      }
    });

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.15);

    return { minPrice, maxPrice, weeks: baseWeeks };
  }, [projectType, scope, selectedFeatures]);

  const handleApplyEstimate = () => {
    const typeLabel = PROJECT_TYPES.find(t => t.id === projectType).name;
    const scopeLabel = SCOPES.find(s => s.id === scope).name;
    const featuresLabels = selectedFeatures.map(id => FEATURES.find(f => f.id === id).name).join(', ') || 'None';
    
    const formattedText = `Estimate details from calculator:\n\n- Platform: ${typeLabel}\n- Scope size: ${scopeLabel}\n- Features: ${featuresLabels}\n- Approx budget range: $${estimate.minPrice.toLocaleString()} - $${estimate.maxPrice.toLocaleString()}\n- Target timeline: ${estimate.weeks} weeks.\n\nPlease describe any additional requirements here...`;

    // Try to update standard contact form fields directly
    const contactTextarea = document.getElementById('message');
    const contactServiceSelect = document.getElementById('service');

    if (contactServiceSelect) {
      if (projectType === 'web') contactServiceSelect.value = 'web';
      else if (projectType === 'mobile') contactServiceSelect.value = 'mobile';
      else if (projectType === 'ai') contactServiceSelect.value = 'ai';
      else contactServiceSelect.value = 'software';
      
      // Trigger native element updates
      const event = new Event('change', { bubbles: true });
      contactServiceSelect.dispatchEvent(event);
    }

    if (contactTextarea) {
      contactTextarea.value = formattedText;
      const event = new Event('change', { bubbles: true });
      contactTextarea.dispatchEvent(event);
      contactTextarea.focus();
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="estimator" className="section-dark">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.labelWhite}>
            <Calculator size={14} /> Planner
          </div>
          <h2 className="section-title-white">
            Estimate Your <span className={styles.blueText}>Project Cost</span>
          </h2>
          <p className="section-subtitle-white">
            Use our interactive calculator to scope out your application features and get an instant cost and timeline range.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Controls Column */}
          <div className={styles.controlsPanel}>
            <div className={styles.formGroup}>
              <h3 className={styles.panelSubtitle}>1. Platform Type</h3>
              <div className={styles.typeGrid}>
                {PROJECT_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`${styles.selectBtn} ${projectType === type.id ? styles.activeSelect : ''}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <h3 className={styles.panelSubtitle}>2. Project Complexity</h3>
              <div className={styles.scopeRow}>
                {SCOPES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setScope(s.id)}
                    className={`${styles.scopeBtn} ${scope === s.id ? styles.activeScope : ''}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <h3 className={styles.panelSubtitle}>3. Required Features</h3>
              <div className={styles.featuresList}>
                {FEATURES.map(feat => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`${styles.featureItem} ${isChecked ? styles.activeFeature : ''}`}
                    >
                      <div className={styles.checkbox}>
                        {isChecked && <Check size={12} />}
                      </div>
                      <span className={styles.featureName}>{feat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className={styles.summaryPanel}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Estimated Summary</h3>
              <div className={styles.divider} />

              <div className={styles.metricRow}>
                <div className={styles.metricLabel}>Approximate Cost Range</div>
                <div className={styles.metricValue}>
                  ${estimate.minPrice.toLocaleString()} - ${estimate.maxPrice.toLocaleString()}
                </div>
              </div>

              <div className={styles.metricRow}>
                <div className={styles.metricLabel}>Estimated Delivery Timeline</div>
                <div className={styles.metricValue}>{estimate.weeks} Weeks</div>
              </div>

              <div className={styles.disclaimer}>
                *Calculations are baseline estimates for premium architectural engineering. Exact proposals will be determined during scoping sessions.
              </div>

              <button className={`btn-primary ${styles.applyBtn}`} onClick={handleApplyEstimate}>
                Apply to Contact Form <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
