# RELATÓRIO EXECUTIVO DO LIVRO

**Data de Geração:** {{DATA_GERACAO}}
**Versão:** {{VERSAO}}

---

## 1. RESUMO EXECUTIVO

| Aspecto | Valor |
|---------|-------|
| **Título** | {{TITULO_LIVRO}} |
| **Subtítulo** | {{SUBTITULO_LIVRO}} |
| **Autora** | {{NOME_AUTORA}} |
| **Premissa** | {{FRASE_SEMENTE}} |
| **Total de Capítulos** | {{TOTAL_CAPITULOS}} |
| **Total de Páginas** | {{TOTAL_PAGINAS}} (meta: {{META_PAGINAS}}) |
| **Total de Palavras** | ~{{TOTAL_PALAVRAS}} |
| **Score de Qualidade** | {{GRADE}} ({{SCORE_TOTAL}}/100) |
| **Status** | {{STATUS_FINAL}} |

---

## 2. SINOPSE COMPLETA

### O que é o livro

{{SINOPSE_EXPANDIDA}}

### Público-Alvo

{{PUBLICO_ALVO}}

### Proposta de Valor

{{PROPOSTA_VALOR}}

### Diferenciais

{{DIFERENCIAIS}}

---

## 3. RESUMO POR CAPÍTULO

{{#CADA_CAPITULO}}

### Capítulo {{NUMERO}}: {{TITULO}}
**Subtítulo:** {{SUBTITULO}}

{{RESUMO_3_5_LINHAS}}

| Métrica | Valor |
|---------|-------|
| Páginas | {{PAGINAS_CAPITULO}} (de {{PAG_INICIO}} a {{PAG_FIM}}) |
| Palavras | ~{{PALAVRAS_CAPITULO}} |
| Citações | {{CITACOES_CAPITULO}} |

**Conceitos-chave:** {{CONCEITOS_CHAVE}}

---

{{/CADA_CAPITULO}}

## 4. MÉTRICAS DE QUALIDADE

### Score Total: {{SCORE_TOTAL}}/100 - Grade {{GRADE}}

#### QUALITY ({{SCORE_QUALITY}}/40)

| Critério | Pontuação | Status |
|----------|-----------|--------|
| Has Framework | {{SCORE_FRAMEWORK}}/15 | {{STATUS_FRAMEWORK}} |
| Has Exercise | {{SCORE_EXERCISE}}/15 | {{STATUS_EXERCISE}} |
| Has Critique | {{SCORE_CRITIQUE}}/10 | {{STATUS_CRITIQUE}} |

#### COMPLETENESS ({{SCORE_COMPLETENESS}}/30)

| Critério | Pontuação | Status |
|----------|-----------|--------|
| Structure Adequate | {{SCORE_STRUCTURE}}/15 | {{STATUS_STRUCTURE}} |
| Size Adequate | {{SCORE_SIZE}}/10 | {{STATUS_SIZE}} |
| Has Stories | {{SCORE_STORIES}}/5 | {{STATUS_STORIES}} |

#### HYGIENE ({{STATUS_HYGIENE}})

| Critério | Valor | Status |
|----------|-------|--------|
| Caracteres mínimos (3.000+) | {{TOTAL_CHARS}} | {{CHECK_CHARS}} |
| Capítulos mínimos (3+) | {{TOTAL_CAPITULOS}} | {{CHECK_CAPS}} |
| Sem artefatos de IA | - | {{CHECK_AI}} |
| Sem placeholders | - | {{CHECK_PLACEHOLDER}} |

### Frameworks de Validação

| Framework | Status | Observação |
|-----------|--------|------------|
{{#CADA_FRAMEWORK}}
| {{NOME_FRAMEWORK}} | {{STATUS_FW}} | {{OBS_FW}} |
{{/CADA_FRAMEWORK}}

---

## 5. ANÁLISE DE ESTILO

### Aderência ao Estilo Andreza Araújo: {{PCT_ADERENCIA}}%

#### Métricas de Legibilidade

| Métrica | Valor | Interpretação |
|---------|-------|---------------|
| Índice Flesch-Kincaid | {{FLESCH_KINCAID}} | {{INTERP_FK}} |
| Índice Gunning Fog | {{GUNNING_FOG}} | {{INTERP_GF}} |
| Tamanho médio de frases | {{TAM_MEDIO_FRASES}} palavras | {{INTERP_TMF}} |
| % Frases longas (>25 palavras) | {{PCT_FRASES_LONGAS}}% | {{INTERP_FL}} |
| % Frases curtas (<10 palavras) | {{PCT_FRASES_CURTAS}}% | {{INTERP_FC}} |

#### Elementos Narrativos

| Elemento | Quantidade | Meta | Status |
|----------|------------|------|--------|
| Metáforas | {{QTD_METAFORAS}} | 30+ | {{STATUS_META}} |
| Perguntas retóricas | {{QTD_PERGUNTAS}} | 15+ | {{STATUS_PERG}} |
| Histórias/casos | {{QTD_HISTORIAS}} | 10+ | {{STATUS_HIST}} |
| Dados estatísticos | {{QTD_DADOS}} | 20+ | {{STATUS_DADOS}} |

#### Pontuação

| Tipo | Uso | Padrão Andreza | Status |
|------|-----|----------------|--------|
| Vírgulas | Principal | Principal | {{STATUS_VIRGULAS}} |
| Travessões | {{QTD_TRAVESSOES}} | 0 | {{STATUS_TRAVESSOES}} |
| Ponto e vírgula | {{QTD_PV}} | Mínimo | {{STATUS_PV}} |

---

## 6. PAGINAÇÃO

### Visão Geral

| Métrica | Valor |
|---------|-------|
| **Meta Total** | {{META_PAGINAS}} páginas |
| **Realizado** | {{TOTAL_PAGINAS}} páginas |
| **Diferença** | {{DIFERENCA_PAGINAS}} |

### Distribuição por Capítulo

| Capítulo | Título | Páginas | Meta | Status |
|----------|--------|---------|------|--------|
{{#CADA_CAPITULO_PAG}}
| {{NUM}} | {{TITULO_CAP}} | {{PAG_REALIZADO}} | {{PAG_META}} | {{STATUS_PAG}} |
{{/CADA_CAPITULO_PAG}}

### Alertas de Paginação

{{#CADA_ALERTA_PAG}}
- {{ALERTA}}
{{/CADA_ALERTA_PAG}}

---

## 7. KNOWLEDGE BASE UTILIZADA

### Estatísticas

| Categoria | Quantidade |
|-----------|------------|
| Conceitos utilizados | {{TOTAL_CONCEITOS}} |
| Citações incluídas | {{TOTAL_CITACOES}} |
| Dados estatísticos | {{TOTAL_DADOS}} |
| Estudos de caso | {{TOTAL_CASOS}} |

### Principais Autores Citados

{{#CADA_AUTOR}}
1. **{{NOME_AUTOR}}** - {{QTD_CITACOES}} citações
{{/CADA_AUTOR}}

### Áreas de Conhecimento Cobertas

{{#CADA_AREA}}
- **{{NOME_AREA}}**: {{PCT_AREA}}%
{{/CADA_AREA}}

---

## 8. HISTÓRICO DE ITERAÇÕES

### Resumo

| Métrica | Valor |
|---------|-------|
| **Total de Ciclos** | {{TOTAL_CICLOS}} |
| **Capítulos que precisaram revisão** | {{CAPS_REVISADOS}} |
| **Score inicial médio** | {{SCORE_INICIAL_MEDIO}} |
| **Score final médio** | {{SCORE_FINAL_MEDIO}} |

### Detalhamento por Ciclo

{{#CADA_CICLO}}

#### Ciclo {{NUM_CICLO}}

| Aspecto | Detalhe |
|---------|---------|
| **Fase de Retorno** | {{FASE_RETORNO}} |
| **Motivo** | {{MOTIVO_RETORNO}} |
| **Score Antes** | {{SCORE_ANTES}} |
| **Score Depois** | {{SCORE_DEPOIS}} |

**Correções Realizadas:**
{{#CADA_CORRECAO}}
- {{CORRECAO}}
{{/CADA_CORRECAO}}

---

{{/CADA_CICLO}}

## 9. PRÓXIMOS PASSOS

### Para Publicação

- [ ] Revisão visual do layout (DOCX/PDF)
- [ ] Aprovação final do autor
- [ ] Geração da capa
- [ ] Preparação de materiais de marketing
- [ ] Definição de data de lançamento

### Materiais de Apoio Sugeridos

- [ ] Sinopse para contracapa
- [ ] Biografia atualizada do autor
- [ ] Citações destacadas para divulgação
- [ ] Resumo para assessoria de imprensa

---

## ASSINATURAS

| Papel | Nome | Data | Status |
|-------|------|------|--------|
| **Sistema** | Mestre do Livro v2.0 | {{DATA_GERACAO}} | Gerado |
| **Editor-Chefe** | {{NOME_EDITOR}} | {{DATA_EDITOR}} | {{STATUS_EDITOR}} |
| **Autor** | {{NOME_AUTORA}} | {{DATA_AUTOR}} | {{STATUS_AUTOR}} |

---

*Relatório gerado automaticamente pelo sistema Mestre do Livro v2.0*
*Este documento é confidencial e destinado exclusivamente ao autor e equipe editorial.*
