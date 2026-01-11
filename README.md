# Mestre do Livro

Sistema de escrita de livros com IA - Pipeline completo de concepção à publicação.

## Instalação

```bash
# Via npm (global)
npm install -g mestre-do-livro

# Via npx (sem instalação)
npx mestre-do-livro

# Via GitHub
npm install -g github:fabiomarques/mestre-do-livro
```

## Comandos

```bash
# Iniciar novo projeto de livro
mdl init "Meu Livro"

# Gerar documento de exemplo (diagramação)
mdl gerar exemplo

# Validar capítulos
mdl validar capitulos/capitulo-01.md

# Formatar para DOCX/PDF
mdl formatar capitulos/ --formato docx

# Gerar relatório final
mdl relatorio

# Verificar/instalar fontes
mdl fontes --verificar
```

## Pipeline de 6 Fases

```
FASE 1: CONCEPÇÃO    → Estrutura Snowflake
FASE 2: PESQUISA     → Knowledge base
FASE 3: RASCUNHO     → Primeiro rascunho
FASE 4: REFINAMENTO  → Quality Guard → Revisor → Advogado do Leitor
FASE 5: VALIDAÇÃO    → Score >= 95 para aprovar
FASE 6: PUBLICAÇÃO   → DOCX/PDF + Relatório Final
```

## Sistema de Validação

12 frameworks mentais para garantir qualidade:

| Framework | Função |
|-----------|--------|
| First Principles | Features booleanas |
| Second-Order Thinking | Não revelar pesos |
| Goodhart's Law | Ranges com teto |
| Circle of Competence | Curator override |
| Map vs Territory | Transparência |
| Via Negativa | Remover métricas subjetivas |
| Antifragility | Versionar algoritmo |
| Skin in the Game | Calibrar conservador |
| Falsifiability | Validation set |
| Pareto | Peso em 3 features core |
| Regret Minimization | Simples + extensível |
| Survivorship Bias | Comparar com negativos |

### Scoring

```yaml
QUALITY: 40 pts
  - has_framework: 15
  - has_exercise: 15
  - has_critique: 10

COMPLETENESS: 30 pts
  - structure_adequate: 15
  - size_adequate: 10
  - has_stories: 5

HYGIENE: Pass/Fail
  - chars >= 3000
  - chapters >= 3
  - no_ai_artifacts
  - no_placeholder_content

Aprovação: Score >= 95
```

## Diagramação

### Fontes

| Elemento | Fonte | Tamanho |
|----------|-------|---------|
| Título Capítulo | Helsinki Medium | 44pt |
| Subtítulo Capítulo | Lorimer No 2 Light | 18pt |
| Subtítulo 1 | Lorimer No 2 | 13.5pt |
| Subtítulo 2 | Lorimer No 2 | 11pt |
| Texto Corrido | Adobe Garamond Pro | 11pt |

### Espaçamento

- Antes: 5.65pt
- Depois: 5.65pt
- Entrelinhas: 15pt (exato)

## Estrutura do Projeto

```
meu-livro/
├── capitulos/
│   ├── rascunhos/
│   ├── revisados/
│   └── aprovados/
├── knowledge_base/
│   ├── conceitos/
│   ├── citacoes/
│   ├── dados/
│   └── glossario.md
├── output/
│   ├── docx/
│   └── pdf/
├── livro.config.json
└── README.md
```

## Agentes Disponíveis

| Agente | Função |
|--------|--------|
| Editor-Chefe | Revisão editorial, decisão final |
| Arquiteto de Conteúdo | Estrutura e fluxo |
| Narrador Especialista | Storytelling |
| Pesquisador | Dados e validação |
| Especialista em Metodologia | Ferramentas práticas |
| Revisor de Estilo | Português e gramática |
| Advogado do Leitor | Clareza e relevância |
| Coach de Escrita | Produtividade |
| Marketing Editorial | Pitch e sinopse |
| Auditor de Qualidade | Verificação de score |
| Quality Guard | Eliminar vícios de IA |
| Research Agent | Buscar referências |
| Page Controller | Controle de paginação |

## Relatório Final

Gerado automaticamente após validação:

1. Resumo Executivo
2. Sinopse Completa
3. Resumo por Capítulo
4. Métricas de Qualidade
5. Análise de Estilo
6. Paginação
7. Knowledge Base Utilizada
8. Histórico de Iterações

## Requisitos

- Node.js >= 18.0.0
- Fontes: Helsinki, Lorimer No 2, Adobe Garamond Pro
  - Alternativas: Josefin Sans, EB Garamond (Google Fonts)

## Integração com Claude Code

Este projeto foi desenvolvido para uso com Claude Code:

```bash
# Na pasta do projeto
claude

# Usar agentes
@editor-chefe revisar capitulo 1
@narrador escrever introdução
@quality-guard limpar texto
```

## Licença

MIT

## Autor

Fabio Marques
