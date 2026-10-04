/**
 * Paleta fixa do pixel art 16-bit: 18 rampas de 5 tons (escuro/contorno, sombra, base, luz, brilho), com matiz que esfria nas
 * sombras e esquenta nas luzes. Todo o jogo pinta só com estas cores (mais o pontilhado entre tons vizinhos).
 */
export type Rampa = string[];

export const PAL = {
  pele: ['#6b3a3a', '#b86f5a', '#e0a47c', '#f3c9a0', '#fde6c8'],
  peleEscura: ['#3a2020', '#6e3e2c', '#9a6240', '#c08a5e', '#e0b080'],
  cabelo: ['#0e0a14', '#1d1626', '#32283f', '#4d4160', '#7a6c95'],
  cabeloBranco: ['#4a4a62', '#8a8aa6', '#bcbcd2', '#e2e2ee', '#fafaff'],
  azul: ['#141a3c', '#24367a', '#3a64c0', '#6a9ae0', '#b4d4ff'],
  vermelho: ['#3a0e1c', '#7a1e2c', '#b8323a', '#e0605a', '#ffa890'],
  jade: ['#0e2a24', '#1a5a44', '#2e9468', '#62c88a', '#b8f0c0'],
  roxo: ['#201040', '#44267e', '#7048b8', '#a07ee0', '#dcc4ff'],
  ouro: ['#3a2410', '#7a4a14', '#c08a20', '#f0c040', '#fff0a0'],
  aco: ['#1a1e2c', '#3c4660', '#7c8aa6', '#b8c6dc', '#f4f8ff'],
  madeira: ['#2a1608', '#5a3414', '#8e5a28', '#bc8444', '#e4b478'],
  papel: ['#5a4630', '#a08860', '#d8c498', '#f0e2bc', '#fff8e0'],
  pedra: ['#1c1a24', '#3a3846', '#625e70', '#8e8a9c', '#c0bccc'],
  fogo: ['#3a1008', '#8a2a10', '#d85a18', '#ffa030', '#ffe080'],
  ceu: ['#2a5aa0', '#4a86d0', '#78b4ec', '#b0dcf8', '#e8f8ff'],
  noite: ['#06041a', '#0e0a30', '#1a1450', '#2c2478', '#4a3ea0'],
  grama: ['#10281c', '#1e4a2a', '#3a7a36', '#6cae4c', '#b0dc78'],
  agua: ['#0e2a4a', '#1a4e80', '#2e82b8', '#62b8dc', '#b8ecf8'],
} satisfies Record<string, string[]>;

export const TODAS_AS_CORES: string[] = Object.values(PAL).flat();
