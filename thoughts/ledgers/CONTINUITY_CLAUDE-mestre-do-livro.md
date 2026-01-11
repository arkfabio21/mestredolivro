# Continuity Ledger - Mestre do Livro

**Última atualização:** 2026-01-10T12:00:00Z
**Sessão:** Escrevendo Livro "Liderança Transformacional"

---

## Goal

Sistema completo de escrita de livros com IA - 13 agentes + 9 skills implementados para pipeline de 6 fases.

**Critério de sucesso:** Agentes e skills funcionais, integrados ao Claude Code via `/livro:*` commands.

---

## Constraints

- Score mínimo para aprovação: **95** (não 85)
- Fase 4 tem sequência obrigatória: Quality Guard → Revisor → Advogado
- Máximo 3 iterações por capítulo antes de escalar para humano
- Fontes: EB Garamond + Josefin Sans (Google Fonts)
- **Sem necessidade de PDF** - apenas Word (.docx)
- **Análise de subtítulos contextual** - não regra fixa

---

## Key Decisions

| Decisão | Motivo |
|---------|--------|
| Agentes em `.claude/commands/livro/` | Ativa via `/livro:nome-agente` |
| Fontes Google Fonts | EB Garamond + Josefin Sans (comerciais indisponíveis) |
| Tabelas em Excel, não Markdown | Melhor controle de formatação no Word |
| Análise contextual de subtítulos | Regras fixas não se adaptam ao tipo de livro |
| Script insert-table.py | Inserir tabelas Excel em documentos Word |

---

## State

- Done:
  - [x] Sistema base completo (agentes, skills, scripts)
  - [x] Pipeline testado e funcional
  - [x] **LIVRO: Liderança Transformacional**
  - [x] Cap 1 - O Fim do Líder Herói (95/100)
  - [x] Cap 2 - Os 5 Pilares da Transformação (95/100)
  - [x] Cap 3 - O Diagnóstico do Líder (100/100)
  - [x] Cap 4 - Visão: A Bússola que Alinha (100/100)
  - [x] Cap 5 - Confiança: O Alicerce Invisível (100/100)
  - [x] Cap 6 - Empoderamento: Soltar para Crescer (100/100)
  - [x] Cap 7 - Desenvolvimento: Multiplicar Líderes (100/100)
  - [x] Cap 8 - Reconhecimento: O Combustível (100/100)
  - [x] Cap 9 - Sua Jornada de 90 Dias (100/100)
  - [x] Cap 10 - O Legado do Líder Transformacional (100/100)

- Now: [✓] **LIVRO "LIDERANÇA TRANSFORMACIONAL" COMPLETO** - 100% (10/10 capítulos)

- Next:
  - [ ] Compilar todos os capítulos em documento único
  - [ ] Revisão final do livro completo
  - [ ] Gerar sumário e folha de rosto

---

## Open Questions

- CONFIRMED: LibreOffice não necessário (apenas Word)
- CONFIRMED: Análise de subtítulos agora é contextual
- CONFIRMED: Tabelas devem ser geradas em Excel e inseridas no Word

---

## Working Set

### Arquivos Atualizados Nesta Sessão

**Scripts:**
```
scripts/
├── quality-guard.py      # ATUALIZADO - Análise contextual de subtítulos
└── insert-table.py       # NOVO - Insere tabelas Excel no Word
```

**Agentes:**
```
.claude/commands/livro/
├── narrador-especialista.md  # ATUALIZADO - Regras de diagramação contextuais
└── quality-guard.md          # ATUALIZADO - Análise inteligente de estrutura
```

**Arquivos de Teste:**
```
teste-pipeline/
├── capitulos/
│   ├── cap01-introducao.md           # Exemplo ruim (score 30)
│   ├── cap02-lideranca-seguranca.md  # V1 com tabela Markdown
│   └── cap02-lideranca-seguranca-v2.md  # V2 corrigida (score 100)
└── output/
    ├── cap02-lideranca-v2-final.docx  # Documento final com tabela
    └── metricas-seguranca.xlsx        # Tabela de métricas
```

### Comandos Úteis

```bash
# Validar capítulo
npx mdl validar capitulos/arquivo.md

# Quality Guard com relatório
python3 scripts/quality-guard.py arquivo.md --report

# Converter e aplicar estilos
pandoc arquivo.md -o output.docx
python3 scripts/apply-book-styles.py output.docx final.docx --use-google-fonts

# Inserir tabela no Word
python3 scripts/insert-table.py documento.docx --after "texto" -o saida.docx
```

---

## Regras de Diagramação (Atualizadas)

**Análise Contextual (não regras fixas):**
- Tipo de livro determina estrutura (técnico vs narrativo)
- Cada subtítulo deve ter conteúdo substancial
- Manter consistência com capítulos anteriores

**Vícios de IA a evitar:**
- Zero dois pontos (:) no texto
- Zero tabelas Markdown (usar Excel)
- Zero transições clichê ("Por fim", "Além disso")
- Evitar frases curtas consecutivas

---

## Próximos Passos

1. Criar primeiro livro real com o pipeline
2. Testar todas as 6 fases em sequência
3. Documentar workflow completo para usuário
