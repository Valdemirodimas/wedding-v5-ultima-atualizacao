// src/components/MusicPlayer/MusicPlayer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export default function MusicPlayer() {
  const { isPlaying, hasStarted, toggleMusic } = useAudio();
  if (!hasStarted) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Pausar música' : 'Reproduzir música'}
      title="Imagine — John Lennon"
      style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 1000,
        width: '52px', height: '52px', borderRadius: '50%',
        border: '1.5px solid rgba(196,133,106,0.5)',
        background: 'rgba(253,248,243,0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(196,133,106,0.25)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {isPlaying && (
          <motion.span
            key="ring"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1.5px solid rgba(196,133,106,0.5)',
            }}
          />
        )}
      </AnimatePresence>
      {isPlaying
        ? <Volume2 size={18} color="#c4856a" />
        : <VolumeX  size={18} color="#a08070" />
      }
    </motion.button>
  );
}
