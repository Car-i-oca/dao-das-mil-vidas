// Renderiza a amostra de arte pixel para revisão: npx tsx tools/art/amostra.ts [saida]
import { folha, salvar } from './png';
import { ITENS_AMOSTRA } from '../../src/ui/art/pixel2/itens';

const OUT = process.argv[2] ?? '.tmp/art';
const itens = Object.entries(ITENS_AMOSTRA).map(([id, f]) => ({ id, p: f() }));
folha(itens.map((x) => x.p), `${OUT}/itens.png`, 8, 6);
itens.forEach((x) => salvar(x.p, `${OUT}/item-${x.id}-1x.png`, 1));
console.log('itens salvos em', OUT);

import { retrato, RETRATOS_AMOSTRA } from '../../src/ui/art/pixel2/retratos';
const rets = Object.entries(RETRATOS_AMOSTRA).map(([id, o]) => ({ id, p: retrato(o) }));
folha(rets.map((x) => x.p), `${OUT}/retratos.png`, 6, 4);
console.log('retratos salvos');

import { CENARIOS_AMOSTRA, compor } from '../../src/ui/art/pixel2/cenarios';
for (const [nome, f] of Object.entries(CENARIOS_AMOSTRA)) for (const noite of [false, true]) salvar(compor(f(noite)), `${OUT}/cenario-${nome}-${noite ? 'noite' : 'dia'}.png`, 3);
console.log('cenários salvos');

import { lutador, POSES, TRACO_JOGADOR, TRACO_RIVAL, TRACO_DEMONIO, efeito } from '../../src/ui/art/pixel2/lutadores';
const quadros = Object.entries(POSES).flatMap(([n, l]) => l.map((po, i) => ({ n: n + i, p: lutador(TRACO_JOGADOR, po) })));
folha(quadros.map((x) => x.p), `${OUT}/lutador-jogador.png`, 5, 7);
folha(Object.values(POSES).flat().map((po) => lutador(TRACO_DEMONIO, po)), `${OUT}/lutador-demonio.png`, 5, 7);
folha([efeito('espada', 0), efeito('espada', 1), efeito('rajada', 0), efeito('rajada', 1), efeito('raio', 0)], `${OUT}/efeitos.png`, 5, 5);
void TRACO_RIVAL;
console.log('lutadores salvos');
