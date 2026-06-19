// src/pages/InvitationPage.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { couple, ceremony, inviteMessage } from '../data/weddingData';
import Particles from '../components/Particles/Particles';
import Countdown from '../components/Countdown/Countdown';
import EventInfo from '../components/EventInfo/EventInfo';
import Timeline from '../components/Timeline/Timeline';
import Gallery from '../components/Gallery/Gallery';
import Location from '../components/Location/Location';
import Program from '../components/Program/Program';
import DressCode from '../components/DressCode/DressCode';
import RSVP from '../components/RSVP/RSVP';
import Footer from '../components/Footer/Footer';

// Section divider
function Divider() {
  return (
    <div style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.12) 30%, rgba(201,169,110,0.12) 70%, transparent)',
    }} />
  );
}

export default function InvitationPage() {
  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{ minHeight: '100vh', background: 'var(--color-obsidian)' }}
    >
      {/* ─── Invite Hero ─── */}
      <section style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        overflow: 'hidden',
      }}>
        {/* Atmospheric gradients */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,169,110,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,169,110,0.04) 0%, transparent 60%)
          `,
        }} />
        <Particles count={40} opacity={0.4} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="section-label"
            style={{ marginBottom: '40px' }}
          >
            {ceremony.date}
          </motion.div>

          {/* Ornamental frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              padding: '52px 48px',
              border: '1px solid rgba(201,169,110,0.2)',
              position: 'relative',
              marginBottom: '48px',
            }}
          >
            {/* Corner ornaments */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => {
              const isTop = pos.includes('top');
              const isLeft = pos.includes('left');
              return (
                <div key={pos} style={{
                  position: 'absolute',
                  [isTop ? 'top' : 'bottom']: '-8px',
                  [isLeft ? 'left' : 'right']: '-8px',
                  width: '16px', height: '16px',
                  borderTop: isTop ? '1px solid var(--color-gold)' : 'none',
                  borderBottom: !isTop ? '1px solid var(--color-gold)' : 'none',
                  borderLeft: isLeft ? '1px solid var(--color-gold)' : 'none',
                  borderRight: !isLeft ? '1px solid var(--color-gold)' : 'none',
                }} />
              );
            })}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '32px',
              }}
            >
              Com imensa alegria
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 7vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                color: 'var(--color-ivory)',
                marginBottom: '16px',
              }}
            >
              {couple.groom.name}
            </motion.h1>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #8a6d3b, #c9a96e, #e8d5a3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px',
              }}
            >
              &amp;
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 7vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                color: 'var(--color-ivory)',
                marginBottom: '0',
              }}
            >
              {couple.bride.name}
            </motion.h1>
          </motion.div>

          {/* Invite message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-ivory-dim)',
              lineHeight: 1.8,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            {inviteMessage}
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            style={{
              marginTop: '64px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              Deslize para explorar
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Countdown ─── */}
      <Divider />
      <Countdown />

      {/* ─── Event Info ─── */}
      <Divider />
      <EventInfo />

      {/* ─── Timeline ─── */}
      <Divider />
      <Timeline />

      {/* ─── Gallery ─── */}
      <Divider />
      <Gallery />

      {/* ─── Location ─── */}
      <Divider />
      <Location />

      {/* ─── Program ─── */}
      <Divider />
      <Program />

      {/* ─── Dress Code ─── */}
      <Divider />
      <DressCode />

      {/* ─── RSVP ─── */}
      <Divider />
      <RSVP />

      {/* ─── Footer ─── */}
      <Footer />
    </motion.div>
  );
}
