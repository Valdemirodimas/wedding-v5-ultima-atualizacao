# 📖 Guia de Personalização — Convite de Casamento

Este guia explica como adicionar as suas fotos e a sua música ao convite,
e como personalizar todos os textos.

---

### Nomes e família
```js
export const couple = {
  groom:        'Gabriel',         // ← mude para o nome do noivo
  bride:        'Isabela',         // ← mude para o nome da noiva
  groomFull:    'Gabriel Moreira', // ← nome completo do noivo
  brideFull:    'Isabela Santos',  // ← nome completo da noiva
  groomParents: 'António & Maria', // ← pais do noivo
  brideParents: 'José & Ana',      // ← pais da noiva
};
```

### Data do casamento
```js
export const weddingDate    = new Date('2026-11-15T16:00:00');
//                                      Ano  Mês Dia  Hora
export const weddingDateStr = '15 • 11 • 2026'; // como aparece no convite
export const rsvpDeadline   = '15 de Outubro de 2026';
```

### Agenda (hora e local de cada cerimónia)
```js
export const events = [
  {
    title:   'Cerimónia Religiosa',
    time:    '14H00',              // ← hora
    venue:   'Igreja Nossa…',      // ← nome do local
    address: 'Av. Eduardo…',       // ← morada
    mapsUrl: 'https://maps.google.com/?q=…', // ← link para o mapa
  },
  // … repita para Civil e Copo d'Água
];
```

### A Nossa História
```js
export const timeline = [
  { year: '2018', title: 'O Primeiro Encontro', text: 'Texto da história…' },
  { year: '2019', title: 'O Primeiro Beijo',    text: 'Texto da história…' },
  // adicione ou remova anos conforme a vossa história
];
```

### Dados bancários
```js
export const payments = [
  { bank: 'Millennium BIM', nib: 'SEU NIB AQUI', holder: 'Nome do titular', logo: '🏦' },
  { bank: 'M-Pesa',         nib: '84 XXX XXXX',  holder: 'Nome do titular', logo: '📱' },
];
```

---



*Convite criado com React + Vite · Feito com ♡ em Maputo*
