---
name: research
description: "Pesquisa de referências, artigos, dados e citações. Use para: (1) Buscar artigos acadêmicos, (2) Encontrar estatísticas, (3) Validar dados existentes, (4) Formatar referências bibliográficas."
---

# Research - Pesquisa de Referências

Busca e validação de referências para enriquecer o conteúdo do livro.

## Quando Usar

- Fase 2: Pesquisa (principal)
- Quando precisar fundamentar afirmações
- Para validar dados citados
- Para encontrar citações de autoridades

## Fontes por Tipo

### Artigos Acadêmicos
- Google Scholar
- Semantic Scholar
- CrossRef
- ResearchGate
- SciELO (Brasil)

### Dados e Estatísticas
- IBGE (Brasil)
- OIT (Organização Internacional do Trabalho)
- OMS (Saúde)
- Banco Mundial
- IPEA
- Relatórios setoriais

### Citações
- Livros originais (verificar sempre)
- Wikiquote (verificar fonte primária)
- Entrevistas publicadas

### Estudos de Caso
- Harvard Business Review
- MIT Sloan Management Review
- Periódicos setoriais
- Relatórios de consultorias (McKinsey, BCG)

## Workflow de Pesquisa

### 1. Definir Necessidade

```yaml
busca:
  tema: "Cultura de segurança"
  tipo: "estatística|citação|caso|artigo"
  contexto: "Fundamentar capítulo sobre..."
  restricoes:
    - ano_minimo: 2019
    - idioma: ["pt", "en"]
    - peer_reviewed: true (se aplicável)
```

### 2. Executar Busca

```bash
# Usando ferramentas disponíveis
# Perplexity para buscas gerais
# Google Scholar para acadêmicos
# Bases específicas para dados
```

### 3. Validar Fonte

| Critério | Peso | Verificação |
|----------|------|-------------|
| Autoridade | 25% | Instituição reconhecida? |
| Atualidade | 25% | Dados recentes (<5 anos)? |
| Metodologia | 25% | Como coletaram dados? |
| Citações | 25% | Outros trabalhos citam? |

### 4. Documentar

```yaml
referencia:
  tipo: "artigo"
  titulo: "Título completo"
  autor: "Nome do autor"
  ano: 2024
  fonte: "Publicação"
  url: "link"
  data_acesso: "2026-01-10"
  resumo: "Breve resumo relevante"
  citacao_sugerida: "Trecho para citar"
  confiabilidade: "alta"
  validado: true
```

## Formato de Entrega

### Para Citação Direta

```markdown
## Referência Encontrada

**Tema:** [Tema buscado]
**Tipo:** Artigo acadêmico

### Dados
- **Autor:** Kahneman, Daniel
- **Ano:** 2011
- **Título:** Thinking, Fast and Slow
- **Editora:** Farrar, Straus and Giroux

### Citação Sugerida
> "Texto exato a ser citado, entre aspas, conforme original."
> (KAHNEMAN, 2011, p. 45)

### Contexto de Uso
Use para fundamentar discussão sobre vieses cognitivos e tomada de decisão.

### Confiabilidade: ⭐⭐⭐⭐⭐ Alta
- Autor Nobel de Economia
- Obra seminal na área
- Amplamente citada
```

### Para Estatística

```markdown
## Dado Encontrado

**Tema:** Taxa de acidentes de trabalho no Brasil
**Valor:** 612.920 acidentes registrados em 2022

### Fonte
- **Instituição:** Ministério da Previdência Social
- **Publicação:** Anuário Estatístico de Acidentes do Trabalho
- **Ano:** 2023
- **URL:** [link]
- **Acesso:** 10/01/2026

### Uso Sugerido
"Em 2022, o Brasil registrou mais de 612 mil acidentes de trabalho
(MINISTÉRIO DA PREVIDÊNCIA SOCIAL, 2023)."

### Confiabilidade: ⭐⭐⭐⭐⭐ Alta
- Fonte oficial governamental
- Dados administrativos
```

## Formatação de Referências

### ABNT

```
SOBRENOME, Nome. Título: subtítulo. Edição. Local: Editora, ano.

Exemplo:
KAHNEMAN, Daniel. Rápido e devagar: duas formas de pensar.
Rio de Janeiro: Objetiva, 2012.
```

### APA

```
Sobrenome, N. (Ano). Título do trabalho. Editora.

Exemplo:
Kahneman, D. (2011). Thinking, fast and slow. Farrar, Straus and Giroux.
```

## Knowledge Base

Salvar referências em:

```
knowledge_base/
├── citacoes/
│   └── kahneman-2011.md
├── dados/
│   └── acidentes-trabalho-2022.md
└── referencias.md (índice)
```

## Alertas

⚠️ **Dados > 5 anos**: Buscar atualização
⚠️ **Fonte única**: Triangular com outras fontes
⚠️ **Tradução**: Citar original + indicar tradução
⚠️ **Paywall**: Indicar acesso restrito
⚠️ **Sem autor**: Verificar credibilidade da instituição
