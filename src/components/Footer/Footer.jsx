// src/components/Footer/Footer.jsx
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { couple, weddingDate } from '../../data/weddingData';

export default function Footer() {
  const year = weddingDate.getFullYear();

  return (
    <footer style={{
      padding: '80px 24px 48px',
      textAlign: 'center',
      borderTop: '1px solid rgba(201,169,110,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative' }}
      >
        <div className="gold-divider" style={{ marginBottom: '48px' }} />

        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 400,
          color: 'var(--color-ivory)',
          marginBottom: '12px',
        }}>
          {couple.groom.name} <span style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #8a6d3b, #c9a96e, #e8d5a3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>&</span> {couple.bride.name}
        </p>

        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '40px',
        }}>
          {weddingDate.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--color-ivory-dim)',
          maxWidth: '460px',
          margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          "Mal podemos esperar para celebrar este momento consigo."
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-muted)' }}>
            Feito com
          </span>
          <Heart size={11} color="#c9a96e" fill="#c9a96e" />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-muted)' }}>
            {year}
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
