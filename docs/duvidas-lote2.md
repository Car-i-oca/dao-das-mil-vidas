# Dúvidas do Lote 2 (decisões conservadoras tomadas sem consulta)

1. **Vulto Vermelho por corrupção.** Os robôs não chegam ao Caminho do Sangue; em vez de remover a alcunha, ela passa a valer também com corrupção ≥ 15. Se preferir que seja só do caminho/facção demoníaca, é reverter uma condição em `xianxia/alcunhas.ts`.
2. **Limiar do Xianxia (0,85 em vez de 1,0)** para chegar a 70% das vidas com alcunha, em vez de escrever ~dezenas de cenas só para isso. Reversível em `Z_PURO` / `LIMIAR_NASCER_MODO` (`engine/alcunhas.ts`).
3. **Murim: maior parcela de uma alcunha = 21,2%** (meta ≤ 20%) nesta medição; não foi mexido no B1. Fica para o B3.

## B2 — reação de alcunha por traço (decisão conservadora)
Só Memória de escriba (`mur_memoria`) e Rancor persistente (`mur_pedra`) têm alcunha ligada a um traço. Para os outros talentos e defeitos **não criei alcunha nova** (mudaria a parcela das alcunhas e o B3 trata disso); a «reação» entra como cena/opção do próprio traço e, quando já existir alcunha afim, como reação no B3.
