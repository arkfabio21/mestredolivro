---
name: report-generator
description: "Gerar relatório final do autor. Use para: (1) Consolidar métricas de qualidade, (2) Resumir capítulos, (3) Gerar visão executiva do livro antes da publicação."
---

# Report Generator - Relatório Final do Autor

Gera relatório executivo completo para o autor visualizar o livro antes da publicação.

## Quando Usar

- Após Fase 5 (Validação) aprovada
- Antes de gerar arquivos finais (Fase 6)
- Para revisão humana final

## Estrutura do Relatório

### 1. Resumo Executivo

```yaml
resumo_executivo:
  titulo_livro: "Título completo"
  premissa: "Frase-semente do Snowflake"
  total_capitulos: 14
  total_paginas: 199
  total_palavras: ~110.000
  score_qualidade: "A+ (96/100)"
  data_finalizacao: "10/01/2026"
```

### 2. Sinopse Completa

```yaml
sinopse:
  texto: "1-2 parágrafos descrevendo o livro"
  publico_alvo: "Descrição do leitor ideal"
  proposta_valor: "O que o leitor ganha ao ler"
  diferenciais: "O que torna este livro único"
```

### 3. Resumo por Capítulo

```yaml
capitulo:
  numero: 1
  titulo: "Título do capítulo"
  subtitulo: "Subtítulo (se houver)"
  resumo: "3-5 linhas descrevendo conteúdo"
  paginas: 14
  pagina_inicial: 23
  pagina_final: 36
  conceitos_chave: ["conceito1", "conceito2"]
  citacoes_usadas: 8
```

### 4. Métricas de Qualidade

```yaml
metricas:
  score_total: 96
  breakdown:
    QUALITY: 38/40
      has_framework: 15/15
      has_exercise: 15/15
      has_critique: 8/10
    COMPLETENESS: 28/30
      structure_adequate: 15/15
      size_adequate: 8/10
      has_stories: 5/5
    HYGIENE: PASS
      chars_minimos: "✓ (324.500 chars)"
      capitulos_minimos: "✓ (14 capítulos)"
      sem_artefatos_ia: "✓"
      sem_placeholders: "✓"
```

### 5. Análise de Estilo

```yaml
estilo:
  aderencia_autor: "87%"
  metricas:
    indice_flesch_kincaid: 62
    indice_gunning_fog: 10
    tamanho_medio_frases: 22 palavras
    frases_longas_pct: 45%
    frases_curtas_pct: 12%
  elementos_narrativos:
    metaforas: 47
    perguntas_retoricas: 23
    historias_casos: 18
    dados_estatisticos: 34
  pontuacao:
    virgulas: "Principal (correto)"
    travessoes: 0
    ponto_virgula: 2
```

### 6. Paginação

```yaml
paginacao:
  meta_total: 199
  realizado_total: 203
  diferenca: "+4 páginas"
  distribuicao:
    - capitulo: 1
      paginas: 14
      meta: 13
      status: "⚠️ +1"
    - capitulo: 2
      paginas: 12
      meta: 13
      status: "✅"
  alertas:
    - "Capítulo 1 está 1 página acima da meta"
    - "Capítulo 8 está 2 páginas abaixo da meta"
```

### 7. Knowledge Base Utilizada

```yaml
knowledge_base:
  total_conceitos: 89
  total_citacoes: 156
  total_dados: 34
  total_casos: 18
  principais_autores:
    - "Daniel Kahneman (12 citações)"
    - "Frank Bird (8 citações)"
    - "James Reason (6 citações)"
  areas_cobertas:
    - area: "Segurança comportamental"
      cobertura: "45%"
    - area: "Liderança"
      cobertura: "30%"
    - area: "Cultura organizacional"
      cobertura: "25%"
```

### 8. Histórico de Iterações

```yaml
iteracoes:
  total_ciclos: 2
  detalhamento:
    - ciclo: 1
      fase_retorno: "FASE 4"
      motivo: "Score QUALITY 89 (< 95)"
      correcoes:
        - "Adicionado exercício cap. 7"
        - "Expandida crítica cap. 12"
      score_antes: 89
      score_depois: 94
    - ciclo: 2
      fase_retorno: "FASE 4"
      motivo: "Score COMPLETENESS 88"
      correcoes:
        - "Expandido cap. 3 (+2 páginas)"
        - "Adicionada história cap. 9"
      score_antes: 94
      score_depois: 96
```

## Template de Saída

```markdown
# RELATÓRIO FINAL DO AUTOR

**Livro:** [Título]
**Autor:** [Nome]
**Data:** [Data]
**Status:** Aprovado para Publicação

---

## 1. RESUMO EXECUTIVO

| Métrica | Valor |
|---------|-------|
| Capítulos | 14 |
| Páginas | 199 |
| Palavras | ~110.000 |
| Score | A+ (96/100) |

**Premissa:** [Frase-semente]

---

## 2. SINOPSE

[Texto da sinopse 1-2 parágrafos]

**Público-alvo:** [Descrição]
**Proposta de valor:** [O que o leitor ganha]

---

## 3. CAPÍTULOS

| # | Título | Páginas | Conceitos-chave |
|---|--------|---------|-----------------|
| 1 | ... | 14 | ... |
| 2 | ... | 12 | ... |

[Resumo detalhado de cada capítulo]

---

## 4. MÉTRICAS DE QUALIDADE

**Score Total:** 96/100 (A+)

### Breakdown
- QUALITY: 38/40
- COMPLETENESS: 28/30
- HYGIENE: PASS

---

## 5. ANÁLISE DE ESTILO

**Aderência ao estilo do autor:** 87%

[Tabela de métricas de estilo]

---

## 6. PAGINAÇÃO

**Meta:** 199 | **Realizado:** 203 | **Diferença:** +4 (2%)

[Tabela de distribuição por capítulo]

---

## 7. REFERÊNCIAS UTILIZADAS

- Total de citações: 156
- Principais autores: [Lista]
- Áreas cobertas: [Gráfico/tabela]

---

## 8. HISTÓRICO

[Registro de iterações e correções]

---

**Gerado automaticamente pelo Mestre do Livro**
**[Data e hora]**
```

## Output

Gerar:
1. `relatorio-final-autor.md` - Versão Markdown
2. `relatorio-final-autor.docx` - Versão Word formatada
3. `relatorio-final-autor.pdf` - Versão PDF (opcional)
