# Dúvidas do Lote 2 (decisões conservadoras tomadas sem consulta)

1. **Vulto Vermelho por corrupção.** Os robôs não chegam ao Caminho do Sangue; em vez de remover a alcunha, ela passa a valer também com corrupção ≥ 15. Se preferir que seja só do caminho/facção demoníaca, é reverter uma condição em `xianxia/alcunhas.ts`.
2. **Limiar do Xianxia (0,85 em vez de 1,0)** para chegar a 70% das vidas com alcunha, em vez de escrever ~dezenas de cenas só para isso. Reversível em `Z_PURO` / `LIMIAR_NASCER_MODO` (`engine/alcunhas.ts`).
3. **Murim: maior parcela de uma alcunha = 21,2%** (meta ≤ 20%) nesta medição; não foi mexido no B1. Fica para o B3.

## B2 — reação de alcunha por traço (decisão conservadora)
Só Memória de escriba (`mur_memoria`) e Rancor persistente (`mur_pedra`) têm alcunha ligada a um traço. Para os outros talentos e defeitos **não criei alcunha nova** (mudaria a parcela das alcunhas e o B3 trata disso); a «reação» entra como cena/opção do próprio traço e, quando já existir alcunha afim, como reação no B3.

## Pendência a) — Caminho do Sangue no Xianxia: robô ou bloqueio do jogo? (investigado)
**Conclusão: é bloqueio do jogo (falta de conteúdo que leve à trilha), não limitação do robô.** Nada foi corrigido aqui; a correção fica para o B4, como combinado.

Evidências (leitura de código, sem alterar nada):
1. No Xianxia v2 a vida começa sem trilha (`startLife(..., '', ...)`) e a única cena que dá trilha é `desp_mestre_caminho` (`xianxia/v2/moldes/despertar.ts`). Ela sorteia um mestre cuja trilha está na lista fixa `TRILHAS = [sopro, espada, alquimia, corpo, alma, formacoes, budista, venenos, bestas]`: **`demoniaca` não está na lista**, e o efeito `{ trilhaDe: 'mestre' }` só copia a trilha do mestre sorteado.
2. Nenhum molde do Xianxia concede `trilha: 'demoniaca'` (busca em `v2/moldes/*.ts`: só `tr_demoniaca_preco` e `tr_demoniaca_divida`, que **exigem** já seguir a trilha). Os moldes de `demonio.ts` mexem em corrupção e facção, mas não definem trilha.
3. A trilha ainda tem `unlock: 'xx_ach_demonio'` (conquista «Sombra Escolhida»). O motor não filtra trilhas por conquista, mas as simulações começam com `newMeta()` (sem conquistas), então a origem «Rebento da Seita Demoníaca» (mesma conquista) também nunca aparece nelas.
4. O robô (`sim/bot.ts`) escolhe só entre as opções que o jogo mostra; `seekDemon` só pesa corrupção. Ele não tem como escolher o que não é oferecido.

**Correção proposta para o B4 (não aplicada):** (a) incluir um molde de «Quem Mostra o Caminho do Sangue» (mestre de culto, só para quem tem corrupção ≥ algum limiar, facção demoníaca ou a origem do Rebento), ou (b) acrescentar `demoniaca` à lista `TRILHAS` com `quando` próprio; e liberar a trilha nas simulações quando o molde exigir a conquista. Decisão conservadora: não mexer agora para não alterar o balanço do Xianxia (ascensão em 0,8%) fora do B4.
