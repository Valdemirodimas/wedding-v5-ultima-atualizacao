// src/pages/LandingPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from '../components/Particles/Particles';
import { useAudio } from '../context/AudioContext';
import { couple, weddingDate, heroQuote } from '../data/weddingData';

const HERO_PHOTO = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85&fit=crop';

export default function LandingPage() {
  const navigate      = useNavigate();
  const { playMusic } = useAudio();
  const [transitioning, setTransitioning] = useState(false);

  const formattedDate = weddingDate.toLocaleDateString('pt-PT', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const handleOpen = () => {
    if (transitioning) return;
    setTransitioning(true);
    playMusic();
    setTimeout(() => navigate('/convite'), 1800);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden' }}>
      {/* Hero photo */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: transitioning ? 1.15 : 1.02 }}
        transition={{ duration: transitioning ? 1.8 : 8, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${HERO_PHOTO})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Warm overlay — not pitch black, mais cinematográfico suave */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to bottom,
            rgba(60,35,25,0.35) 0%,
            rgba(40,25,18,0.45) 40%,
            rgba(20,12,8,0.65) 100%
          )
        `,
      }} />

      {/* Soft vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(20,10,5,0.55) 100%)',
      }} />

      <Particles count={28} opacity={0.55} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '32px 24px',
      }}>
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(236,219,184,0.9)',
            marginBottom: '44px',
          }}
        >
          Convite de Casamento
        </motion.div>

        {/* Thin top line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          style={{ width: '120px', height: '1px', background: 'rgba(212,169,106,0.6)', marginBottom: '44px' }}
        />

        {/* Names */}
        <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
          <motion.h1
            initial={{ y: '115%' }} animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 1.0, ease: [0.16,1,0.3,1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.2rem, 11vw, 7rem)',
              fontWeight: 400, lineHeight: 1,
              color: '#fdf8f3',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
            }}
          >
            {couple.groom.name}
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden', margin: '4px 0 8px' }}>
          <motion.span
            initial={{ y: '115%' }} animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 1.2, ease: [0.16,1,0.3,1] }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2rem, 6vw, 3.8rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(212,169,106,0.95)',
            }}
          >
            &amp;
          </motion.span>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '44px' }}>
          <motion.h1
            initial={{ y: '115%' }} animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 1.4, ease: [0.16,1,0.3,1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.2rem, 11vw, 7rem)',
              fontWeight: 400, lineHeight: 1,
              color: '#fdf8f3',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
            }}
          >
            {couple.bride.name}
          </motion.h1>
        </div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: '0.68rem',
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(236,219,184,0.9)', marginBottom: '16px',
          }}
        >
          {formattedDate}
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.9 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: 300, fontStyle: 'italic',
            color: 'rgba(245,237,224,0.8)', lineHeight: 1.7,
            maxWidth: '440px', margin: '0 auto 56px',
          }}
        >
          "{heroQuote}"
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          <motion.button
            onClick={handleOpen}
            disabled={transitioning}
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(212,169,106,0.18)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'rgba(253,248,243,0.1)',
              border: '1.5px solid rgba(212,169,106,0.6)',
              color: 'rgba(236,219,184,0.95)',
              fontFamily: 'var(--font-ui)', fontSize: '0.68rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              padding: '18px 52px', cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
          >
            {transitioning ? 'A abrir...' : 'Abrir Convite'}
          </motion.button>
        </motion.div>

        {/* Corner ornaments */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.3 + i * 0.1 }}
            style={{
              position: 'absolute',
              [v]: '28px', [h]: '28px',
              width: '36px', height: '36px',
              borderTop: v === 'top' ? '1px solid rgba(212,169,106,0.45)' : 'none',
              borderBottom: v === 'bottom' ? '1px solid rgba(212,169,106,0.45)' : 'none',
              borderLeft: h === 'left' ? '1px solid rgba(212,169,106,0.45)' : 'none',
              borderRight: h === 'right' ? '1px solid rgba(212,169,106,0.45)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Cinematic transition */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, background: '#fdf8f3', zIndex: 50 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
