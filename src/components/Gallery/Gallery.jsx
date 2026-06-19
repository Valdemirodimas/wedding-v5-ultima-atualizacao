// src/components/Gallery/Gallery.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

// Placeholder photo grid using gradient tiles
const photos = [
  { id: 1, span: 'col-span-2 row-span-2', label: 'Noivado — Praia Costa do Sol' },
  { id: 2, span: '', label: 'Sessão Fotográfica' },
  { id: 3, span: '', label: 'Momentos Juntos' },
  { id: 4, span: '', label: 'Jardim Botânico' },
  { id: 5, span: '', label: 'Ao Pôr do Sol' },
  { id: 6, span: 'col-span-2', label: 'O Pedido' },
];

// Beautiful gradient placeholders
const gradients = [
  'linear-gradient(135deg, #1a1208 0%, #2d1f08 40%, #1a1208 100%)',
  'linear-gradient(135deg, #0d1117 0%, #1a2030 100%)',
  'linear-gradient(135deg, #120d08 0%, #251a10 100%)',
  'linear-gradient(135deg, #0a0d12 0%, #162030 100%)',
  'linear-gradient(135deg, #14100a 0%, #2a1f10 100%)',
  'linear-gradient(135deg, #0d1008 0%, #1a2010 100%)',
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

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
            Galeria
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
            A Nossa Jornada em Imagens
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider"
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 180px)',
          gap: '12px',
        }}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onClick={() => setSelected(photo)}
              style={{
                gridColumn: photo.id === 1 ? 'span 2' : 'span 1',
                gridRow: photo.id === 1 ? 'span 2' : photo.id === 6 ? 'span 1' : 'span 1',
                background: gradients[i],
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                border: '1px solid rgba(201,169,110,0.1)',
              }}
            >
              {/* Shimmer overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 30% 30%, rgba(201,169,110,0.08), transparent 60%)',
              }} />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <ZoomIn size={22} color="#c9a96e" />
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-light)',
                }}>
                  Ver
                </span>
              </motion.div>

              {/* Label */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '10px 14px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,169,110,0.7)',
                }}>
                  {photo.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.92)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '700px',
                  aspectRatio: '4/3',
                  border: '1px solid rgba(201,169,110,0.3)',
                  overflow: 'hidden',
                  background: gradients[photos.findIndex(p => p.id === selected.id)],
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(201,169,110,0.1), transparent 60%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px 24px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: 'var(--color-ivory-dim)',
                  }}>
                    {selected.label}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '50%',
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} color="#c9a96e" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
