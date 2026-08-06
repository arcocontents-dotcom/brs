---
description: Duplica o template brand-motion-template para iniciar um projeto novo, sem alterar o template original
argument-hint: nome-do-cliente
---

Duplique o repositório template `arcocontents-dotcom/brand-motion-template` para criar um projeto novo chamado `$ARGUMENTS`.

Rode, em sequência:

1. gh repo create $ARGUMENTS --template arcocontents-dotcom/brand-motion-template --public --clone
2. cd $ARGUMENTS && npm install

Confirme ao final que:
- O repositório novo foi criado em github.com/arcocontents-dotcom/$ARGUMENTS
- A pasta local $ARGUMENTS existe com todos os arquivos do template (incluindo src/brand.ts e .claude/skills/brand-identity)
- O `npm install` rodou sem erro

Não modifique o repositório arcocontents-dotcom/brand-motion-template em nenhuma hipótese — ele é somente a base, nunca o destino de alterações.
