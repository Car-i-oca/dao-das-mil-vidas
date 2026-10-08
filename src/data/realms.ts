import type { Realm } from '../types';

/** Patamares marciais humanos: a reputação e a habilidade avançam, não a imortalidade. */
const ESCADA_MURIM: Realm[] = [
  { name: 'Civil', lifespan: 75, years: 0, breakChance: 1 },
  { name: 'Aprendiz', lifespan: 80, years: 6, breakChance: 0.9, titulo: 'Aprendiz', poder: 'Você domina os fundamentos e já consegue treinar sem supervisão constante.' },
  { name: 'Discípulo', lifespan: 100, years: 14, breakChance: 0.7, titulo: 'Discípulo', poder: 'Sua técnica é reconhecida nas escolas próximas; você pode representar uma linhagem.' },
  { name: 'Veterano', lifespan: 130, years: 28, breakChance: 0.55, titulo: 'Veterano', poder: 'Seu nome circula pelas estradas e sua presença encerra disputas menores.' },
  { name: 'Mestre de Escola', lifespan: 200, years: 55, breakChance: 0.4, titulo: 'Mestre', poder: 'Você orienta outros e pode mudar o destino de uma escola inteira.' },
  { name: 'Grão-Mestre', lifespan: 340, years: 100, breakChance: 0.22, tribulation: true, titulo: 'Grão-Mestre', poder: 'Poucos no Jianghu conseguem enfrentar sua técnica de igual para igual.' },
  { name: 'Lenda do Jianghu', lifespan: 540, years: 190, breakChance: 0.17, tribulation: true, titulo: 'Lenda', poder: 'Governantes e escolas rivais medem suas decisões pelo que você pode fazer.' },
  { name: 'Nome Imortalizado', lifespan: 800, years: 350, breakChance: 0.14, tribulation: true, titulo: 'Lenda Viva', poder: 'Seu método e suas escolhas atravessam gerações, mesmo quando você deixa o palco.' },
];

const escada = () => ({ name: 'Jianghu', realms: ESCADA_MURIM, finalName: 'Legado', finalChance: 0.02 });
export const LADDERS: Record<string, { name: string; realms: Realm[]; finalName: string; finalChance: number }> = { murim: escada() };
