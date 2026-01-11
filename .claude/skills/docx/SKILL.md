---
name: docx
description: "Criação, edição e análise de documentos Word (.docx). Use para: (1) Criar novos documentos, (2) Modificar conteúdo existente, (3) Trabalhar com tracked changes, (4) Adicionar comentários, (5) Extrair texto"
---

# DOCX - Criação e Edição de Documentos

## Overview

Documentos .docx são arquivos ZIP contendo XML. Você tem diferentes ferramentas para diferentes tarefas.

## Workflow por Tarefa

### Ler/Analisar Conteúdo
Use extração de texto ou acesso XML raw.

### Criar Novo Documento
Use biblioteca docx-js (JavaScript).

### Editar Documento Existente
Use python-docx ou OOXML direto.

## Leitura de Conteúdo

### Extração de Texto

```bash
# Converter para markdown
pandoc path-to-file.docx -o output.md

# Com tracked changes
pandoc --track-changes=all path-to-file.docx -o output.md
```

### Acesso XML Raw

Para comentários, formatação complexa, metadados:

```bash
# Descompactar
unzip document.docx -d unpacked/

# Arquivos principais
# word/document.xml - Conteúdo principal
# word/comments.xml - Comentários
# word/media/ - Imagens
```

## Criar Novo Documento

### Com docx-js (JavaScript)

```javascript
const { Document, Paragraph, TextRun, Packer } = require('docx');

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "Título", bold: true, size: 48 }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun("Texto do parágrafo."),
        ],
      }),
    ],
  }],
});

// Exportar
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("output.docx", buffer);
```

### Com python-docx (Python)

```python
from docx import Document
from docx.shared import Pt, Inches

doc = Document()

# Adicionar título
doc.add_heading('Título do Documento', 0)

# Adicionar parágrafo
para = doc.add_paragraph('Texto do parágrafo.')
para.style.font.size = Pt(11)

# Salvar
doc.save('output.docx')
```

## Editar Documento Existente

```python
from docx import Document

# Carregar documento
doc = Document('existing.docx')

# Modificar
for para in doc.paragraphs:
    if 'termo antigo' in para.text:
        para.text = para.text.replace('termo antigo', 'termo novo')

# Salvar
doc.save('modified.docx')
```

## Formatação Comum

### Estilos de Texto

```python
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

run = para.add_run('Texto')
run.bold = True
run.italic = True
run.font.size = Pt(11)
run.font.name = 'Adobe Garamond Pro'
run.font.color.rgb = RGBColor(0, 0, 0)

para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
```

### Espaçamento

```python
from docx.shared import Pt

para_format = para.paragraph_format
para_format.space_before = Pt(5.65)
para_format.space_after = Pt(5.65)
para_format.line_spacing = Pt(15)
```

## Conversão para Imagem

```bash
# DOCX para PDF
soffice --headless --convert-to pdf document.docx

# PDF para imagens
pdftoppm -jpeg -r 150 document.pdf page
```

## Dependências

- pandoc (extração de texto)
- docx (npm) - criação JavaScript
- python-docx (pip) - criação/edição Python
- LibreOffice (conversão PDF)
