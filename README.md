# 📚 Mestre do Livro

[![npm version](https://img.shields.io/npm/v/mestre-do-livro.svg)](https://www.npmjs.com/package/mestre-do-livro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Sistema completo de escrita de livros com IA** — do conceito inicial à publicação final.

---

## O que é?

O **Mestre do Livro** é uma CLI (Command Line Interface) que automatiza todo o processo de criação de livros não-ficção:

- 🎯 **Estruturação** — Método Snowflake para desenvolver a ideia
- 🔬 **Pesquisa** — Knowledge base organizada com citações e dados
- ✍️ **Escrita** — 13 agentes especializados para cada aspecto do livro
- ✅ **Validação** — Sistema de scoring com 12 frameworks mentais
- 🧹 **Quality Guard** — Detecção e remoção de vícios de escrita de IA
- 📄 **Formatação** — Exportação profissional para DOCX/PDF

### Para quem é?

- Autores que querem usar IA de forma estruturada
- Profissionais criando livros técnicos ou de negócios
- Coaches e consultores desenvolvendo material próprio
- Qualquer pessoa que quer escrever um livro com qualidade editorial

---

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

## 🤖 Agentes Especializados

O sistema conta com **13 agentes de IA**, cada um focado em um aspecto do livro:

### Estrutura e Conteúdo
| Agente | Função | Comando |
|--------|--------|---------|
| 📐 Arquiteto de Conteúdo | Estrutura, fluxo e organização | `/livro:arquiteto-conteudo` |
| 📖 Narrador Especialista | Storytelling e narrativa | `/livro:narrador-especialista` |
| 🔧 Especialista em Metodologia | Ferramentas práticas e acionáveis | `/livro:especialista-metodologia` |

### Pesquisa e Validação
| Agente | Função | Comando |
|--------|--------|---------|
| 🔬 Pesquisador | Dados, cases e referências técnicas | `/livro:pesquisador` |
| 🌐 Research Agent | Buscar e validar referências online | `/livro:research-agent` |
| ✅ Auditor de Qualidade | Verificação de score e critérios | `/livro:auditor-qualidade` |

### Revisão e Qualidade
| Agente | Função | Comando |
|--------|--------|---------|
| 📝 Editor-Chefe | Revisão editorial e decisão final | `/livro:editor-chefe` |
| ✏️ Revisor de Estilo | Português, gramática e fluência | `/livro:revisor-estilo` |
| 👁️ Advogado do Leitor | Clareza, relevância e acessibilidade | `/livro:advogado-leitor` |
| 🧹 Quality Guard | Eliminar vícios de escrita de IA | `/livro:quality-guard` |

### Produção e Publicação
| Agente | Função | Comando |
|--------|--------|---------|
| 💪 Coach de Escrita | Produtividade e superação de bloqueios | `/livro:coach-escrita` |
| 📣 Marketing Editorial | Pitch, sinopse e estratégia | `/livro:marketing-editorial` |
| 📄 Page Controller | Controle de paginação e formatação | `/livro:page-controller` |

> 💡 Use `/livro:time-completo` para ver todos os agentes disponíveis

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

## 🔌 Integração com Claude Code

Este projeto foi desenvolvido para uso com **Claude Code** (CLI oficial da Anthropic):

```bash
# 1. Instalar Claude Code
npm install -g @anthropic-ai/claude-code

# 2. Abrir o projeto
cd meu-livro
claude

# 3. Usar os agentes especializados
/livro:editor-chefe revisar capítulo 1
/livro:narrador-especialista melhorar storytelling
/livro:quality-guard limpar vícios de IA do texto
/livro:auditor-qualidade verificar score do capítulo
```

### Skills Disponíveis

Além dos agentes, o projeto inclui skills para manipulação de documentos:

| Skill | Função |
|-------|--------|
| `/pdf` | Criar, editar e extrair conteúdo de PDFs |
| `/docx` | Manipular documentos Word |
| `/xlsx` | Trabalhar com planilhas Excel |
| `/pptx` | Criar apresentações PowerPoint |
| `/book-formatter` | Aplicar formatação editorial ao livro |
| `/quality-guard` | Detectar e corrigir vícios de IA |
| `/research` | Pesquisar referências e citações |

---

## 🚀 Quick Start

```bash
# 1. Criar novo projeto
mdl init "Liderança Transformacional"

# 2. Desenvolver estrutura (com Claude Code)
claude
/livro:arquiteto-conteudo criar estrutura snowflake

# 3. Escrever capítulos
/livro:narrador-especialista escrever capítulo 1

# 4. Revisar e validar
mdl validar capitulos/ --quality-guard

# 5. Exportar
mdl formatar capitulos/ --formato docx
```

---

## 📋 Roadmap

- [x] CLI básica com comandos principais
- [x] Sistema de validação com scoring
- [x] Quality Guard (detecção de vícios de IA)
- [x] 13 agentes especializados
- [x] Formatação DOCX com estilos editoriais
- [ ] Geração automática de capa
- [ ] Integração com Amazon KDP
- [ ] Dashboard web para acompanhamento

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

## 📄 Licença

MIT © [Fabio Marques](https://github.com/arkfabio21)

---

<p align="center">
  Feito com ❤️ para autores que querem usar IA de forma inteligente
</p>
