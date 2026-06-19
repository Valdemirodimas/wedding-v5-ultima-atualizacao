// src/components/DressCode/DressCode.jsx
import { motion } from 'framer-motion';
import { dressCode } from '../../data/weddingData';

export default function DressCode() {
  const swatches = ['#1a1a1a', '#c9a96e', '#d4c5a9', '#e8e0d0'];
  const swatchLabels = ['Preto Elegante', 'Dourado Suave', 'Champagne', 'Nude'];

  return (
    <section style={{ padding: '100px 24px', background: 'rgba(201,169,110,0.02)' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ display: 'block', marginBottom: '16px' }}
        >
          Dress Code
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 400,
            color: 'var(--color-ivory)',
            marginBottom: '20px',
          }}
        >
          {dressCode.type}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gold-divider"
          style={{ marginBottom: '48px' }}
        />

        {/* Colour swatches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {swatches.map((color, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: color,
                border: '1px solid rgba(201,169,110,0.3)',
                margin: '0 auto 8px',
                boxShadow: i === 0 ? 'inset 0 0 0 1px rgba(255,255,255,0.1)' : 'none',
              }} />
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.58rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
              }}>
                {swatchLabels[i]}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-ivory-dim)',
            lineHeight: 1.7,
            padding: '20px 28px',
            border: '1px solid rgba(201,169,110,0.15)',
          }}
        >
          {dressCode.note}
        </motion.p>
      </div>
    </section>
  );
}
