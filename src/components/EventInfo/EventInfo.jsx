// src/components/EventInfo/EventInfo.jsx
import { motion } from 'framer-motion';
import { Church, Sparkles, MapPin, Clock } from 'lucide-react';
import { ceremony, reception } from '../../data/weddingData';

function InfoCard({ icon: Icon, label, title, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1,
        minWidth: '280px',
        maxWidth: '460px',
        padding: '44px 40px',
        border: '1px solid rgba(201,169,110,0.2)',
        background: 'rgba(201,169,110,0.02)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '60px', height: '60px',
        borderTop: '1px solid rgba(201,169,110,0.4)',
        borderLeft: '1px solid rgba(201,169,110,0.4)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '60px', height: '60px',
        borderBottom: '1px solid rgba(201,169,110,0.4)',
        borderRight: '1px solid rgba(201,169,110,0.4)',
      }} />

      <div style={{
        width: '48px', height: '48px',
        border: '1px solid rgba(201,169,110,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px',
      }}>
        <Icon size={20} color="#c9a96e" />
      </div>

      <span className="section-label" style={{ display: 'block', marginBottom: '12px' }}>
        {label}
      </span>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 400,
        color: 'var(--color-ivory)',
        marginBottom: '28px',
      }}>
        {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map(({ icon: ItemIcon, text }, j) => (
          <div key={j} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <ItemIcon size={14} color="rgba(201,169,110,0.6)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--color-ivory-dim)',
              lineHeight: 1.6,
            }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function EventInfo() {
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Detalhes do Evento
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
            Um Dia Para Recordar
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider"
          />
        </div>

        {/* Cards */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <InfoCard
            icon={Church}
            label="Cerimónia"
            title="Cerimónia Religiosa"
            delay={0.2}
            items={[
              { icon: Clock, text: `${ceremony.date} · ${ceremony.time}` },
              { icon: MapPin, text: ceremony.venue },
              { icon: MapPin, text: ceremony.address },
            ]}
          />
          <InfoCard
            icon={Sparkles}
            label="Recepção"
            title="Jantar de Gala"
            delay={0.35}
            items={[
              { icon: Clock, text: `${ceremony.date} · ${reception.time}` },
              { icon: MapPin, text: reception.venue },
              { icon: MapPin, text: reception.address },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
