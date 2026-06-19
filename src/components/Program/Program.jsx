// src/components/Program/Program.jsx
import { motion } from 'framer-motion';
import { Users, Heart, Camera, UtensilsCrossed, Music } from 'lucide-react';
import { eventProgram } from '../../data/weddingData';

const iconMap = {
  users: Users,
  heart: Heart,
  camera: Camera,
  utensils: UtensilsCrossed,
  music: Music,
};

export default function Program() {
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Programa
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
            Como Será o Nosso Dia
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider"
          />
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: 0, bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.25) 10%, rgba(201,169,110,0.25) 90%, transparent)',
          }} />

          {eventProgram.map((item, i) => {
            const Icon = iconMap[item.icon] || Heart;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '28px',
                  marginBottom: '36px',
                  paddingLeft: '0',
                  position: 'relative',
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.3)',
                  background: 'var(--color-obsidian)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  <Icon size={16} color="#c9a96e" />
                </div>

                <div style={{ paddingTop: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    display: 'block',
                    marginBottom: '4px',
                  }}>
                    {item.time}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    color: 'var(--color-ivory)',
                  }}>
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
