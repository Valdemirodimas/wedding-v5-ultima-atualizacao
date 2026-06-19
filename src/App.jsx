import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioProvider, useAudio } from './context/AudioContext';
import { useCountdown } from './hooks/useCountdown';
import {
  couple, couplePhotos, weddingDate, weddingDateStr, rsvpDeadline,
  events, timeline, galleryPhotos, payments, stores, bibleVerse,
} from './data/weddingData';
import './styles/globals.css';

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
const up = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

/* Thin gold rule with diamond */
function Rule({ wide = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      margin: '0 auto',
      width: wide ? '100%' : 'fit-content',
      maxWidth: wide ? 280 : 120,
    }}>
      <div style={{ flex: 1, height: '0.5px', background: 'var(--beige2)' }} />
      <div style={{
        width: 5, height: 5,
        background: 'var(--gold)', transform: 'rotate(45deg)',
        flexShrink: 0,
      }} />
      <div style={{ flex: 1, height: '0.5px', background: 'var(--beige2)' }} />
    </div>
  );
}

/* Section header */
function Header({ tag, title, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 'clamp(40px,6vw,64px)' }}>
      {tag && (
        <motion.p {...up(0)} className="lbl" style={{ marginBottom: 16 }}>{tag}</motion.p>
      )}
      <motion.h2 {...up(0.1)} style={{
        fontFamily: 'var(--font-d)',
        fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
        fontWeight: 400, color: 'var(--text)', lineHeight: 1.15,
        marginBottom: sub ? 16 : 24,
        letterSpacing: '-0.01em',
      }}>{title}</motion.h2>
      {sub && (
        <motion.p {...up(0.15)} style={{
          fontFamily: 'var(--font-b)', fontSize: 'clamp(1rem,1.8vw,1.15rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: 'var(--text2)', lineHeight: 1.8,
          maxWidth: 480, margin: center ? '0 auto 24px' : '0 0 24px',
        }}>{sub}</motion.p>
      )}
      <motion.div {...up(0.2)}>
        <Rule />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PETALS
══════════════════════════════════════════════ */
function Petals({ count = 10 }) {
  const items = useRef(Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    size: 5 + Math.random() * 8,
    delay: Math.random() * 12,
    dur:   14 + Math.random() * 10,
    opacity: 0.3 + Math.random() * 0.4,
  }))).current;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {items.map(p => (
        <div key={p.id} style={{
          position:'absolute', left:`${p.left}%`, top:-16,
          width: p.size, height: p.size,
          borderRadius: '50% 0',
          background: 'var(--gold-light)',
          opacity: p.opacity,
          animation: `petal-fall ${p.dur}s ${p.delay}s infinite linear`,
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MUSIC BUTTON
══════════════════════════════════════════════ */
function MusicBtn() {
  const { isPlaying, hasStarted, toggle } = useAudio();
  if (!hasStarted) return null;
  return (
    <motion.button
      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5 }}
      onClick={toggle}
      style={{
        position:'fixed', bottom:28, right:28, zIndex:999,
        width:48, height:48, borderRadius:'50%',
        border:'1px solid var(--beige2)',
        background:'rgba(250,248,245,0.95)',
        backdropFilter:'blur(12px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', fontSize:'1rem',
        boxShadow:'0 2px 20px rgba(74,53,37,0.12)',
      }}
    >
      {isPlaying ? '♪' : '♩'}
      {isPlaying && (
        <motion.span
          animate={{ scale:[1,2.2], opacity:[0.35,0] }}
          transition={{ duration:1.8, repeat:Infinity, ease:'easeOut' }}
          style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid var(--gold2)' }}
        />
      )}
    </motion.button>
  );
}

/* ══════════════════════════════════════════════
   COVER — envelope reveal
══════════════════════════════════════════════ */
function Cover({ onOpen }) {
  const [going, setGoing] = useState(false);
  const { play } = useAudio();

  const handle = () => {
    if (going) return;
    setGoing(true);
    play();
    setTimeout(onOpen, 1800);
  };

  return (
    <motion.div
      key="cover"
      exit={{ opacity:0, scale:1.04 }}
      transition={{ duration:1.6, ease:[0.4,0,0.2,1] }}
      style={{
        position:'fixed', inset:0, zIndex:100,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'flex-end',
        textAlign:'center', overflow:'hidden',
        background:'var(--cream)',
      }}
    >
      {/* Full-bleed photo — oval top & bottom, straight sides */}
      <motion.div
        initial={{ opacity:0, scale:1.08 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:1.8, ease:[0.16,1,0.3,1] }}
        style={{
          position:'absolute', inset:0, zIndex:0,
          overflow:'hidden',
          /* oval mask: rounds the top AND bottom edges, sides stay straight */
          borderRadius:'0 0 0 0',
        }}
      >
        <div style={{
          position:'absolute', inset:0,
          clipPath: 'ellipse(75% 100% at 50% 50%)',
          overflow:'hidden',
        }}>
          <img
            src={couplePhotos.capa}
            alt="Casal"
            style={{
              width:'100%', height:'100%', objectFit:'cover',
              objectPosition:'center 28%',
            }}
          />
        </div>
        {/* Gradient overlays for text legibility */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(20,12,6,0.05) 0%, rgba(20,12,6,0.10) 38%, rgba(20,12,6,0.55) 78%, rgba(20,12,6,0.78) 100%)',
        }} />
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'30%',
          background:'linear-gradient(to bottom, rgba(20,12,6,0.28) 0%, transparent 100%)',
        }} />
      </motion.div>

      <Petals count={14} />

      {/* Content overlay — bottom aligned */}
      <div style={{
        position:'relative', zIndex:2,
        padding:'0 clamp(20px,6vw,40px) clamp(48px,8vh,80px)',
        width:'100%', maxWidth:560,
      }}>
        <motion.p
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.6 }}
          className="lbl" style={{ color:'rgba(245,235,216,0.85)', marginBottom:18 }}
        >Convite de Casamento</motion.p>

        <div style={{ marginBottom:2, overflow:'hidden' }}>
          <motion.p
            initial={{ y:'115%' }} animate={{ y:0 }}
            transition={{ duration:1, delay:0.85, ease:[0.16,1,0.3,1] }}
            style={{
              fontFamily:'var(--font-d)',
              fontSize:'clamp(2.4rem,9vw,3.6rem)',
              fontWeight:400, color:'#fffaf2', lineHeight:1.02,
              textShadow:'0 2px 24px rgba(0,0,0,0.3)',
            }}
          >{couple.bride}</motion.p>
        </div>

        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:1.15 }}
          style={{
            fontFamily:'var(--font-b)', fontSize:'clamp(1.1rem,3.4vw,1.5rem)',
            fontStyle:'italic', color:'var(--gold-light)', margin:'2px 0',
          }}
        >&amp;</motion.p>

        <div style={{ marginBottom:26, overflow:'hidden' }}>
          <motion.p
            initial={{ y:'115%' }} animate={{ y:0 }}
            transition={{ duration:1, delay:1.05, ease:[0.16,1,0.3,1] }}
            style={{
              fontFamily:'var(--font-d)',
              fontSize:'clamp(2.4rem,9vw,3.6rem)',
              fontWeight:400, color:'#fffaf2', lineHeight:1.02,
              textShadow:'0 2px 24px rgba(0,0,0,0.3)',
            }}
          >{couple.groom}</motion.p>
        </div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.7, delay:1.4 }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:32 }}
        >
          <div style={{ height:'0.5px', width:36, background:'rgba(245,235,216,0.4)' }} />
          <p style={{
            fontFamily:'var(--font-u)', fontSize:'0.62rem',
            letterSpacing:'0.36em', color:'rgba(245,235,216,0.85)',
            textTransform:'uppercase',
          }}>{weddingDateStr}</p>
          <div style={{ height:'0.5px', width:36, background:'rgba(245,235,216,0.4)' }} />
        </motion.div>

        <motion.button
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:1.7 }}
          onClick={handle}
          disabled={going}
          whileHover={{ backgroundColor:'#fffaf2', color:'var(--brown)', borderColor:'#fffaf2' }}
          whileTap={{ scale:0.97 }}
          style={{
            padding:'14px 48px',
            background:'rgba(255,250,242,0.06)',
            backdropFilter:'blur(6px)',
            border:'1px solid rgba(245,235,216,0.75)',
            color:'#fffaf2',
            fontFamily:'var(--font-u)', fontSize:'0.6rem',
            letterSpacing:'0.4em', textTransform:'uppercase',
            cursor: going ? 'wait' : 'pointer',
            transition:'background 0.35s, color 0.35s, border-color 0.35s',
          }}
        >{going ? 'A abrir…' : 'Abrir Convite'}</motion.button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
const NAV_LINKS = [['#inicio','Início'],['#casal','Os Noivos'],['#evento','Agenda'],['#historia','História'],['#galeria','Galeria'],['#rsvp','RSVP']];

function Nav({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y:-56, opacity:0 }} animate={{ y:0, opacity:1 }}
          exit={{ y:-56, opacity:0 }} transition={{ duration:0.3 }}
          style={{
            position:'fixed', top:0, left:0, right:0, zIndex:500,
            background:'rgba(250,248,245,0.96)',
            backdropFilter:'blur(16px)',
            borderBottom:'1px solid var(--beige)',
            display:'flex', justifyContent:'center',
            gap:'clamp(12px,3vw,36px)',
            padding:'14px 20px', flexWrap:'wrap',
          }}
        >
          {NAV_LINKS.map(([href,lbl]) => (
            <a key={href} href={href} style={{
              fontFamily:'var(--font-u)', fontSize:'0.55rem',
              letterSpacing:'0.22em', textTransform:'uppercase',
              color:'var(--text2)', textDecoration:'none', transition:'color 0.2s',
            }}
            onMouseOver={e=>e.currentTarget.style.color='var(--gold)'}
            onMouseOut={e=>e.currentTarget.style.color='var(--text2)'}
            >{lbl}</a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" style={{
      minHeight:'100dvh', position:'relative',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      textAlign:'center', padding:'clamp(80px,12vw,120px) 24px',
      overflow:'hidden',
    }}>
      {/* BG image */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:`url(${couplePhotos.hero})`,
        backgroundSize:'cover', backgroundPosition:'center 35%',
      }} />
      {/* Overlay — softer grain effect */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        background:'linear-gradient(to bottom, rgba(20,12,6,0.38) 0%, rgba(20,12,6,0.55) 100%)',
      }} />
      <Petals count={8} />

      <div style={{ position:'relative', zIndex:2 }}>
        <motion.p {...up(0.2)} className="lbl"
          style={{ color:'rgba(232,212,168,0.85)', marginBottom:32 }}
        >O Casamento de</motion.p>

        <motion.h1 {...up(0.35)} style={{
          fontFamily:'var(--font-d)',
          fontSize:'clamp(2.8rem,12vw,8rem)',
          fontWeight:400, color:'#faf8f5', lineHeight:0.95,
          marginBottom:4, letterSpacing:'-0.01em',
          textShadow:'0 2px 32px rgba(0,0,0,0.25)',
        }}>{couple.bride}</motion.h1>

        <motion.p {...up(0.48)} style={{
          fontFamily:'var(--font-b)',
          fontSize:'clamp(1.6rem,5vw,3.5rem)',
          fontStyle:'italic', color:'var(--gold-light)',
          lineHeight:1.3, marginBottom:4,
        }}>&amp;</motion.p>

        <motion.h1 {...up(0.58)} style={{
          fontFamily:'var(--font-d)',
          fontSize:'clamp(2.8rem,12vw,8rem)',
          fontWeight:400, color:'#faf8f5', lineHeight:0.95,
          marginBottom:40, letterSpacing:'-0.01em',
          textShadow:'0 2px 32px rgba(0,0,0,0.25)',
        }}>{couple.groom}</motion.h1>

        <motion.div {...up(0.7)} style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:48,
        }}>
          <div style={{ height:'0.5px', width:40, background:'rgba(232,212,168,0.4)' }} />
          <p style={{
            fontFamily:'var(--font-u)', fontSize:'0.62rem',
            letterSpacing:'0.42em', textTransform:'uppercase',
            color:'rgba(232,212,168,0.85)',
          }}>{weddingDateStr}</p>
          <div style={{ height:'0.5px', width:40, background:'rgba(232,212,168,0.4)' }} />
        </motion.div>

        <motion.div
          animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut' }}
          style={{ color:'rgba(232,212,168,0.5)', fontSize:'1.1rem', letterSpacing:'0.1em' }}
        >↓</motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════════ */
function Countdown() {
  const { days, hours, minutes, seconds, expired } = useCountdown(weddingDate);
  const units = [['Dias',days],['Horas',hours],['Min',minutes],['Seg',seconds]];

  return (
    <section style={{
      padding:'clamp(60px,8vw,96px) clamp(20px,5vw,40px)',
      background:'var(--brown)',
      textAlign:'center',
    }}>
      <motion.p {...up()} className="lbl"
        style={{ color:'rgba(232,212,168,0.6)', marginBottom:8 }}
      >Contagem Regressiva</motion.p>
      <motion.p {...up(0.1)} style={{
        fontFamily:'var(--font-b)', fontSize:'clamp(1rem,2vw,1.2rem)',
        fontStyle:'italic', color:'rgba(250,248,245,0.5)',
        marginBottom:'clamp(32px,5vw,48px)',
      }}>para o dia mais especial das nossas vidas</motion.p>

      {expired ? (
        <p style={{ fontFamily:'var(--font-d)', fontSize:'2rem', color:'var(--gold-light)' }}>
          Hoje é o Grande Dia! 🎊
        </p>
      ) : (
        <div style={{
          display:'flex', justifyContent:'center',
          gap:'clamp(2px,2vw,2px)', flexWrap:'wrap',
          maxWidth:560, margin:'0 auto clamp(28px,4vw,40px)',
        }}>
          {units.map(([lbl,val],i) => (
            <motion.div key={lbl} {...up(i*0.07)} style={{
              flex:'1', minWidth:'clamp(64px,18vw,90px)',
              padding:'clamp(18px,3vw,28px) clamp(8px,2vw,20px)',
              textAlign:'center',
              borderRight: i < 3 ? '1px solid rgba(250,248,245,0.06)' : 'none',
            }}>
              <div style={{
                fontFamily:'var(--font-d)',
                fontSize:'clamp(2.2rem,8vw,3.8rem)',
                fontWeight:400, lineHeight:1, color:'#faf8f5',
                letterSpacing:'-0.02em',
              }}>{String(val).padStart(2,'0')}</div>
              <div style={{
                fontFamily:'var(--font-u)', fontSize:'0.48rem',
                letterSpacing:'0.3em', textTransform:'uppercase',
                color:'rgba(250,248,245,0.35)', marginTop:10,
              }}>{lbl}</div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.p {...up(0.4)} style={{
        fontFamily:'var(--font-u)', fontSize:'0.62rem',
        letterSpacing:'0.36em', textTransform:'uppercase',
        color:'rgba(232,212,168,0.5)',
      }}>15 de Novembro de 2026 · Maputo</motion.p>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CASAL — inspirado na imagem 1
══════════════════════════════════════════════ */
function CoupleSection() {
  return (
    <section id="casal" style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream)',
    }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>
        <Header tag="Os Noivos" title="Unidos Para Sempre" />

        {/* Main couple photo — round as in inspiration */}
        <motion.div {...up(0.1)} style={{ display:'flex', justifyContent:'center', marginBottom:'clamp(48px,6vw,72px)' }}>
          <div style={{
            width:'clamp(260px,65vw,420px)',
            height:'clamp(260px,65vw,420px)',
            borderRadius:'50%',
            overflow:'hidden',
            border:'6px solid var(--cream2)',
            outline:'1px solid var(--beige)',
            outlineOffset:'8px',
            boxShadow:'0 20px 60px rgba(74,53,37,0.13)',
            position:'relative',
          }}>
            <img
              src={couplePhotos.noivos}
              alt={`${couple.bride} & ${couple.groom}`}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }}
            />
          </div>
        </motion.div>

        {/* Names layout — inspired by image 1 — script names + heart + parents */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr auto 1fr',
          gap:'clamp(16px,3vw,32px)',
          alignItems:'start',
          maxWidth:740, margin:'0 auto',
        }}>
          {/* Bride */}
          <motion.div {...up(0.15)} style={{ textAlign:'center' }}>
            <p style={{
              fontFamily:'var(--font-d)',
              fontSize:'clamp(1.6rem,4.5vw,2.4rem)',
              fontWeight:400, fontStyle:'italic',
              color:'var(--text2)', lineHeight:1.1, marginBottom:20,
              letterSpacing:'0.01em',
            }}>{couple.brideFull}</p>
            <p style={{
              fontFamily:'var(--font-u)', fontSize:'0.6rem',
              letterSpacing:'0.12em', color:'var(--text3)',
              textTransform:'uppercase', marginBottom:8,
            }}>Filha de</p>
            {couple.brideParents.split('&').map((p, i) => (
              <p key={i} style={{
                fontFamily:'var(--font-b)', fontSize:'clamp(0.9rem,1.8vw,1.05rem)',
                fontWeight:300, color:'var(--text2)', lineHeight:1.7,
              }}>{p.trim()}{i === 0 ? '' : ''}</p>
            ))}
            {couple.brideParents.split('&').length === 1 && (
              <p style={{ fontFamily:'var(--font-b)', fontSize:'clamp(0.9rem,1.8vw,1.05rem)', fontWeight:300, color:'var(--text2)' }}>
                {couple.brideParents}
              </p>
            )}
          </motion.div>

          {/* Heart center */}
          <motion.div
            {...up(0.2)}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', paddingTop:8 }}
          >
            <div style={{
              fontSize:'clamp(1.4rem,3vw,1.8rem)',
              color:'var(--beige2)',
              lineHeight:1,
            }}>♡</div>
          </motion.div>

          {/* Groom */}
          <motion.div {...up(0.15)} style={{ textAlign:'center' }}>
            <p style={{
              fontFamily:'var(--font-d)',
              fontSize:'clamp(1.6rem,4.5vw,2.4rem)',
              fontWeight:400, fontStyle:'italic',
              color:'var(--text2)', lineHeight:1.1, marginBottom:20,
              letterSpacing:'0.01em',
            }}>{couple.groomFull}</p>
            <p style={{
              fontFamily:'var(--font-u)', fontSize:'0.6rem',
              letterSpacing:'0.12em', color:'var(--text3)',
              textTransform:'uppercase', marginBottom:8,
            }}>Filho de</p>
            {couple.groomParents.split('&').map((p, i) => (
              <p key={i} style={{
                fontFamily:'var(--font-b)', fontSize:'clamp(0.9rem,1.8vw,1.05rem)',
                fontWeight:300, color:'var(--text2)', lineHeight:1.7,
              }}>{p.trim()}</p>
            ))}
          </motion.div>
        </div>

        {/* Mobile: stack vertically */}
        <style>{`
          @media (max-width: 560px) {
            .couple-grid {
              grid-template-columns: 1fr !important;
              grid-template-rows: auto auto auto !important;
            }
            .couple-heart { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   INVITE MESSAGE
══════════════════════════════════════════════ */
function Invitation() {
  return (
    <section style={{
      padding:'clamp(64px,9vw,108px) clamp(20px,5vw,40px)',
      background:'var(--cream2)',
      textAlign:'center',
    }}>
      <div style={{ maxWidth:560, margin:'0 auto' }}>
        <motion.div {...up()} style={{ marginBottom:28 }}>
          <Rule wide />
        </motion.div>

        <motion.p {...up(0.1)} style={{
          fontFamily:'var(--font-b)',
          fontSize:'clamp(1.1rem,2.2vw,1.3rem)',
          fontWeight:300, fontStyle:'italic',
          color:'var(--text)', lineHeight:2.0, marginBottom:32,
        }}>
          Com imenso amor e alegria no coração,<br />
          temos a honra de convidar a sua presença<br />
          para celebrar a união de<br />
          <span style={{ fontFamily:'var(--font-d)', fontSize:'clamp(1.2rem,2.5vw,1.4rem)', color:'var(--brown)', fontStyle:'normal' }}>
            {couple.brideFull} &amp; {couple.groomFull}
          </span>
        </motion.p>

        <motion.div {...up(0.2)} style={{
          borderTop:'0.5px solid var(--beige2)', paddingTop:28,
        }}>
          <p style={{
            fontFamily:'var(--font-b)', fontSize:'clamp(0.95rem,1.8vw,1.1rem)',
            fontStyle:'italic', color:'var(--text3)', lineHeight:1.85,
          }}>
            {bibleVerse.text}
          </p>
          <p style={{
            fontFamily:'var(--font-u)', fontSize:'0.54rem',
            letterSpacing:'0.28em', color:'var(--gold)',
            textTransform:'uppercase', marginTop:12,
          }}>{bibleVerse.ref}</p>
        </motion.div>

        <motion.div {...up(0.25)} style={{ marginTop:28 }}>
          <Rule wide />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   AGENDA — 3 columns, clean minimal
══════════════════════════════════════════════ */
function Agenda() {
  const icons = ['✦','✧','✦'];
  return (
    <section id="evento" style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream)',
    }}>
      <div style={{ maxWidth:1060, margin:'0 auto' }}>
        <Header tag="Agenda" title={`Domingo, 15 de Novembro de 2026`}
          sub="Junte-se a nós neste dia inesquecível" />

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(260px,100%), 1fr))',
          gap:'1px',
          background:'var(--beige)',
          border:'1px solid var(--beige)',
        }}>
          {events.map((ev, i) => (
            <motion.div
              key={i} {...up(i * 0.1)}
              style={{
                padding:'clamp(32px,4vw,52px) clamp(20px,3vw,36px)',
                background:'var(--cream)',
                textAlign:'center',
                position:'relative',
                overflow:'hidden',
              }}
            >
              {/* Subtle top accent line */}
              <div style={{
                position:'absolute', top:0, left:'20%', right:'20%',
                height:'2px', background:'var(--beige2)',
              }} />

              <p style={{
                fontFamily:'var(--font-u)', fontSize:'0.5rem',
                letterSpacing:'0.32em', color:'var(--gold)',
                textTransform:'uppercase', marginBottom:20,
              }}>{icons[i]}</p>

              <h3 style={{
                fontFamily:'var(--font-d)', fontSize:'clamp(1.1rem,2.2vw,1.3rem)',
                fontWeight:400, color:'var(--text)', marginBottom:16,
                lineHeight:1.2,
              }}>{ev.title}</h3>

              <p style={{
                fontFamily:'var(--font-d)',
                fontSize:'clamp(2.4rem,5.5vw,3.2rem)',
                fontWeight:400, color:'var(--brown)',
                lineHeight:1, marginBottom:20, letterSpacing:'-0.01em',
              }}>{ev.time}</p>

              <Rule />

              <div style={{ marginTop:20, marginBottom:24 }}>
                <p style={{
                  fontFamily:'var(--font-b)', fontSize:'clamp(0.95rem,1.8vw,1.05rem)',
                  fontWeight:400, color:'var(--text)', marginBottom:6, lineHeight:1.4,
                }}>{ev.venue}</p>
                <p style={{
                  fontFamily:'var(--font-b)', fontSize:'0.9rem',
                  fontWeight:300, color:'var(--text3)', lineHeight:1.5,
                }}>{ev.address}</p>
              </div>

              <a
                href={ev.mapsUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  fontFamily:'var(--font-u)', fontSize:'0.54rem',
                  letterSpacing:'0.24em', textTransform:'uppercase',
                  color:'var(--text2)', textDecoration:'none',
                  borderBottom:'0.5px solid var(--beige2)',
                  paddingBottom:2, transition:'color 0.2s, border-color 0.2s',
                }}
                onMouseOver={e=>{ e.currentTarget.style.color='var(--gold)'; e.currentTarget.style.borderColor='var(--gold)'; }}
                onMouseOut={e=>{ e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.borderColor='var(--beige2)'; }}
              >Ver no Mapa →</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════ */
function Timeline() {
  return (
    <section id="historia" style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream2)', overflow:'hidden',
    }}>
      <div style={{ maxWidth:860, margin:'0 auto' }}>
        <Header tag="A Nossa História" title="O Caminho até ao Altar"
          sub="Os momentos que nos trouxeram até aqui." />

        <div style={{ position:'relative' }}>
          {/* Vertical line */}
          <div style={{
            position:'absolute', left:'50%', top:8, bottom:8,
            width:'0.5px',
            background:'linear-gradient(to bottom, transparent, var(--beige2) 8%, var(--beige2) 92%, transparent)',
            transform:'translateX(-50%)',
          }} />

          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div key={i}
                initial={{ opacity:0, x: left ? -32 : 32 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
                style={{
                  display:'flex',
                  justifyContent: left ? 'flex-end' : 'flex-start',
                  paddingLeft:  left ? 0 : 'calc(50% + 24px)',
                  paddingRight: left ? 'calc(50% + 24px)' : 0,
                  marginBottom:'clamp(20px,3vw,32px)',
                  position:'relative',
                }}
              >
                {/* Dot */}
                <div style={{
                  position:'absolute', left:'50%', top:'50%',
                  width:8, height:8, borderRadius:'50%',
                  background:'var(--gold)',
                  transform:'translate(-50%,-50%)',
                  border:'2.5px solid var(--cream2)',
                  zIndex:1,
                }} />

                {/* Card */}
                <div style={{
                  background:'var(--cream)',
                  border:'0.5px solid var(--beige)',
                  borderLeft: left ? '0.5px solid var(--beige)' : '2px solid var(--gold)',
                  borderRight: left ? '2px solid var(--gold)' : '0.5px solid var(--beige)',
                  padding:'clamp(18px,2.5vw,26px) clamp(16px,2.5vw,24px)',
                  maxWidth:'min(320px, calc(50vw - 40px))',
                  width:'100%',
                }}>
                  <p style={{
                    fontFamily:'var(--font-u)', fontSize:'0.55rem',
                    letterSpacing:'0.3em', color:'var(--gold)',
                    textTransform:'uppercase', marginBottom:8,
                  }}>{item.year}</p>
                  <h3 style={{
                    fontFamily:'var(--font-d)', fontSize:'clamp(1rem,2.2vw,1.2rem)',
                    fontWeight:400, color:'var(--text)', marginBottom:10,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily:'var(--font-b)', fontSize:'0.95rem',
                    fontWeight:300, color:'var(--text2)', lineHeight:1.75,
                  }}>{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .tl-wrap > div { padding-left: 24px !important; padding-right: 0 !important; justify-content: flex-start !important; }
          .tl-wrap > div > div:last-child { max-width: 100% !important; border-left: 2px solid var(--gold) !important; border-right: 0.5px solid var(--beige) !important; }
          .tl-line { left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   GALLERY
══════════════════════════════════════════════ */
function Gallery() {
  const [sel, setSel] = useState(null);
  const valid = galleryPhotos.filter(Boolean);
  return (
    <section id="galeria" style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream)',
    }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <Header tag="Galeria" title="Memórias que Ficam"
          sub="Um vislumbre da nossa história em imagens." />

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(min(220px,100%),1fr))',
          gap:6,
        }}>
          {valid.map((src,i) => (
            <motion.div key={i} {...up(i*0.05)}
              onClick={()=>setSel(src)}
              style={{
                aspectRatio: i % 5 === 0 ? '3/4' : '1/1',
                overflow:'hidden', cursor:'pointer',
                background:'var(--cream3)',
              }}
            >
              <img src={src} alt="" loading="lazy" style={{
                width:'100%', height:'100%', objectFit:'cover',
                transition:'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
                display:'block',
              }}
                onMouseOver={e=>e.currentTarget.style.transform='scale(1.06)'}
                onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setSel(null)}
            style={{
              position:'fixed', inset:0, zIndex:200,
              background:'rgba(14,8,4,0.94)',
              display:'flex', alignItems:'center', justifyContent:'center',
              padding:24, cursor:'pointer',
            }}
          >
            <motion.img src={sel} alt=""
              initial={{scale:0.84,opacity:0}} animate={{scale:1,opacity:1}}
              exit={{scale:0.9,opacity:0}} transition={{duration:0.4,ease:[0.16,1,0.3,1]}}
              style={{ maxWidth:'88vw', maxHeight:'88vh', objectFit:'contain', cursor:'default' }}
              onClick={e=>e.stopPropagation()}
            />
            <button onClick={()=>setSel(null)} style={{
              position:'fixed', top:20, right:20,
              background:'rgba(255,255,255,0.08)', border:'0.5px solid rgba(255,255,255,0.2)',
              color:'rgba(255,255,255,0.7)', width:38, height:38, borderRadius:'50%',
              fontSize:'0.85rem', cursor:'pointer', transition:'background 0.2s',
            }}
              onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.16)'}
              onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════
   RSVP
══════════════════════════════════════════════ */
function RSVP() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);
  const [editing, setEditing] = useState(false);

  const submit = (s) => {
    if (!name.trim()) return;
    setStatus(s); setEditing(false);
  };

  return (
    <section id="rsvp" style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream2)',
    }}>
      <div style={{ maxWidth:520, margin:'0 auto' }}>
        <Header tag="R.S.V.P" title="Confirmar Presença"
          sub={`Confirme a sua presença até ${rsvpDeadline}`} />

        {/* Invite card */}
        <motion.div {...up(0.1)} style={{
          border:'0.5px solid var(--beige2)',
          padding:'clamp(20px,3vw,32px)',
          marginBottom:28, textAlign:'center',
          background:'var(--cream)',
          position:'relative',
        }}>
          <div style={{
            position:'absolute', top:0, left:'30%', right:'30%',
            height:'1.5px', background:'var(--gold)',
          }} />
          <p className="lbl" style={{ marginBottom:10 }}>Este convite é válido para</p>
          <p style={{
            fontFamily:'var(--font-d)', fontSize:'clamp(1.5rem,4vw,2.1rem)',
            color:'var(--brown)', marginBottom:12,
          }}>2 Pessoas</p>
          <Rule />
          <p style={{
            fontFamily:'var(--font-u)', fontSize:'0.54rem',
            letterSpacing:'0.2em', color:'var(--text3)',
            textTransform:'uppercase', margin:'14px 0 4px',
          }}>Mesa</p>
          <p style={{
            fontFamily:'var(--font-b)', fontStyle:'italic',
            color:'var(--text3)', fontSize:'0.95rem',
          }}>Sem mesa atribuída</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status && !editing ? (
            <motion.div key="ok"
              initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0.96}} transition={{duration:0.4}}
              style={{
                textAlign:'center',
                padding:'clamp(32px,5vw,52px) 24px',
                background: status==='confirmed' ? '#f0f5ee' : '#f7eeee',
                border:`0.5px solid ${status==='confirmed' ? '#c8d8c4' : '#d8c4c4'}`,
              }}
            >
              <p style={{ fontSize:'2rem', marginBottom:16 }}>
                {status==='confirmed' ? '🎊' : '🙏'}
              </p>
              <h3 style={{
                fontFamily:'var(--font-d)', fontSize:'clamp(1.2rem,3vw,1.5rem)',
                color:'var(--brown)', marginBottom:10,
              }}>
                {status==='confirmed' ? 'Presença Confirmada!' : 'Presença Recusada'}
              </h3>
              <p style={{
                fontFamily:'var(--font-b)', fontStyle:'italic',
                color:'var(--text2)', fontSize:'1rem', marginBottom:28, lineHeight:1.7,
              }}>
                {status==='confirmed'
                  ? `Mal podemos esperar por si, ${name.split(' ')[0]}! 💛`
                  : `Obrigado por nos informar, ${name.split(' ')[0]}. Sentiremos a sua falta.`}
              </p>
              <button onClick={()=>{setStatus(null);setEditing(true);}} style={{
                padding:'10px 28px', background:'transparent',
                border:'0.5px solid var(--brown)', color:'var(--brown)',
                fontFamily:'var(--font-u)', fontSize:'0.56rem',
                letterSpacing:'0.24em', textTransform:'uppercase',
                cursor:'pointer', transition:'all 0.25s',
              }}
                onMouseOver={e=>{e.currentTarget.style.background='var(--brown)';e.currentTarget.style.color='#faf8f5';}}
                onMouseOut={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--brown)';}}
              >Editar Presença</button>
            </motion.div>
          ) : (
            <motion.div key="form"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-10}} transition={{duration:0.35}}
            >
              <div style={{ marginBottom:18 }}>
                <label style={{
                  display:'block', fontFamily:'var(--font-u)', fontSize:'0.56rem',
                  letterSpacing:'0.22em', textTransform:'uppercase',
                  color:'var(--text3)', marginBottom:8,
                }}>Nome Completo *</label>
                <input type="text" placeholder="Ex.: António Sitoe" value={name}
                  onChange={e=>setName(e.target.value)}
                  onKeyDown={e=>e.key==='Enter' && submit('confirmed')}
                  style={{
                    width:'100%', padding:'12px 16px',
                    background:'var(--cream)', border:'0.5px solid var(--beige2)',
                    fontFamily:'var(--font-b)', fontSize:'1rem', color:'var(--text)',
                    outline:'none', transition:'border-color 0.2s',
                  }}
                  onFocus={e=>e.target.style.borderColor='var(--gold)'}
                  onBlur={e=>e.target.style.borderColor='var(--beige2)'}
                />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <button onClick={()=>submit('confirmed')}
                  style={{
                    padding:'13px', background:'var(--brown)', color:'#faf8f5',
                    border:'none', fontFamily:'var(--font-u)', fontSize:'0.56rem',
                    letterSpacing:'0.24em', textTransform:'uppercase',
                    cursor:'pointer', transition:'opacity 0.2s',
                  }}
                  onMouseOver={e=>e.currentTarget.style.opacity='0.82'}
                  onMouseOut={e=>e.currentTarget.style.opacity='1'}
                >✓ Confirmar</button>
                <button onClick={()=>submit('declined')}
                  style={{
                    padding:'13px', background:'transparent', color:'var(--text2)',
                    border:'0.5px solid var(--beige2)',
                    fontFamily:'var(--font-u)', fontSize:'0.56rem',
                    letterSpacing:'0.24em', textTransform:'uppercase',
                    cursor:'pointer', transition:'border-color 0.2s, color 0.2s',
                  }}
                  onMouseOver={e=>{e.currentTarget.style.borderColor='var(--brown)';e.currentTarget.style.color='var(--brown)';}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor='var(--beige2)';e.currentTarget.style.color='var(--text2)';}}
                >✕ Recusar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FELICITAÇÕES
══════════════════════════════════════════════ */
function Felicitacoes() {
  const [tab, setTab] = useState('write');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [list, setList] = useState([
    { name:'Família Oliveira', msg:'Que Deus abençoe esta linda união! Muitas felicidades ao casal. 🙏', date:'há 2 dias' },
    { name:'Carlos & Marta', msg:'Parabéns! Que o amor cresça a cada dia. Estaremos presentes! ❤️', date:'há 3 dias' },
    { name:'Ana Beatriz', msg:'Que sejam eternamente felizes! Mal posso esperar por este dia especial.', date:'há 5 dias' },
  ]);

  const send = () => {
    if (!name.trim() || !msg.trim()) return;
    setList(l => [{name, msg, date:'agora mesmo'}, ...l]);
    setName(''); setMsg(''); setTab('list');
  };

  return (
    <section id="felicitacoes" style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream)',
    }}>
      <div style={{ maxWidth:580, margin:'0 auto' }}>
        <Header tag="Felicitações" title="Deixe a Sua Mensagem" />

        {/* Tabs */}
        <div style={{
          display:'flex', marginBottom:32,
          borderBottom:'0.5px solid var(--beige2)',
        }}>
          {[['write','Escrever'],['list',`Ver Mensagens (${list.length})`]].map(([k,lbl])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              flex:1, padding:'12px 8px',
              background:'transparent', border:'none',
              borderBottom: tab===k ? '1.5px solid var(--brown)' : '1.5px solid transparent',
              color: tab===k ? 'var(--brown)' : 'var(--text3)',
              fontFamily:'var(--font-u)', fontSize:'0.56rem',
              letterSpacing:'0.2em', textTransform:'uppercase',
              cursor:'pointer', transition:'all 0.2s',
              marginBottom:'-0.5px',
            }}>{lbl}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab==='write' ? (
            <motion.div key="w"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-10}} transition={{duration:0.3}}
              style={{ display:'flex', flexDirection:'column', gap:14 }}
            >
              {[
                { label:'O Seu Nome *', val:name, set:setName, ph:'Ex.: Maria Silva', multi:false },
                { label:'A Sua Mensagem *', val:msg, set:setMsg, ph:'Escreva a sua mensagem de felicitação…', multi:true },
              ].map(({label,val,set,ph,multi})=>(
                <div key={label}>
                  <label style={{
                    display:'block', fontFamily:'var(--font-u)', fontSize:'0.54rem',
                    letterSpacing:'0.2em', textTransform:'uppercase',
                    color:'var(--text3)', marginBottom:8,
                  }}>{label}</label>
                  {multi ? (
                    <textarea rows={4} placeholder={ph} value={val} onChange={e=>set(e.target.value)}
                      style={{ width:'100%', padding:'12px 14px', background:'var(--cream2)', border:'0.5px solid var(--beige2)', fontFamily:'var(--font-b)', fontSize:'1rem', color:'var(--text)', resize:'vertical', outline:'none' }}
                      onFocus={e=>e.target.style.borderColor='var(--gold)'}
                      onBlur={e=>e.target.style.borderColor='var(--beige2)'}
                    />
                  ) : (
                    <input type="text" placeholder={ph} value={val} onChange={e=>set(e.target.value)}
                      style={{ width:'100%', padding:'12px 14px', background:'var(--cream2)', border:'0.5px solid var(--beige2)', fontFamily:'var(--font-b)', fontSize:'1rem', color:'var(--text)', outline:'none' }}
                      onFocus={e=>e.target.style.borderColor='var(--gold)'}
                      onBlur={e=>e.target.style.borderColor='var(--beige2)'}
                    />
                  )}
                </div>
              ))}
              <button onClick={send}
                disabled={!name.trim()||!msg.trim()}
                style={{
                  padding:'13px', marginTop:4,
                  background: (!name.trim()||!msg.trim()) ? 'var(--beige)' : 'var(--brown)',
                  color: (!name.trim()||!msg.trim()) ? 'var(--text3)' : '#faf8f5',
                  border:'none', fontFamily:'var(--font-u)', fontSize:'0.56rem',
                  letterSpacing:'0.28em', textTransform:'uppercase',
                  cursor:(!name.trim()||!msg.trim())?'not-allowed':'pointer',
                  transition:'all 0.2s',
                }}
              >Enviar Felicitação</button>
            </motion.div>
          ) : (
            <motion.div key="l"
              initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-10}} transition={{duration:0.3}}
              style={{ display:'flex', flexDirection:'column', gap:10 }}
            >
              {list.map((m,i)=>(
                <motion.div key={i}
                  initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
                  transition={{duration:0.3, delay:i*0.04}}
                  style={{
                    padding:'18px 20px',
                    background: i===0 && m.date==='agora mesmo' ? 'var(--gold-pale)' : 'var(--cream2)',
                    borderLeft:'2px solid var(--gold2)',
                  }}
                >
                  <p style={{
                    fontFamily:'var(--font-u)', fontSize:'0.65rem', fontWeight:500,
                    color:'var(--brown)', marginBottom:6,
                  }}>
                    {m.name}
                    <span style={{ color:'var(--text3)', fontWeight:300, marginLeft:10, fontSize:'0.55rem' }}>{m.date}</span>
                  </p>
                  <p style={{ fontFamily:'var(--font-b)', fontSize:'1rem', color:'var(--text)', lineHeight:1.7 }}>{m.msg}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   GIFT MODAL
══════════════════════════════════════════════ */
function GiftModal({ type, onClose }) {
  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          transition={{duration:0.25}}
          onClick={onClose}
          style={{
            position:'fixed', inset:0, zIndex:300,
            background:'rgba(20,12,6,0.72)',
            backdropFilter:'blur(6px)',
            display:'flex', alignItems:'center', justifyContent:'center', padding:24,
          }}
        >
          <motion.div
            initial={{scale:0.88,opacity:0,y:32}}
            animate={{scale:1,opacity:1,y:0}}
            exit={{scale:0.8,opacity:0,y:48,rotate:-2}}
            transition={{duration:0.4, ease:[0.16,1,0.3,1]}}
            onClick={e=>e.stopPropagation()}
            style={{
              background:'var(--cream)', border:'0.5px solid var(--beige)',
              borderTop:'2px solid var(--gold)',
              padding:'clamp(28px,4vw,48px)',
              maxWidth:480, width:'100%',
              position:'relative', maxHeight:'88vh', overflowY:'auto',
            }}
          >
            <button onClick={onClose} style={{
              position:'absolute', top:14, right:14,
              background:'var(--cream2)', border:'none',
              width:30, height:30, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', fontSize:'0.8rem', color:'var(--text3)',
            }}
              onMouseOver={e=>e.currentTarget.style.background='var(--beige)'}
              onMouseOut={e=>e.currentTarget.style.background='var(--cream2)'}
            >✕</button>

            <p className="lbl" style={{ marginBottom:10 }}>
              {type==='money' ? 'Presente Monetário' : 'Lista de Presentes'}
            </p>
            <h3 style={{
              fontFamily:'var(--font-d)', fontSize:'clamp(1.3rem,3vw,1.65rem)',
              fontWeight:400, color:'var(--text)', marginBottom:10,
            }}>
              {type==='money' ? 'Transferência Bancária' : 'Lista de Casamento'}
            </h3>
            <div style={{ marginBottom:24 }}><Rule /></div>

            {(type==='money' ? payments : stores).map((item,i)=>(
              <div key={i} style={{
                display:'flex', gap:14, alignItems:'flex-start',
                padding:'16px 18px', marginBottom:10,
                background:'var(--cream2)',
                border:'0.5px solid var(--beige)',
              }}>
                <span style={{ fontSize:'1.4rem', flexShrink:0 }}>
                  {type==='money' ? item.logo : item.icon}
                </span>
                <div>
                  <p style={{ fontFamily:'var(--font-u)', fontWeight:500, fontSize:'0.75rem', color:'var(--brown)', marginBottom:4 }}>
                    {type==='money' ? item.bank : item.name}
                  </p>
                  {type==='money' ? (
                    <>
                      <p style={{ fontFamily:'var(--font-u)', fontSize:'0.68rem', color:'var(--text3)', marginBottom:3 }}>
                        <strong>NIB:</strong> {item.nib}
                      </p>
                      <p style={{ fontFamily:'var(--font-b)', fontSize:'0.95rem', color:'var(--text)' }}>{item.holder}</p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontFamily:'var(--font-b)', fontSize:'0.92rem', color:'var(--text2)', marginBottom:3 }}>{item.address}</p>
                      <a href={`tel:${item.phone}`} style={{ fontFamily:'var(--font-u)', fontSize:'0.66rem', color:'var(--gold)', textDecoration:'none' }}>{item.phone}</a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   GIFTS
══════════════════════════════════════════════ */
function Gifts() {
  const [modal, setModal] = useState(null);
  return (
    <section style={{
      padding:'clamp(72px,10vw,120px) clamp(20px,5vw,40px)',
      background:'var(--cream2)',
    }}>
      <div style={{ maxWidth:580, margin:'0 auto' }}>
        <Header tag="Presente de Casamento" title="Um Gesto do Coração"
          sub="A vossa presença é o nosso maior presente. Caso queira presentear-nos, aqui estão as opções." />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[
            { k:'money', label:'Em Monetário', sub:'BIM · M-Pesa' },
            { k:'items', label:'Em Artigos', sub:'Lista de casamento' },
          ].map(({k,label,sub})=>(
            <motion.button key={k} {...up(k==='items'?0.1:0)}
              onClick={()=>setModal(k)}
              whileHover={{ y:-3 }}
              style={{
                padding:'clamp(28px,4vw,44px) 20px',
                background:'var(--cream)', textAlign:'center',
                border:'0.5px solid var(--beige)',
                borderBottom:'2px solid var(--gold)',
                cursor:'pointer',
                transition:'box-shadow 0.25s',
              }}
              onMouseOver={e=>e.currentTarget.style.boxShadow='0 8px 28px rgba(74,53,37,0.10)'}
              onMouseOut={e=>e.currentTarget.style.boxShadow='none'}
            >
              <p style={{
                fontFamily:'var(--font-d)', fontSize:'clamp(1.05rem,2.2vw,1.2rem)',
                color:'var(--text)', fontWeight:400, marginBottom:8,
              }}>{label}</p>
              <p style={{
                fontFamily:'var(--font-b)', fontSize:'0.9rem',
                fontStyle:'italic', color:'var(--text3)',
              }}>{sub}</p>
            </motion.button>
          ))}
        </div>
      </div>
      <GiftModal type={modal} onClose={()=>setModal(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      padding:'clamp(56px,8vw,88px) clamp(20px,5vw,40px) 40px',
      background:'var(--brown)', textAlign:'center',
    }}>
      <div style={{ marginBottom:36 }}>
        <Rule />
      </div>
      <p style={{
        fontFamily:'var(--font-d)',
        fontSize:'clamp(1.8rem,5.5vw,3.2rem)',
        fontWeight:400, color:'var(--gold-light)',
        lineHeight:1, marginBottom:4,
      }}>{couple.bride}</p>
      <p style={{
        fontFamily:'var(--font-b)', fontSize:'clamp(1rem,2.5vw,1.6rem)',
        fontStyle:'italic', color:'rgba(232,212,168,0.5)',
        marginBottom:4,
      }}>&amp;</p>
      <p style={{
        fontFamily:'var(--font-d)',
        fontSize:'clamp(1.8rem,5.5vw,3.2rem)',
        fontWeight:400, color:'var(--gold-light)',
        lineHeight:1, marginBottom:28,
      }}>{couple.groom}</p>

      <p style={{
        fontFamily:'var(--font-u)', fontSize:'0.6rem',
        letterSpacing:'0.36em', textTransform:'uppercase',
        color:'rgba(232,212,168,0.4)', marginBottom:32,
      }}>{weddingDateStr} · Maputo</p>

      <nav style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'clamp(10px,2.5vw,24px)', marginBottom:40 }}>
        {NAV_LINKS.map(([href,lbl])=>(
          <a key={href} href={href} style={{
            fontFamily:'var(--font-u)', fontSize:'0.52rem',
            letterSpacing:'0.2em', textTransform:'uppercase',
            color:'rgba(232,212,168,0.3)', textDecoration:'none', transition:'color 0.2s',
          }}
            onMouseOver={e=>e.currentTarget.style.color='rgba(232,212,168,0.7)'}
            onMouseOut={e=>e.currentTarget.style.color='rgba(232,212,168,0.3)'}
          >{lbl}</a>
        ))}
      </nav>

      <div style={{ borderTop:'0.5px solid rgba(232,212,168,0.1)', paddingTop:24 }}>
        <p style={{
          fontFamily:'var(--font-u)', fontSize:'0.5rem',
          letterSpacing:'0.12em', color:'rgba(232,212,168,0.2)',
        }}>Feito com ♡ em Maputo · 2026</p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
function Main() {
  const [open, setOpen] = useState(false);
  const [nav, setNav]   = useState(false);

  useEffect(()=>{
    const fn = () => setNav(window.scrollY > 60);
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  },[]);

  return (
    <div>
      <AnimatePresence>
        {!open && <Cover key="cv" onOpen={()=>setOpen(true)} />}
      </AnimatePresence>

      {open && (
        <>
          <Nav show={nav} />
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.9}}>
            <Hero />
            <Countdown />
            <CoupleSection />
            <Invitation />
            <Agenda />
            <Timeline />
            <Gallery />
            <RSVP />
            <Felicitacoes />
            <Gifts />
            <Footer />
          </motion.div>
          <MusicBtn />
        </>
      )}
    </div>
  );
}

export default function App() {
  return <AudioProvider><Main /></AudioProvider>;
}
