import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { usarMusicaLocal, musicaLocalPath, ytMusicId } from '../data/weddingData';

const Ctx = createContext(null);

export function AudioProvider({ children }) {
  const audioRef  = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!usarMusicaLocal) return;
    const audio = new Audio(musicaLocalPath);
    audio.loop   = true;
    audio.volume = 0.30;
    audioRef.current = audio;
    audio.addEventListener('play',  () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('error', (e) => console.warn('Erro ao carregar música:', e));
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  useEffect(() => {
    if (usarMusicaLocal) return;
    const load = () => {
      if (window.YT?.Player) { initYT(); return; }
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initYT;
    };
    load();
  }, []);

  function initYT() {
    if (playerRef.current) return;
    const div = document.createElement('div');
    div.id = '_yt_bg';
    Object.assign(div.style, { position:'fixed', width:'1px', height:'1px', top:'-9999px', opacity:'0', pointerEvents:'none' });
    document.body.appendChild(div);
    playerRef.current = new window.YT.Player('_yt_bg', {
      videoId: ytMusicId,
      playerVars: { autoplay:0, controls:0, loop:1, playlist:ytMusicId, rel:0 },
      events: { onStateChange: e => setIsPlaying(e.data === window.YT.PlayerState.PLAYING) },
    });
  }

  const play = useCallback(() => {
    setHasStarted(true);
    if (usarMusicaLocal) {
      audioRef.current?.play().catch(err => console.warn('Play blocked:', err));
    } else {
      try { playerRef.current?.setVolume(30); playerRef.current?.playVideo(); } catch {}
    }
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    if (usarMusicaLocal) audioRef.current?.pause();
    else { try { playerRef.current?.pauseVideo(); } catch {} }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => isPlaying ? pause() : play(), [isPlaying, play, pause]);

  return <Ctx.Provider value={{ isPlaying, hasStarted, play, pause, toggle }}>{children}</Ctx.Provider>;
}

export const useAudio = () => useContext(Ctx);
