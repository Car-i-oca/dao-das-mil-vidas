# Escrever eventos de Murim Quest

O catálogo ativo está em `src/data/events/index.ts` e usa `GameEvent` de `src/types.ts`. Eventos ficam em português brasileiro e precisam fazer sentido para pessoas, escolas e comunidades do Jianghu.

## Forma básica

```ts
{
  id: 'murim_exemplo',
  title: 'Uma decisão na estrada',
  rarity: 'incomum',
  once: true,
  cond: { ageMin: 16, flags: ['testemunha'] },
  text: 'Cena concreta; explique quem está presente e o que está em risco.',
  choices: [
    { text: 'Investigar antes de acusar', check: { stat: ['comp', 'car'], dif: 0 },
      ok: { text: 'A prova confirma parte do relato.', fx: { setFlags: ['prova_confirmada'] } },
      fail: { text: 'A pista se perde, mas a testemunha fica protegida.', fx: { setFlags: ['testemunha_protegida'] } } },
    { text: 'Afastar-se da disputa', res: { text: 'Você segue viagem sem tomar partido.', fx: { stats: { dao: 1 } } } },
  ],
}
```

## Condições e efeitos

As chaves de condição são definidas em `Cond` (`src/types.ts`). Em uma condição, diferentes campos se combinam; os valores de `flags` exigem todas as flags. Use `flagsAny` para uma lista de alternativas. Condições de escolhas são importantes para mostrar ao jogador somente ações disponíveis. Inclua sempre pelo menos uma opção sem requisito exclusivo.

`once` impede repetir a cena na mesma vida; `cooldown` limita repetição por idade; `weight` ajusta a chance relativa. `agenda` agenda outro evento para uma faixa de anos. O evento agendado só deve aparecer quando a condição dele também for verdadeira.

Efeitos de escolha podem alterar atributos, moedas, fama, ferimentos, moralidade, caminho marcial, faixa, itens, flags, agenda ou terminar a vida. Uma escolha que define um rumo de campanha não deve usar `fim`: reserve finais para morte, velhice ou encerramento deliberado.

## Regras editoriais

- Dê contexto específico à cena; não injete escolha genérica por palavras parecidas.
- Faça NPCs reagirem a flags que representam decisões anteriores; não os traga de volta com estado contraditório.
- Em testes, escreva resultados plausíveis tanto para sucesso como para falha. Falhar não deve apagar toda possibilidade de seguir o arco.
- Não combine em `flags` alternativas incompatíveis; use `flagsAny`.
- Evite itens de prêmio sem utilidade implementada e nomes que prometam uma mecânica inexistente.
- Não misture faixa marcial com magia de cultivo ou longevidade imortal.

## Verificações

Rode `npm run validate`, `npm run endings`, `npm run fuzz -- 300` e `npm run build`. Para alterações de chance ou recompensa, rode também `npm run sim -- 1000 --report` e `npm run poder -- 100`.
