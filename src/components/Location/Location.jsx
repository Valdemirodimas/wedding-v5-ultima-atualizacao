// src/components/Location/Location.jsx
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { ceremony } from '../../data/weddingData';

export default function Location() {
  return (
    <section style={{ padding: '100px 24px', background: 'rgba(201,169,110,0.02)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Localização
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
              marginBottom: '12px',
            }}
          >
            Onde Nos Encontrar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              fontWeight: 300,
              color: 'var(--color-ivory-dim)',
              marginBottom: '28px',
            }}
          >
            {ceremony.venue} · {ceremony.address}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider"
          />
        </div>

        {/* Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'relative',
            border: '1px solid rgba(201,169,110,0.2)',
            overflow: 'hidden',
          }}
        >
          <iframe
            title="Localização da Cerimónia"
            src={ceremony.mapsEmbed}
            width="100%"
            height="380"
            style={{ display: 'block', border: 0, filter: 'grayscale(60%) contrast(1.1) brightness(0.75)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Gold overlay tint */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10,10,15,0.15)',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '32px' }}
        >
          <a
            href={ceremony.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 36px',
              border: '1px solid rgba(201,169,110,0.35)',
              color: 'var(--color-gold-light)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.68rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,169,110,0.08)';
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)';
            }}
          >
            <MapPin size={14} />
            Ver no Google Maps
            <ExternalLink size={12} style={{ opacity: 0.6 }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
