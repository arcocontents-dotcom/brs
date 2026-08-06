---
name: brand-identity
description: Use this skill whenever creating, editing, or reviewing Remotion compositions, scenes, or animations for this brand. Points to src/brand.ts as the single source of truth for colors, fonts, logos, and video format, and documents the brand's minimalist premium visual and motion philosophy so animations stay consistent.
---

# Identidade da Marca

## Fonte de dados
Cores, fontes, logos e formato de vídeo vivem em `src/brand.ts`. NUNCA hardcode cor, fonte ou logo direto numa composição — sempre importe de `src/brand.ts`.

```typescript
import { colors, fonts, logos, videoFormats, defaultFormat } from "../brand";
```

**Cores**: `colors.primary`/`colors.background` (#ffffff, fundo), `colors.secondary`/`colors.text` (#000000, elementos e texto).
**Tipografia**: `fonts.heading` (Clofie, semiBold/extraBold), `fonts.sub` (Gold & Queen, regular).
**Logos**: `logos.primary` (barqwhite.png, principal), `logos.black`, `logos.whiteAlt`, `logos.blackAlt`.
**Formato**: padrão vertical 1080x1440 (3:4), 30fps — `videoFormats[defaultFormat]`.

## Filosofia visual
Minimalista, premium e refinada. Sofisticação vem da simplicidade, não da decoração. Na dúvida entre adicionar ou remover um elemento: remova.

## Cor
- Fundo branco por padrão, elementos gráficos e textos em preto.
- Uma terceira cor pode ser usada apenas para destacar informação importante ou um indicador específico — nunca mais de uma cor de destaque ao mesmo tempo.

## Formas
- Retângulos com cantos arredondados, raio consistente entre todos os elementos.
- Bordas finas (2px) — nunca bordas grossas.
- Sem sombras exageradas ou efeitos chamativos. Todo elemento deve parecer limpo e bem construído.

## Hierarquia
- Muito espaço em branco, poucos elementos por tela, um único ponto focal.
- Informações organizadas, margens consistentes, alinhamentos precisos.
- Cada tela tem um objetivo único; menos informação gera mais sofisticação.

## Tipografia
- Hierarquia por peso (semiBold vs extraBold), evitando excesso de negrito.
- Bastante espaçamento entre blocos, nunca comprimir texto.
- Poucas palavras por tela — tom editorial.

## Motion
- Ease in/out suave, curvas naturais, pequenas desacelerações, ritmo consistente.
- Nunca bounce exagerado, overshoot, elastic, tremores ou mudanças instantâneas de velocidade.
- O usuário deve perceber o conteúdo, não a animação.

### Entrada
- Fade suave, pequeno deslocamento vertical ou horizontal, scale entre 98% e 100%.
- Evitar animações grandes ou chamativas.

### Saída
- Mesma elegância da entrada: fade, pequena redução de escala, pequeno deslocamento.
- Nunca desaparecimento abrupto.

### Velocidade
- Nem acelerado, nem lento demais. As animações devem "respirar".

## Organização e espaçamento
- Tudo segue um grid invisível: textos, ícones, botões, cards e linhas alinhados — nada "solto".
- Espaçamento generoso; nunca elementos muito próximos. A composição deve transmitir leveza.

## Linhas e ícones
- Linhas: 2px, retas, precisas, cantos arredondados quando necessário, sem efeitos.
- Ícones: outline, traço fino, geometria simples, sem excesso de detalhe.

## Cards
- Fundo branco, borda preta de 2px, cantos arredondados, muito espaço interno, pouca informação.

## Composição
- Evitar poluição visual, muitos elementos competindo, muitas cores ou muitos tamanhos de fonte.
- Cada tela deve ter um objetivo claro.

## Regras ao criar novas composições
1. Sempre importe cor/fonte/logo/formato de `src/brand.ts` — nunca declare localmente.
2. Use `videoFormats[defaultFormat]`, salvo pedido explícito de outro formato.
3. A terceira cor de destaque (quando usada) é sempre única na tela.
4. Priorize sempre: elegância, precisão, clareza, sofisticação, minimalismo, espaço em branco, consistência, legibilidade.
