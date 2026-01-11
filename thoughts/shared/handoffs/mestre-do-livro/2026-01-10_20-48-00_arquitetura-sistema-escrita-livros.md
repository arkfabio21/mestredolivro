---
date: 2026-01-10T20:48:00-0500
session_name: mestre-do-livro
researcher: Fabiomarques
git_commit: null
branch: null
repository: Mestre do Livro
topic: "Sistema de Escrita de Livros com IA - Arquitetura Completa"
tags: [escrita, livros, agentes, diagramacao, automacao, pipeline]
status: planning-complete
last_updated: 2026-01-10
last_updated_by: Fabiomarques
type: implementation_strategy
root_span_id: 
turn_span_id: 
---

# Handoff: Arquitetura Sistema de Escrita de Livros - Mestre do Livro

## Task(s)

| Task | Status |
|------|--------|
| Coletar requisitos do usuário | ✅ Completo |
| Definir sistema de validação (12 frameworks) | ✅ Completo |
| Especificar diagramação (fontes, estilos) | ✅ Completo |
| Identificar stack técnica existente | ✅ Completo |
| Selecionar agentes e skills do projeto "Livro - 1000 Dias" | ✅ Completo |
| Analisar estilo de escrita Andreza Araújo | ✅ Completo |
| Definir arquitetura expandida v2.0 | ✅ Completo |
| Implementar estrutura do projeto | 🔲 Pendente |
| Criar agentes e skills | 🔲 Pendente |

## Critical References

1. `/Users/fabiomarques/Projetos/Mestre do Livro/Docs/Modelo de Diagramação/Miolo_MAZ_V4.pdf` - Modelo visual de diagramação
2. `/Users/fabiomarques/Projetos/Mestre do Livro/Docs/Estilo de Escrita Andreza Araujo/Livro-miolo-CS-mod.2.docx` - Estilo de escrita da autora
3. `/Users/fabiomarques/Library/CloudStorage/OneDrive-BibliotecasCompartilhadas-EscoladaSegurança/redpine - Documentos/Tecnologia da Informação/RedPine/Livro - 1000 Dias/` - Projeto de referência com agentes e skills

## Recent changes

Nenhuma mudança de código ainda - fase de planejamento.

## Learnings

### Stack Técnica Existente (Projeto Especialista em Cursos)
- **docx** v9.5.1 - Geração de Word
- **md-to-pdf** v5.2.5 - Markdown para PDF
- **pdfkit** v0.17.2 - Geração de PDF programática
- **playwright** v1.57.0 - HTML para PDF
- Arquivo de referência: `/Users/fabiomarques/Projetos/Especialista em Cursos/cursos/prevencao-lesoes-graves-fatalidades-4h/07-implementacao/gerar-todos-docx.js`

### Plugin Planning with Files
- GitHub: https://github.com/OthmanAdi/planning-with-files
- Arquivos: task_plan.md, findings.md, progress.md
- Filosofia: "Context Window = RAM; Filesystem = Disk"

## Post-Mortem

### What Worked
- Abordagem de coleta incremental de requisitos funcionou bem
- Explorar projetos existentes do usuário para identificar ferramentas já em uso
- Análise do texto da autora para extrair padrões de estilo

### What Failed
- N/A - fase de planejamento

### Key Decisions
- **Score mínimo de aprovação: 95** (não 85) - usuário quer alta qualidade
- **Pipeline completo** - automação total com checkpoints de aprovação humana
- **10 agentes de livro** - time completo do projeto "Livro - 1000 Dias"

## Artifacts

Este handoff é o principal artefato. Abaixo está a especificação completa.

---

# ESPECIFICAÇÃO COMPLETA - MESTRE DO LIVRO v2.0

## 1. SISTEMA DE VALIDAÇÃO (12 Frameworks Mentais)

| Framework | Implicação | Ação |
|-----------|------------|------|
| First Principles | Medir proxies de valor | Features booleanas |
| Second-Order Thinking | Gaming é inevitável | Não revelar pesos exatos |
| Goodhart's Law | Métricas se corrompem | Ranges com teto |
| Circle of Competence | Limites do algoritmo | Curator override |
| Map vs Territory | Score é indicativo | Transparência nas métricas |
| Via Negativa | Não medir tudo | Remover métricas subjetivas |
| Antifragility | Sistema melhora com feedback | Versionar algoritmo |
| Skin in the Game | Custo do erro | Calibrar conservador |
| Falsifiability | Testar hipóteses | Validation set |
| Pareto | 80/20 do valor | Peso maior em 3 features core |
| Regret Minimization | Equilíbrio complexidade | Simples + extensível |
| Survivorship Bias | Testar negativos | Comparar com livros ruins |

### Sistema de Scoring

```yaml
scoring:
  QUALITY: # 40 pts
    - has_framework: 15 pts
    - has_exercise: 15 pts  
    - has_critique: 10 pts

  COMPLETENESS: # 30 pts
    - structure_adequate: 15 pts
    - size_adequate: 10 pts
    - has_stories: 5 pts

  HYGIENE: # Pass/Fail
    - chars >= 3000
    - chapters >= 3
    - no_ai_artifacts
    - no_placeholder_content

grades:
  "A+": score >= 95 AND curator_approved  # IMPORTANTE: 95, não 85
  "A": score >= 90
  "B": score >= 80
  "C": score >= 70
  "D": score < 70
```

## 2. ESPECIFICAÇÕES DE DIAGRAMAÇÃO

### Hierarquia de Fontes

| Elemento | Fonte | Tamanho | Estilo | Alinhamento |
|----------|-------|---------|--------|-------------|
| Título Capítulo | Helsinki Medium | 44 | CAIXA ALTA | Direita |
| Subtítulo Capítulo | Lorimer No 2 Light | 18 | CAIXA ALTA | Direita |
| Subtítulo 1 (texto) | Lorimer No 2 | 13.5 | CAIXA ALTA | - |
| Subtítulo 2 (texto) | Lorimer No 2 | 11 | Normal | - |
| Texto Corrido | Adobe Garamond Pro Book | 11 | Justificado | - |

### Texto Corrido - Detalhes
- Recuo: Esquerda e Direita: 0 cm
- Espaçamento: Antes 5.65pt / Depois 5.65pt
- Entrelinhas: Exatamente 15 PT

### Sumário
| Elemento | Fonte | Tamanho |
|----------|-------|---------|
| Prefácio/Agradecimento/Introdução | Lorimer No 2 | 11 |
| Numeração capítulo | Helsinki | 45 |
| Título capítulo | Lorimer No 2 | 10 |
| Número página | Lorimer No 2 | 12 |

### Estrutura do Livro
1. Folha de rosto
2. Ficha técnica/Copyright
3. Sumário
4. Prefácio
5. Agradecimentos
6. Introdução
7. Capítulos (número + título + subtítulo)

## 3. AGENTES SELECIONADOS (10)

| Agente | Função | Origem |
|--------|--------|--------|
| Editor-Chefe | Revisão editorial, consistência, qualidade | Livro 1000 Dias |
| Arquiteto de Conteúdo | Estrutura, organização, fluxo | Livro 1000 Dias |
| Narrador Especialista | Storytelling, narrativas, metáforas | Livro 1000 Dias |
| Pesquisador de Segurança | Dados, cases, validação técnica | Livro 1000 Dias |
| Especialista em Metodologia | Ferramentas, acionabilidade | Livro 1000 Dias |
| Revisor de Estilo | Português, gramática, fluência | Livro 1000 Dias |
| Advogado do Leitor | Clareza, relevância, público-alvo | Livro 1000 Dias |
| Coach de Escrita | Produtividade, bloqueios, metas | Livro 1000 Dias |
| Marketing Editorial | Pitch, sinopse, divulgação | Livro 1000 Dias |
| Auditor de Qualidade | Verificar implementação das correções | Livro 1000 Dias |

## 4. SKILLS SELECIONADAS (6)

| Skill | Função |
|-------|--------|
| book-formatter | Formatação profissional Word |
| docx | Criação/edição documentos Word |
| pdf | Geração/manipulação PDF |
| pptx | Geração PowerPoint |
| xlsx | Geração Excel |
| canvas-design | Design canvas visuais |

## 5. NOVOS AGENTES A CRIAR

### Quality Guard (Eliminar Vícios de IA)

```yaml
nome: quality-guard
função: Garantir que texto não pareça escrito por IA

regras_pontuacao:
  eliminar:
    - travessão (—)
    - dois pontos (:) excessivos
    - ponto e vírgula (;)
    - frases curtíssimas com ponto final

  substituir_por:
    - vírgula
    - reestruturação de frase
    - união de frases curtas

vicios_ia_detectar:
  - frases genéricas vazias
  - repetição de padrões estruturais
  - tom excessivamente formal
  - transições previsíveis ("Além disso", "Portanto")
  - listas onde deveria haver prosa
  - explicações óbvias/redundantes
```

### Research Agent (Pesquisa de Referências)

```yaml
nome: research-agent
função: Buscar e validar referências

funcionalidades:
  - Buscar artigos acadêmicos/científicos
  - Encontrar citações de autores relevantes
  - Validar dados e estatísticas
  - Localizar estudos de caso
  - Verificar fontes primárias
  - Formatar referências (ABNT, APA)

integracoes:
  - Perplexity
  - Google Scholar
  - Semantic Scholar
  - CrossRef
```

## 6. ESTILO DE ESCRITA - ANDREZA ARAÚJO

### Características Principais
- **Tom**: Pessoal, reflexivo, humanizado
- **Voz**: Primeira pessoa ("eu costumo dizer")
- **Conexão**: Fala diretamente com o leitor

### Técnicas Narrativas
1. **Metáforas elaboradas** - "atravessar um deserto", "oásis"
2. **Storytelling histórico** - Chernobyl, Frank Bird
3. **Perguntas retóricas** - "O que os faz desviarem?"
4. **Epígrafes autorais** - Citações próprias em destaque

### Estrutura de Texto
- Parágrafos desenvolvidos (nunca frases soltas)
- Frases longas e articuladas conectadas por vírgulas
- Fluxo lógico (uma ideia leva à outra)
- Dados + humanização (estatísticas com contexto humano)

### Pontuação Preferida
| Usa | Evita |
|-----|-------|
| Vírgulas (muitas) | Frases curtas isoladas |
| Parênteses explicativos | Travessões excessivos |
| Dois pontos (moderado) | Ponto e vírgula |

### Fundamentação
- Dados estatísticos com fonte
- Referências acadêmicas (Kahneman, Tversky, Bird)
- Estudos de caso
- Experiência pessoal ("17 anos, 15 mil líderes, 25 países")

## 7. ARQUITETURA EXPANDIDA v2.0

### Estrutura do Projeto

```
Mestre do Livro/
├── .claude/
│   ├── commands/
│   │   └── livro/           # 10 agentes de livro
│   ├── skills/
│   │   ├── book-formatter/
│   │   ├── docx/
│   │   ├── pdf/
│   │   ├── quality-guard/   # NOVO
│   │   └── research/        # NOVO
│   ├── hooks/
│   └── settings.json
├── .bmad/
├── Docs/
│   ├── Modelo de Diagramação/
│   ├── Estilo de Escrita Andreza Araujo/
│   ├── Livros/
│   └── Referencias/
├── knowledge_base/
│   ├── conceitos/
│   ├── personagens/
│   ├── dados/
│   ├── citacoes/
│   ├── glossario.md
│   └── linha-tempo.md
├── thoughts/
│   ├── task_plan.md
│   ├── findings.md
│   └── progress.md
└── CLAUDE.md
```

### Metodologia Snowflake Adaptada

```
Passo 1: Frase-semente (1 linha)
Passo 2: Parágrafo expandido (5 frases)
Passo 3: Resumo de cada capítulo (1 parágrafo)
Passo 4: Sinopse completa (1-2 páginas)
Passo 5: Outline detalhado (cenas/seções)
Passo 6: Primeiro rascunho
```

### Sistema de Conhecimento/Memória

```yaml
knowledge_base/:
  conceitos/      # Definições e termos-chave
  personagens/    # Pessoas citadas, casos
  dados/          # Estatísticas e fontes
  citacoes/       # Banco de citações validadas
  glossario.md    # Termos técnicos
  linha-tempo.md  # Cronologia

funcionalidade:
  - Antes de escrever: consulta knowledge_base
  - Durante escrita: verifica termos já definidos
  - Após escrita: atualiza base com novos conceitos
```

### Análise Avançada de Texto

```yaml
analises:
  legibilidade:
    - Flesch-Kincaid
    - Gunning Fog Index
    - Tamanho médio de frases
    
  ritmo_pacing:
    - Variação de parágrafos
    - Pontos de tensão/relaxamento
    - Distribuição de metáforas
    
  repeticoes:
    - Palavras repetidas (raio 100 palavras)
    - Estruturas frasais repetidas
    - Conectivos sobreusados
    
  consistencia:
    - Termos vs. glossário
    - Dados vs. base de conhecimento
    - Contradições internas
    
  estilo_andreza:
    - % frases longas vs curtas
    - Uso de metáforas
    - Perguntas retóricas
    - Conexão emocional
```

### Pipeline Completo

```
FASE 1: CONCEPÇÃO [Automático]
├── Input: Tema do livro
├── Agentes: Coach + Arquiteto
├── Output: Estrutura Snowflake
└── Checkpoint: Aprovação humana

FASE 2: PESQUISA [Automático]
├── Input: Outline aprovado
├── Agentes: Pesquisador + Research Agent
├── Output: Knowledge base populada
└── Checkpoint: Revisão de fontes

FASE 3: RASCUNHO [Semi-automático]
├── Input: Outline + Knowledge base
├── Agentes: Narrador + Metodologia
├── Output: Primeiro rascunho por capítulo
├── Análise: Estilo Andreza + Legibilidade
└── Checkpoint: Aprovação por capítulo

FASE 4: REFINAMENTO [Automático - Sequência Obrigatória]
├── ORDEM FIXA (não pode ser alterada):
│   ├── Etapa 1: Quality Guard (vícios IA)
│   ├── Etapa 2: Revisor Estilo (português)
│   └── Etapa 3: Advogado Leitor (clareza)
├── Regra: Cada agente só vê output do anterior
├── Análise: Repetições + Consistência
└── Checkpoint: Aprovação do refinamento

FASE 5: VALIDAÇÃO [Automático]
├── Input: Texto refinado
├── Agentes: Editor + Auditor + 12 Frameworks
├── Output: Score + Relatório de qualidade
└── Checkpoint: Score >= 95 para prosseguir  # IMPORTANTE

FASE 6: PUBLICAÇÃO [Automático]
├── Input: Texto validado
├── Skills: book-formatter + docx + pdf
├── Output: Arquivos finais formatados
└── Checkpoint: Revisão visual

LOOP DE ITERAÇÃO:
Se Score < 95 ou Checkpoint reprovado:
→ Identifica problemas
→ Retorna à fase apropriada
→ Máximo 3 iterações por fase
→ Escala para revisão humana se persistir
```

### Componentes Técnicos

| Componente | Tecnologia | Função |
|------------|------------|--------|
| Knowledge Graph | SQLite + JSON | Armazenar conceitos e relações |
| Text Analyzer | Python (textstat, spacy) | Métricas de legibilidade |
| Consistency Checker | Embeddings + Vector DB | Detectar contradições |
| Style Matcher | Fine-tuned model | Comparar com estilo Andreza |
| Pipeline Orchestrator | Planning with Files | Coordenar fases |

---

## 8. RELATÓRIO FINAL DO AUTOR

### Propósito
Gerar um relatório executivo completo para o autor visualizar o que é o livro antes da publicação final.

### Momento de Geração
- **Quando**: Após FASE 5 (Validação) aprovada, antes de gerar arquivos finais
- **Formato**: Markdown → convertido para DOCX/PDF
- **Responsável**: Skill `report-generator` (novo)

### Estrutura do Relatório

```yaml
relatorio_final:

  1_resumo_executivo:
    - titulo_livro: "Título completo"
    - premissa: "Frase-semente do Snowflake"
    - total_capitulos: N
    - total_paginas: N (vs. meta de N)
    - total_palavras: ~N
    - score_qualidade: "A+ (96/100)"
    - data_finalizacao: "DD/MM/AAAA"

  2_sinopse_completa:
    - sinopse: "1-2 parágrafos descrevendo o livro"
    - publico_alvo: "Descrição do leitor ideal"
    - proposta_valor: "O que o leitor ganha ao ler"
    - diferenciais: "O que torna este livro único"

  3_resumo_por_capitulo:
    formato_por_capitulo:
      - numero: "Capítulo N"
      - titulo: "Título do capítulo"
      - subtitulo: "Subtítulo (se houver)"
      - resumo: "3-5 linhas descrevendo o conteúdo"
      - paginas: "N páginas (de X a Y)"
      - conceitos_chave: ["conceito1", "conceito2", "conceito3"]
      - citacoes_usadas: N

  4_metricas_qualidade:
    score_total: "96/100"
    breakdown:
      QUALITY: "38/40"
        - has_framework: "15/15"
        - has_exercise: "15/15"
        - has_critique: "8/10"
      COMPLETENESS: "28/30"
        - structure_adequate: "15/15"
        - size_adequate: "8/10"
        - has_stories: "5/5"
      HYGIENE: "PASS"
        - chars_minimos: "✓ (324.500 chars)"
        - capitulos_minimos: "✓ (14 capítulos)"
        - sem_artefatos_ia: "✓"
        - sem_placeholders: "✓"
    frameworks_aplicados:
      - first_principles: "✓ Aprovado"
      - second_order_thinking: "✓ Aprovado"
      - # ... todos os 12

  5_analise_estilo:
    aderencia_andreza: "87%"
    metricas:
      - indice_flesch_kincaid: "62 (Fácil de ler)"
      - indice_gunning_fog: "10 (Ensino médio)"
      - tamanho_medio_frases: "22 palavras"
      - frases_longas_pct: "45%"
      - frases_curtas_pct: "12%"
    elementos_narrativos:
      - metaforas_usadas: 47
      - perguntas_retoricas: 23
      - historias_casos: 18
      - dados_estatisticos: 34
    pontuacao:
      - virgulas: "Principal (correto)"
      - travessoes: "0 (eliminados)"
      - ponto_virgula: "2 (mínimo)"

  6_paginacao:
    meta_total: 199
    realizado_total: 203
    diferenca: "+4 páginas"
    distribuicao_capitulos:
      - capitulo_1: "14 pág (meta: 13) ⚠️"
      - capitulo_2: "12 pág (meta: 13) ✓"
      - # ... todos os capítulos
    alertas:
      - "Capítulo 1 está 1 página acima da meta"
      - "Capítulo 8 está 2 páginas abaixo da meta"

  7_knowledge_base_utilizada:
    estatisticas:
      - total_conceitos: 89
      - total_citacoes: 156
      - total_dados: 34
      - total_casos: 18
    principais_autores:
      - "Daniel Kahneman (12 citações)"
      - "Frank Bird (8 citações)"
      - "James Reason (6 citações)"
    areas_cobertas:
      - "Segurança comportamental: 45%"
      - "Liderança: 30%"
      - "Cultura organizacional: 25%"

  8_historico_iteracoes:
    total_ciclos: 2
    detalhamento:
      ciclo_1:
        fase_retorno: "FASE 4"
        motivo: "Score QUALITY 89 (< 95)"
        correcoes: ["Adicionado exercício cap. 7", "Expandida crítica cap. 12"]
        score_antes: 89
        score_depois: 94
      ciclo_2:
        fase_retorno: "FASE 4"
        motivo: "Score COMPLETENESS 88 (< 95)"
        correcoes: ["Expandido cap. 3 (+2 páginas)", "Adicionada história cap. 9"]
        score_antes: 94
        score_depois: 96
    tempo_total_refinamento: "3 ciclos em 2 iterações"
```

### Geração Automática

O relatório será gerado automaticamente pela skill `report-generator`:
1. Coleta dados de todas as fases anteriores
2. Consolida métricas do Auditor
3. Extrai resumos via Narrador
4. Calcula estatísticas de paginação
5. Gera Markdown formatado
6. Converte para DOCX/PDF

---

## 9. MÉTRICAS DE PAGINAÇÃO

### Métricas de Página (CORRIGIDO)
| Métrica | Valor |
|---------|-------|
| **Caracteres por página (sem título)** | ~3.300 (com espaços) |
| **Palavras por página (estimado)** | ~550 |

### NOVO AGENTE: Page Controller (Controlador de Paginação)

```yaml
nome: page-controller
função: Garantir quantidade correta de páginas total e por capítulo

metricas:
  caracteres_por_pagina: 3300  # COM espaços, página sem título
  palavras_por_pagina: 550     # estimado

controles:
  - Total de páginas do livro (meta definida pelo autor)
  - Páginas por capítulo (mínimo/máximo)
  - Balanceamento entre capítulos
  - Alertas quando capítulo muito curto/longo

calculos:
  paginas_capitulo: caracteres_capitulo / 3300
  paginas_livro: soma(paginas_capitulos) + paginas_extras

paginas_extras:
  folha_rosto: 2
  ficha_tecnica: 1
  sumario: 2
  prefacio: ~4
  agradecimentos: ~2
  introducao: ~6
  total_extras: ~17

meta_capitulo:
  paginas_por_capitulo: 13  # MÉDIA DEFINIDA PELO USUÁRIO
  caracteres_por_capitulo: 42900  # 13 x 3300
  palavras_por_capitulo: ~7150  # estimado

exemplo:
  livro_com_14_capitulos:
    paginas_capitulos: 182  # 14 x 13
    paginas_extras: ~17
    total: ~199 paginas
```

## Other Notes

### Autora
- **Nome**: Andreza Araújo
- **Experiência**: 17 anos, 15 mil líderes treinados, 25 países
- **Livros anteriores**: "Muito Além do Zero", livro sobre Cultura de Segurança
- **Filosofia**: "Segurança precisa ser ressignificada como Cuidado"

### Arquivos de Referência Importantes
- Modelo PDF: `/Docs/Modelo de Diagramação/Miolo_MAZ_V4.pdf`
- Modelo Word: `/Docs/Modelo de Diagramação/Muito_Alem_do_Zero.docx`
- Estilo escrita: `/Docs/Estilo de Escrita Andreza Araujo/Livro-miolo-CS-mod.2.docx`
- Projeto referência: `/Livro - 1000 Dias/` (agentes, skills, bmad)
- Script docx existente: `/Especialista em Cursos/.../gerar-todos-docx.js`

---

## 10. MATRIZ DE RESPONSABILIDADE (RACI)

Define quem faz o quê em cada fase para evitar confusão entre agentes.

**Legenda:**
- **R** = Responsible (Executa)
- **A** = Accountable (Aprova/Decide)
- **C** = Consulted (Opinião solicitada)
- **I** = Informed (Notificado)

### FASE 1: CONCEPÇÃO

| Agente | Papel | Responsabilidade |
|--------|-------|------------------|
| Coach de Escrita | **R** | Conduz sessão Snowflake |
| Arquiteto de Conteúdo | **A** | Aprova estrutura final |
| Marketing Editorial | **C** | Valida apelo comercial |
| Outros | **I** | Informados do outline |

### FASE 2: PESQUISA

| Agente | Papel | Responsabilidade |
|--------|-------|------------------|
| Research Agent | **R** | Busca referências |
| Pesquisador de Segurança | **A** | Valida qualidade das fontes |
| Narrador Especialista | **C** | Indica gaps narrativos |
| Outros | **I** | - |

### FASE 3: RASCUNHO

| Agente | Papel | Responsabilidade |
|--------|-------|------------------|
| Narrador Especialista | **R** | Escreve o texto |
| Esp. em Metodologia | **C** | Sugere ferramentas/exercícios |
| Arquiteto de Conteúdo | **A** | Valida estrutura |
| Page Controller | **C** | Monitora paginação |

### FASE 4: REFINAMENTO (Sequência Obrigatória)

```
ETAPA 1 → ETAPA 2 → ETAPA 3 (sem loops internos)
```

| Etapa | Agente | Papel | Foco |
|-------|--------|-------|------|
| 1 | Quality Guard | **R** | Remover vícios de IA |
| 2 | Revisor de Estilo | **R** | Português e fluência |
| 3 | Advogado do Leitor | **R** | Clareza e relevância |

**Regra:** Cada agente só recebe output do anterior. Sem retroalimentação.

### FASE 5: VALIDAÇÃO

| Agente | Papel | Responsabilidade |
|--------|-------|------------------|
| Auditor de Qualidade | **R** | Executa validação + score |
| Editor-Chefe | **A** | Decisão final (pode vetar) |
| Todos os anteriores | **I** | Recebem relatório |

**Regra:** Editor-Chefe pode VETAR score do Auditor, mas deve justificar por escrito.

### FASE 6: PUBLICAÇÃO

| Agente/Skill | Papel | Responsabilidade |
|--------------|-------|------------------|
| book-formatter | **R** | Gera arquivos finais |
| Page Controller | **C** | Verifica paginação |
| report-generator | **R** | Gera relatório final |
| Marketing Editorial | **I** | Prepara materiais |
| Autor (humano) | **A** | Aprovação visual final |

---

## 11. ESTADOS DO CAPÍTULO

Define estados claros para rastrear progresso de cada capítulo.

### Diagrama de Estados

```
┌─────────┐    quality_guard    ┌─────────┐
│  DRAFT  │ ─────────────────▶  │ CLEANED │
└─────────┘                     └─────────┘
     ▲                               │
     │                       revisor_estilo
     │                               ▼
     │                         ┌──────────┐
     │    (se score < 95)      │  STYLED  │
     │    max 3 retornos       └──────────┘
     │                               │
     │                       advogado_leitor
     │                               ▼
     │                        ┌───────────┐
     └─────────────────────── │ VALIDATED │
                              └───────────┘
                                    │
                               auditor
                                    ▼
                              ┌────────┐
              ┌───────────────│ SCORED │
              │               └────────┘
              │                    │
        (score < 95)        editor_chefe
              │              (score >= 95)
              │                    ▼
              │              ┌──────────┐
              ▼              │ APPROVED │
         volta p/            └──────────┘
          DRAFT                    │
                              formatter
                                   ▼
                            ┌───────────┐
                            │ FORMATTED │
                            └───────────┘
```

### Definição dos Estados

```yaml
estados:
  DRAFT:
    descricao: "Rascunho inicial criado pelo Narrador"
    responsavel: "narrador_especialista"
    saida: "capitulo_N_draft.md"

  CLEANED:
    descricao: "Texto livre de vícios de IA"
    responsavel: "quality_guard"
    saida: "capitulo_N_cleaned.md"
    validacoes:
      - zero_travessoes
      - zero_ponto_virgula_excessivo
      - frases_naturais

  STYLED:
    descricao: "Texto com português correto e fluido"
    responsavel: "revisor_estilo"
    saida: "capitulo_N_styled.md"
    validacoes:
      - gramatica_correta
      - concordancia_ok
      - fluencia_natural

  VALIDATED:
    descricao: "Texto validado para clareza e relevância"
    responsavel: "advogado_leitor"
    saida: "capitulo_N_validated.md"
    validacoes:
      - clareza_para_publico_alvo
      - relevancia_conteudo
      - sem_jargoes_inexplicados

  SCORED:
    descricao: "Texto com score de qualidade atribuído"
    responsavel: "auditor_qualidade"
    saida: "capitulo_N_scored.md + score.json"
    contem:
      - score_total
      - breakdown_por_categoria
      - sugestoes_melhoria

  APPROVED:
    descricao: "Score >= 95 e aprovado pelo Editor-Chefe"
    responsavel: "editor_chefe"
    saida: "capitulo_N_approved.md"
    requisitos:
      - score >= 95
      - sem_veto_editor

  FORMATTED:
    descricao: "Capítulo formatado para publicação"
    responsavel: "book_formatter"
    saida: "capitulo_N.docx + capitulo_N.pdf"
```

### Transições Permitidas

```yaml
transicoes:
  DRAFT_to_CLEANED:
    agente: "quality_guard"
    automatico: true

  CLEANED_to_STYLED:
    agente: "revisor_estilo"
    automatico: true

  STYLED_to_VALIDATED:
    agente: "advogado_leitor"
    automatico: true

  VALIDATED_to_SCORED:
    agente: "auditor_qualidade"
    automatico: true

  SCORED_to_APPROVED:
    agente: "editor_chefe"
    condicao: "score >= 95 AND !veto"
    automatico: false  # Requer decisão

  SCORED_to_DRAFT:
    agente: "orchestrator"
    condicao: "score < 95 AND iteracoes < 3"
    automatico: true
    acao: "Identificar motivo e retornar para correção"

  APPROVED_to_FORMATTED:
    agente: "book_formatter"
    automatico: true
```

---

## 12. CONTROLE DE ITERAÇÕES

Evita loops infinitos e garante escalonamento humano quando necessário.

### Limites

```yaml
limites_iteracao:
  max_global_por_capitulo: 3
  max_por_motivo: 2
  escalonamento_humano_apos: 2 falhas mesmo motivo
```

### Tracking por Motivo

```yaml
tracking:
  capitulo_1:
    iteracao_atual: 0
    motivos_falha:
      score_quality: 0      # max 2
      score_completeness: 0 # max 2
      score_hygiene: 0      # max 2
      veto_editor: 0        # max 1
    historico: []

  capitulo_2:
    # ...
```

### Regras de Escalonamento

```yaml
escalonamento:

  regra_1:
    condicao: "mesmo motivo falhou 2x"
    acao: "PARAR e pedir input humano"
    mensagem: |
      ⚠️ Capítulo {N} falhou 2x pelo motivo: {motivo}

      Tentativas anteriores:
      1. {acao_tentativa_1} → {resultado_1}
      2. {acao_tentativa_2} → {resultado_2}

      Opções sugeridas:
      A) {sugestao_a}
      B) {sugestao_b}
      C) Aceitar score atual ({score})

      Qual opção seguir?

  regra_2:
    condicao: "3 iterações globais atingidas"
    acao: "PARAR e apresentar relatório"
    mensagem: |
      ⚠️ Capítulo {N} atingiu limite de 3 iterações.

      Score atual: {score}/100 (meta: 95)
      Gaps identificados:
      - {gap_1}
      - {gap_2}

      Decisão necessária:
      A) Forçar aprovação com score atual
      B) Reescrever capítulo do zero
      C) Remover capítulo do livro

      Qual opção seguir?

  regra_3:
    condicao: "veto do Editor-Chefe"
    acao: "PARAR imediatamente"
    mensagem: |
      ❌ Editor-Chefe vetou o capítulo {N}.

      Justificativa: {justificativa}

      Este veto requer revisão humana obrigatória.
```

### Logging de Iterações

```yaml
log_formato:
  timestamp: "2026-01-10T15:30:00"
  capitulo: 7
  iteracao: 2
  fase_origem: "SCORED"
  fase_destino: "DRAFT"
  motivo: "score_quality"
  score_antes: 89
  gaps:
    - "Falta exercício prático"
    - "Crítica superficial"
  acoes_planejadas:
    - "Adicionar exercício na seção 7.3"
    - "Expandir crítica na seção 7.5"
```

---

## 13. CHECKLIST DE IMPLEMENTAÇÃO ATUALIZADO

### Prioridade Alta
1. [ ] Criar estrutura de pastas do projeto
2. [ ] Copiar os 10 agentes de `/Livro - 1000 Dias/.claude/commands/livro/`
3. [ ] Copiar as 6 skills de `/Livro - 1000 Dias/.claude/skills/`
4. [ ] Instalar Planning with Files plugin
5. [ ] Criar CLAUDE.md com instruções do projeto

### Prioridade Média
6. [ ] Criar skill quality-guard (eliminar vícios de IA)
7. [ ] Criar skill research (pesquisa de referências)
8. [ ] **NOVO:** Criar skill report-generator (relatório final)
9. [ ] Adaptar book-formatter para fontes específicas
10. [ ] Criar estrutura knowledge_base/
11. [ ] **NOVO:** Implementar sistema de estados do capítulo
12. [ ] **NOVO:** Implementar controle de iterações com logging

### Prioridade Baixa
13. [ ] Implementar Text Analyzer (legibilidade, repetições)
14. [ ] Implementar Consistency Checker
15. [ ] Implementar Style Matcher para estilo Andreza
16. [ ] Configurar pipeline completo com checkpoints
17. [ ] **NOVO:** Criar Page Controller agent
