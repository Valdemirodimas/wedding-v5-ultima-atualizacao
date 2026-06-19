// src/components/RSVP/RSVP.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(201,169,110,0.2)',
  borderRadius: 0,
  padding: '14px 18px',
  color: 'var(--color-ivory)',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.3s',
};

export default function RSVP() {
  const [form, setForm] = useState({ name: '', guests: '1', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focus, setFocus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="rsvp" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            RSVP
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
              marginBottom: '16px',
            }}
          >
            Confirmar Presença
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--color-ivory-dim)',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}
          >
            A vossa presença tornará este dia ainda mais especial. Confirme até 15 de Outubro.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider"
          />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: 'center',
                padding: '60px 40px',
                border: '1px solid rgba(201,169,110,0.25)',
                background: 'rgba(201,169,110,0.04)',
              }}
            >
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '50%',
                border: '1px solid rgba(201,169,110,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 24px rgba(201,169,110,0.2)',
              }}>
                <Check size={24} color="#c9a96e" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 400,
                color: 'var(--color-ivory)',
                marginBottom: '12px',
              }}>
                Presença Confirmada!
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-ivory-dim)',
              }}>
                Mal podemos esperar para celebrar este momento consigo, {form.name.split(' ')[0]}. ✨
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {[
                { key: 'name', label: 'Nome Completo', type: 'text', placeholder: 'O seu nome' },
                { key: 'phone', label: 'Telemóvel', type: 'tel', placeholder: '+258 8X XXX XXXX' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: focus === key ? 'var(--color-gold)' : 'var(--color-muted)',
                    marginBottom: '8px',
                    transition: 'color 0.3s',
                  }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    onFocus={() => setFocus(key)}
                    onBlur={() => setFocus('')}
                    style={{
                      ...inputStyle,
                      borderColor: focus === key ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.2)',
                    }}
                  />
                </div>
              ))}

              {/* Guests */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: focus === 'guests' ? 'var(--color-gold)' : 'var(--color-muted)',
                  marginBottom: '8px',
                  transition: 'color 0.3s',
                }}>
                  Número de Acompanhantes
                </label>
                <select
                  value={form.guests}
                  onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                  onFocus={() => setFocus('guests')}
                  onBlur={() => setFocus('')}
                  style={{
                    ...inputStyle,
                    borderColor: focus === 'guests' ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.2)',
                    cursor: 'pointer',
                  }}
                >
                  {[0,1,2,3,4,5].map(n => (
                    <option key={n} value={n} style={{ background: '#111118' }}>
                      {n === 0 ? 'Apenas eu' : `${n} acompanhante${n > 1 ? 's' : ''}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: focus === 'message' ? 'var(--color-gold)' : 'var(--color-muted)',
                  marginBottom: '8px',
                  transition: 'color 0.3s',
                }}>
                  Mensagem (opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Deixe uma mensagem aos noivos..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocus('message')}
                  onBlur={() => setFocus('')}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    borderColor: focus === 'message' ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.2)',
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: '8px',
                  padding: '18px',
                  background: 'linear-gradient(135deg, rgba(138,109,59,0.3), rgba(201,169,110,0.2))',
                  border: '1px solid rgba(201,169,110,0.45)',
                  color: 'var(--color-gold-light)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                Confirmar Presença
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
