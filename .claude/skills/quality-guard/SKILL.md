---
name: quality-guard
description: "Eliminar vícios de escrita de IA do texto. Use para: (1) Remover pontuação artificial, (2) Eliminar transições clichê, (3) Humanizar listas em prosa, (4) Variar estruturas repetitivas."
---

# Quality Guard - Eliminador de Vícios de IA

Detecta e elimina padrões que denunciam texto gerado por IA.

## Quando Usar

- Após rascunho inicial (Fase 4, Etapa 1)
- Antes da revisão de estilo
- Quando texto "soa artificial"

## Vícios a Eliminar

### 1. Pontuação Artificial

| Eliminar | Substituir por |
|----------|----------------|
| Travessão (—) | Vírgula ou reestruturação |
| Dois pontos excessivos | Ponto + nova frase |
| Ponto e vírgula | Vírgula ou ponto |
| Frases curtíssimas | União de frases |

**Exemplo**:
```
❌ "A liderança é fundamental. Ela transforma equipes. Gera resultados."
✅ "A liderança é fundamental porque transforma equipes e gera resultados."
```

### 2. Transições Clichê

| Eliminar | Alternativa |
|----------|-------------|
| "Além disso" | Conectar diretamente |
| "Portanto" | Reorganizar lógica |
| "No entanto" | "mas" ou reestruturar |
| "Em resumo" | Eliminar ou integrar |
| "É importante ressaltar" | Ir direto ao ponto |
| "Vale destacar que" | Eliminar |
| "Nesse sentido" | Eliminar |

### 3. Estruturas Artificiais

| Padrão IA | Versão Humana |
|-----------|---------------|
| Lista de 3 itens perfeitos | Prosa desenvolvida |
| "Primeiro... Segundo... Terceiro..." | Fluxo narrativo |
| Parágrafos de tamanho igual | Variação natural |
| Frases começando igual | Diversificar aberturas |

### 4. Frases Genéricas

```
❌ "É fundamental compreender a importância de..."
❌ "Nesse contexto, torna-se relevante observar que..."
❌ "Diante do exposto, podemos concluir que..."
❌ "Cabe ressaltar que..."

✅ Ir direto ao conteúdo específico
```

## Workflow

### 1. Varredura Automática

```python
vicios = {
    'travessao': r'—',
    'dois_pontos_excessivo': r':\s',  # contar frequência
    'transicoes': r'(Além disso|Portanto|No entanto|Em resumo)',
    'frases_curtas': r'\.\s+\w+\s+\w+\.',  # menos de 5 palavras
}
```

### 2. Análise de Padrões

Para cada parágrafo:
- Contar pontuação
- Identificar transições
- Medir tamanho de frases
- Verificar aberturas repetidas

### 3. Correção

Para cada vício encontrado:
1. Identificar localização
2. Propor correção específica
3. Preservar significado original
4. Manter voz do autor

## Checklist de Varredura

```markdown
- [ ] Zero travessões (—)
- [ ] Dois pontos: máximo 2 por página
- [ ] Ponto e vírgula: máximo 1 por página
- [ ] Zero frases com menos de 8 palavras isoladas
- [ ] Zero transições clichê
- [ ] Variação de tamanho de parágrafos (±30%)
- [ ] Variação de aberturas de frase
- [ ] Listas convertidas em prosa (quando >3 itens)
```

## Relatório de Saída

```markdown
# RELATÓRIO QUALITY GUARD

**Texto:** [Nome do capítulo]
**Data:** [Data]

## Vícios Encontrados: [N total]

| Tipo | Qtd | Localizações |
|------|-----|--------------|
| Travessões | X | Par. 3, 7, 12 |
| Transições clichê | X | Par. 1, 5, 9 |
| Frases curtas | X | Par. 2, 4 |
| Dois pontos | X | Par. 6, 8 |

## Correções Aplicadas

### Parágrafo 3
**Antes:** "A segurança é essencial — ela protege vidas."
**Depois:** "A segurança é essencial, pois protege vidas."

### Parágrafo 5
**Antes:** "Além disso, devemos considerar..."
**Depois:** "Devemos também considerar..."

## Status: CLEANED
**Vícios restantes:** 0
```

## Teste do Ouvido

Leia em voz alta. Se soa como:
- Apresentação de PowerPoint → Muito listado
- Artigo acadêmico → Muito formal
- Manual de instruções → Muito genérico
- **Conversa natural → ✅ Correto**

## Integração no Pipeline

```
Fase 4: Refinamento
├── Etapa 1: Quality Guard ← VOCÊ ESTÁ AQUI
├── Etapa 2: Revisor de Estilo
└── Etapa 3: Advogado do Leitor
```

O texto só passa para Etapa 2 quando:
- Vícios encontrados = 0
- Status = CLEANED
