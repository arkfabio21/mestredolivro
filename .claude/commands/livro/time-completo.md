---
description: Mostrar todos os agentes disponíveis para o projeto de livro
---

# Time de Agentes - Mestre do Livro

Você tem acesso a **13 agentes especializados** para ajudar na escrita e finalização do livro.

## Comandos Disponíveis

| Comando | Agente | Função |
|---------|--------|--------|
| `/livro:editor-chefe` | 📋 Editor-Chefe | Revisão editorial, decisão final |
| `/livro:arquiteto-conteudo` | 🏗️ Arquiteto de Conteúdo | Estrutura, organização, fluxo |
| `/livro:narrador-especialista` | 📖 Narrador Especialista | Storytelling, narrativas, metáforas |
| `/livro:pesquisador` | 🔬 Pesquisador | Dados, cases, validação técnica |
| `/livro:especialista-metodologia` | 🎯 Especialista em Metodologia | Ferramentas, acionabilidade |
| `/livro:revisor-estilo` | ✍️ Revisor de Estilo | Português, gramática, fluência |
| `/livro:advogado-leitor` | 👥 Advogado do Leitor | Clareza, relevância, público-alvo |
| `/livro:coach-escrita` | 💡 Coach de Escrita | Produtividade, bloqueios, metas |
| `/livro:marketing-editorial` | 📣 Marketing Editorial | Pitch, sinopse, divulgação |
| `/livro:auditor-qualidade` | 🔍 Auditor de Qualidade | Scoring, verificação de entregas |
| `/livro:quality-guard` | 🛡️ Quality Guard | Eliminar vícios de IA |
| `/livro:research-agent` | 🌐 Research Agent | Buscar referências online |
| `/livro:page-controller` | 📄 Page Controller | Controle de paginação |

## Pipeline de 6 Fases

```
FASE 1: CONCEPÇÃO    → Coach + Arquiteto → Estrutura Snowflake
FASE 2: PESQUISA     → Pesquisador + Research Agent → Knowledge base
FASE 3: RASCUNHO     → Narrador + Metodologia → Primeiro rascunho
FASE 4: REFINAMENTO  → Quality Guard → Revisor → Advogado (SEQUÊNCIA OBRIGATÓRIA)
FASE 5: VALIDAÇÃO    → Auditor + Editor → Score >= 95 para aprovar
FASE 6: PUBLICAÇÃO   → Page Controller + Formatação → Arquivos finais
```

## Matriz RACI por Fase

| Fase | R (Executa) | A (Aprova) | C (Consulta) | I (Informado) |
|------|-------------|------------|--------------|---------------|
| 1. Concepção | Coach | Arquiteto | Marketing | Outros |
| 2. Pesquisa | Research Agent | Pesquisador | Narrador | Outros |
| 3. Rascunho | Narrador | Arquiteto | Metodologia, Page Controller | Outros |
| 4. Refinamento | Quality Guard → Revisor → Advogado | - | - | Outros |
| 5. Validação | Auditor | Editor-Chefe | Todos | Todos |
| 6. Publicação | Page Controller | Autor (humano) | Marketing | Todos |

## Fase 4: Sequência Obrigatória

```
ETAPA 1: Quality Guard    → Remove vícios de IA
         ↓
ETAPA 2: Revisor Estilo   → Corrige português
         ↓
ETAPA 3: Advogado Leitor  → Valida clareza
```

**Regra**: Cada agente só recebe output do anterior. Sem retroalimentação.

## Estados do Capítulo

```
DRAFT → CLEANED → STYLED → VALIDATED → SCORED → APPROVED → FORMATTED
```

| Estado | Responsável | Critério de Saída |
|--------|-------------|-------------------|
| DRAFT | Narrador | Rascunho completo |
| CLEANED | Quality Guard | Zero vícios de IA |
| STYLED | Revisor Estilo | Português correto |
| VALIDATED | Advogado Leitor | Clareza para público |
| SCORED | Auditor | Score calculado |
| APPROVED | Editor-Chefe | Score >= 95 + aprovação |
| FORMATTED | Page Controller | Diagramação correta |

## Qual agente você gostaria de carregar?

Digite o número ou nome do agente para começar.
