// ╔══════════════════════════════════════════════════════════════╗
// ║          FICHEIRO DE PERSONALIZAÇÃO DO CONVITE              ║
// ║   Edite apenas este ficheiro para personalizar o site       ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── 1. NOMES E FAMÍLIA ──────────────────────────────────────────
export const couple = {
  groom:        'Ricardo',
  bride:        'Beatriz',
  groomFull:    'Ricardo Almeida',
  brideFull:    'Beatriz Cunha',
  groomParents: 'Fernando Almeida & Lúcia Almeida',
  brideParents: 'Paulo Cunha & Helena Cunha',
};

// ─── 2. DATA E PRAZO DE RSVP ─────────────────────────────────────
export const weddingDate    = new Date('2026-11-15T16:00:00');
export const weddingDateStr = '15 • 11 • 2026';
export const rsvpDeadline   = '15 de Outubro de 2026';

// ─── 3. FOTOS ────────────────────────────────────────────────────
export const usarFotosLocais = true;

export const couplePhotos = {
  capa:   usarFotosLocais ? '/fotos/casal/capa.jpeg'   : 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=85',
  noivos: usarFotosLocais ? '/fotos/casal/noivos.jpeg' : 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=85',
  hero:   usarFotosLocais ? '/fotos/casal/hero.jpeg'   : 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85',
};

export const galleryPhotos = usarFotosLocais
  ? [
      '/fotos/galeria/foto1.jpeg',
      '/fotos/galeria/foto2.jpeg',
      '/fotos/galeria/foto3.jpeg',
      '/fotos/galeria/foto4.jpeg',
      '/fotos/galeria/foto5.jpeg',
      '/fotos/galeria/foto6.jpeg',
      '/fotos/galeria/foto8.jpeg',
    ]
  : [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    ];

// ─── 4. MÚSICA ───────────────────────────────────────────────────
export const usarMusicaLocal = true;
export const musicaLocalPath = '/musica/tema.mp3'; // ← caminho correcto
export const ytMusicId = 'VOgFZfRVfwU';

// ─── 5. AGENDA ───────────────────────────────────────────────────
export const events = [
  {
    icon: '⛪', title: 'Cerimónia Religiosa', time: '14H00',
    venue: 'Igreja Nossa Senhora da Conceição',
    address: 'Av. Eduardo Mondlane, 1452 · Maputo',
    mapsUrl: 'https://maps.google.com/?q=Igreja+Nossa+Senhora+da+Conceicao+Maputo',
  },
  {
    icon: '⚖️', title: 'Cerimónia Civil', time: '16H30',
    venue: 'Conservatória do Registo Civil',
    address: 'Av. 25 de Setembro · Maputo',
    mapsUrl: 'https://maps.google.com/?q=Conservatoria+Registo+Civil+Maputo',
  },
  {
    icon: '🥂', title: 'Copo d\'Água', time: '19H00',
    venue: 'Villa Luxe Garden',
    address: 'Rua da Beira, 88 · Polana · Maputo',
    mapsUrl: 'https://maps.google.com/?q=Polana+Maputo',
  },
];

// ─── 6. A NOSSA HISTÓRIA ─────────────────────────────────────────
export const timeline = [
  { year: '2018', title: 'O Primeiro Encontro', text: 'Num dia de sol em Maputo, dois mundos se cruzaram. Um olhar que mudou tudo.' },
  { year: '2019', title: 'O Primeiro Beijo', text: 'Numa praia de Inhaca, ao pôr do sol, o primeiro beijo selou algo que nenhum dos dois conseguia ainda nomear.' },
  { year: '2020', title: 'A Quarentena a Dois', text: 'O mundo parou, mas o nosso amor acelerou. Descobrimos que queríamos estar juntos em todos os momentos.' },
  { year: '2022', title: 'A Nossa Casa', text: 'Escolhemos um cantinho só nosso e transformámos quatro paredes num lar.' },
  { year: '2024', title: 'O Pedido', text: 'Numa noite estrelada, com uma caixa de veludo, ele fez a pergunta mais importante da vida. Ela disse sim.' },
  { year: '2026', title: 'Para Sempre', text: 'Convidamos todos os que amamos para testemunhar o próximo capítulo da nossa história.' },
];

// ─── 7. DADOS BANCÁRIOS E LOJAS ──────────────────────────────────
export const payments = [
  { bank: 'Millennium BIM', nib: '000100000037829844957', holder: 'Guilherme Mahema', logo: '🏦', type: 'bank' },
  { bank: 'Millennium BIM', nib: '00010000001430783965',  holder: 'Jolaice Dimas',    logo: '🏦', type: 'bank' },
  { bank: 'M-Pesa',         nib: '84 292 4965',          holder: 'Jolaice Dimas',    logo: '📱', type: 'mpesa' },
];

export const stores = [
  { name: 'Casa das Loiças', address: 'Av. Karl Marx · Maputo',       phone: '+258 21 303 332', icon: '🏺' },
  { name: 'Interlar',        address: 'Shopping Maputo · Av. Guerra', phone: '+258 21 498 000', icon: '🛋️' },
  { name: 'Shoprite Home',   address: 'Bairro Central · Maputo',      phone: '+258 21 350 000', icon: '🏠' },
];

// ─── 8. VERSÍCULO ────────────────────────────────────────────────
export const bibleVerse = {
  text: '«Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separe.»',
  ref:  'Mateus 19:6',
};
