---
name: book-formatter
description: >
  Formatação profissional de livros em Word (.docx) seguindo padrões editoriais.
  Aplica estilos tipográficos (fontes, tamanhos, espaçamentos, entrelinhas),
  remove linhas divisórias e gera sumário automático. Use quando: (1) formatar
  manuscrito para diagramação, (2) aplicar estilos editoriais padronizados,
  (3) gerar sumário de livro, (4) preparar documento para InDesign.
---

# Book Formatter

Formata documentos Word seguindo padrão editorial profissional.

## Escopo

Esta skill aplica:
- Fontes e tamanhos corretos
- Espaçamentos antes/depois de parágrafos
- Entrelinhas específicas por tipo de texto
- Alinhamentos (justificado, direita)
- Recuos (bullets, primeira linha)
- Hierarquia de estilos
- Sumário automático

**Não aplica** (responsabilidade do diagramador):
- Fundo colorido em páginas
- Numeração de página estilizada
- Drop caps decorativos
- Running headers

## Hierarquia de Fontes

| Elemento | Fonte | Tamanho | Estilo |
|----------|-------|---------|--------|
| Título Capítulo | Helsinki Medium | 44pt | CAIXA ALTA |
| Subtítulo Capítulo | Lorimer No 2 Light | 18pt | CAIXA ALTA |
| Subtítulo 1 | Lorimer No 2 | 13.5pt | CAIXA ALTA |
| Subtítulo 2 | Lorimer No 2 | 11pt | Normal |
| Texto Corrido | Adobe Garamond Pro | 11pt | Justificado |

### Fontes Alternativas (Google Fonts)

| Original | Alternativa |
|----------|-------------|
| Helsinki Medium | Josefin Sans Medium |
| Lorimer No 2 | Josefin Sans Light |
| Adobe Garamond Pro | EB Garamond |

## Espaçamentos

```yaml
texto_corrido:
  recuo_esquerda: 0 cm
  recuo_direita: 0 cm
  espaco_antes: 5.65pt
  espaco_depois: 5.65pt
  entrelinhas: 15pt (exato)
```

## Workflow

### 1. Aplicar estilos

```bash
python3 scripts/apply-book-styles.py input.docx output.docx
```

### 2. Gerar sumário

```bash
python3 scripts/generate-toc.py input.docx output.docx
```

### 3. Revisão visual

Após aplicar estilos, verificar:
- Parágrafos capitulares (primeiro de cada capítulo)
- Quebras de página antes de capítulos
- Variantes de espaçamento conforme necessidade

## Estilos por Elemento

| Elemento | Estilo |
|----------|--------|
| Título do livro | `ID folha de rosto` |
| "Capítulo X" | `label assinatura capitulo` |
| Título do capítulo | `Titulo` |
| Primeiro parágrafo | `Textos capitular` |
| Corpo de texto | `Texto padrão` |
| Lista com bullets | `Textos bullets` |
| Citação | `Frases fim de capítulo` |

## Métricas de Página

| Métrica | Valor |
|---------|-------|
| Caracteres por página | ~3.300 |
| Palavras por página | ~550 |
| Linhas por página | ~30 |

## Dependências

- Python 3.8+
- python-docx
- Fontes instaladas no sistema

## Referência

Ver `Docs/Modelo de Diagramação/` para exemplos visuais.
