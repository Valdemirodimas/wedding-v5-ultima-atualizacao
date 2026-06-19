// src/components/Countdown/Countdown.jsx
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import { weddingDate } from '../../data/weddingData';

function CountUnit({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 20px',
        background: 'rgba(201,169,110,0.04)',
        border: '1px solid rgba(201,169,110,0.15)',
        minWidth: '80px',
        flex: 1,
        maxWidth: '130px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
        fontWeight: 400,
        color: 'var(--color-gold-light)',
        lineHeight: 1,
        display: 'block',
        marginBottom: '10px',
      }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.6rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
      }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, expired } = useCountdown(weddingDate);

  if (expired) {
    return (
      <section style={{ textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.8rem', fontStyle: 'italic', color: 'var(--color-gold)' }}>
          O grande dia chegou! 💛
        </p>
      </section>
    );
  }

  return (
    <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '16px' }}
        >
          <span className="section-label">Contagem Regressiva</span>
        </motion.div>

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
            marginBottom: '12px',
          }}
        >
          Faltam apenas
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gold-divider"
          style={{ marginBottom: '52px' }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <CountUnit value={days} label="Dias" delay={0.3} />
          <CountUnit value={hours} label="Horas" delay={0.4} />
          <CountUnit value={minutes} label="Minutos" delay={0.5} />
          <CountUnit value={seconds} label="Segundos" delay={0.6} />
        </div>
      </div>
    </section>
  );
}
