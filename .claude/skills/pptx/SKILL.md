---
name: pptx
description: "Criação, edição e análise de apresentações PowerPoint (.pptx). Use para criar apresentações, modificar slides, trabalhar com layouts e adicionar notas."
---

# PPTX - Apresentações PowerPoint

## Overview

Arquivos .pptx são ZIP com XML. Use diferentes ferramentas para diferentes tarefas.

## Leitura de Conteúdo

### Extração de Texto

```bash
python -m markitdown presentation.pptx
```

### Acesso XML Raw

```bash
# Descompactar
unzip presentation.pptx -d unpacked/

# Estrutura principal
# ppt/presentation.xml - Metadados
# ppt/slides/slide1.xml - Slides
# ppt/notesSlides/ - Notas
# ppt/media/ - Imagens
```

## Criar Apresentação (PptxGenJS)

```javascript
const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();

// Slide de título
let slide = pptx.addSlide();
slide.addText('Título da Apresentação', {
  x: 1, y: 2, w: 8, h: 1,
  fontSize: 36, bold: true,
  align: 'center'
});

// Slide com bullets
slide = pptx.addSlide();
slide.addText('Tópicos', { x: 0.5, y: 0.5, fontSize: 24, bold: true });
slide.addText([
  { text: 'Item 1', options: { bullet: true } },
  { text: 'Item 2', options: { bullet: true } },
  { text: 'Item 3', options: { bullet: true } },
], { x: 0.5, y: 1.5, w: 9, h: 3, fontSize: 18 });

// Salvar
pptx.writeFile('output.pptx');
```

## Criar Apresentação (python-pptx)

```python
from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()

# Slide de título
slide_layout = prs.slide_layouts[0]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
subtitle = slide.placeholders[1]

title.text = "Título da Apresentação"
subtitle.text = "Subtítulo"

# Slide com conteúdo
slide_layout = prs.slide_layouts[1]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
body = slide.placeholders[1]

title.text = "Tópicos"
tf = body.text_frame
tf.text = "Item 1"
p = tf.add_paragraph()
p.text = "Item 2"
p = tf.add_paragraph()
p.text = "Item 3"

prs.save('output.pptx')
```

## Editar Apresentação Existente

```python
from pptx import Presentation

prs = Presentation('existing.pptx')

for slide in prs.slides:
    for shape in slide.shapes:
        if shape.has_text_frame:
            for paragraph in shape.text_frame.paragraphs:
                for run in paragraph.runs:
                    if 'texto antigo' in run.text:
                        run.text = run.text.replace('texto antigo', 'texto novo')

prs.save('modified.pptx')
```

## Adicionar Imagem

```python
from pptx.util import Inches

slide = prs.slides.add_slide(prs.slide_layouts[5])  # Blank
slide.shapes.add_picture(
    'image.png',
    Inches(1), Inches(1),
    width=Inches(6)
)
```

## Adicionar Tabela

```python
rows, cols = 3, 4
left = Inches(1)
top = Inches(2)
width = Inches(8)
height = Inches(2)

table = slide.shapes.add_table(rows, cols, left, top, width, height).table

# Preencher
table.cell(0, 0).text = "Header 1"
table.cell(0, 1).text = "Header 2"
table.cell(1, 0).text = "Valor 1"
table.cell(1, 1).text = "Valor 2"
```

## Conversão para Imagens

```bash
# PPTX para PDF
soffice --headless --convert-to pdf presentation.pptx

# PDF para imagens
pdftoppm -jpeg -r 150 presentation.pdf slide
```

## Paletas de Cores Sugeridas

| Nome | Cores |
|------|-------|
| Corporate Blue | #1C2833, #2E4053, #AAB7B8 |
| Warm Blush | #A49393, #EED6D3, #E8B4B8 |
| Forest Green | #40695B, #87A96B, #F4F1DE |
| Bold Red | #C0392B, #E74C3C, #F39C12 |

## Dependências

- pptxgenjs (npm)
- python-pptx (pip)
- markitdown (pip)
- LibreOffice (conversão)
