// src/components/Timeline/Timeline.jsx
import { motion } from 'framer-motion';
import { coupleStory } from '../../data/weddingData';

export default function Timeline() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0, bottom: 0,
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 20%, rgba(201,169,110,0.2) 80%, transparent)',
        transform: 'translateX(-50%)',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            A Nossa História
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 400,
              color: 'var(--color-ivory)',
              marginBottom: '20px',
            }}
          >
            Dois Destinos, Uma Jornada
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider"
          />
        </div>

        {/* Timeline items */}
        {coupleStory.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                marginBottom: '60px',
                position: 'relative',
              }}
            >
              {/* Center dot */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '28px',
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                boxShadow: '0 0 16px rgba(201,169,110,0.5)',
                zIndex: 2,
              }} />

              {/* Card */}
              <div style={{
                width: '44%',
                padding: '28px 32px',
                background: 'rgba(201,169,110,0.03)',
                border: '1px solid rgba(201,169,110,0.15)',
                position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 400,
                  color: 'rgba(201,169,110,0.2)',
                  position: 'absolute',
                  top: '12px',
                  right: '20px',
                  lineHeight: 1,
                }}>
                  {item.year}
                </span>
                <span className="section-label" style={{ display: 'block', marginBottom: '10px' }}>
                  {item.year}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: 'var(--color-ivory)',
                  marginBottom: '12px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  fontWeight: 300,
                  color: 'var(--color-ivory-dim)',
                  lineHeight: 1.75,
                }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
