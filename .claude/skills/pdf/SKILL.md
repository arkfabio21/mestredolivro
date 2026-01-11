---
name: pdf
description: "Manipulação de PDFs: extração de texto/tabelas, criação, merge/split, formulários. Use para processamento programático de documentos PDF."
---

# PDF - Processamento de Documentos

## Quick Start

```python
from pypdf import PdfReader, PdfWriter

# Ler PDF
reader = PdfReader("document.pdf")
print(f"Páginas: {len(reader.pages)}")

# Extrair texto
text = ""
for page in reader.pages:
    text += page.extract_text()
```

## Operações Comuns

### Merge PDFs

```python
from pypdf import PdfWriter, PdfReader

writer = PdfWriter()
for pdf_file in ["doc1.pdf", "doc2.pdf"]:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)

with open("merged.pdf", "wb") as output:
    writer.write(output)
```

### Split PDF

```python
reader = PdfReader("input.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as output:
        writer.write(output)
```

### Extrair Metadados

```python
reader = PdfReader("document.pdf")
meta = reader.metadata
print(f"Título: {meta.title}")
print(f"Autor: {meta.author}")
```

### Rotacionar Páginas

```python
reader = PdfReader("input.pdf")
writer = PdfWriter()

page = reader.pages[0]
page.rotate(90)  # 90 graus
writer.add_page(page)

with open("rotated.pdf", "wb") as output:
    writer.write(output)
```

## Extração de Tabelas (pdfplumber)

```python
import pdfplumber
import pandas as pd

with pdfplumber.open("document.pdf") as pdf:
    all_tables = []
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            if table:
                df = pd.DataFrame(table[1:], columns=table[0])
                all_tables.append(df)

# Combinar
if all_tables:
    combined = pd.concat(all_tables, ignore_index=True)
    combined.to_excel("tables.xlsx", index=False)
```

## Criar PDF (reportlab)

```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

c = canvas.Canvas("output.pdf", pagesize=letter)
width, height = letter

c.drawString(100, height - 100, "Hello World!")
c.line(100, height - 140, 400, height - 140)
c.save()
```

## Linha de Comando

```bash
# Extrair texto
pdftotext input.pdf output.txt

# Preservar layout
pdftotext -layout input.pdf output.txt

# Merge com qpdf
qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf

# Split
qpdf input.pdf --pages . 1-5 -- pages1-5.pdf
```

## OCR (PDFs Escaneados)

```python
import pytesseract
from pdf2image import convert_from_path

images = convert_from_path('scanned.pdf')
text = ""
for image in images:
    text += pytesseract.image_to_string(image)
```

## Adicionar Marca d'Água

```python
watermark = PdfReader("watermark.pdf").pages[0]
reader = PdfReader("document.pdf")
writer = PdfWriter()

for page in reader.pages:
    page.merge_page(watermark)
    writer.add_page(page)

with open("watermarked.pdf", "wb") as output:
    writer.write(output)
```

## Proteção com Senha

```python
writer.encrypt("userpassword", "ownerpassword")
with open("encrypted.pdf", "wb") as output:
    writer.write(output)
```

## Referência Rápida

| Tarefa | Ferramenta |
|--------|------------|
| Merge | pypdf |
| Split | pypdf |
| Extrair texto | pdfplumber |
| Extrair tabelas | pdfplumber |
| Criar PDFs | reportlab |
| Merge (CLI) | qpdf |
| OCR | pytesseract |

## Dependências

- pypdf
- pdfplumber
- reportlab
- pytesseract + pdf2image (para OCR)
- qpdf (CLI)
- poppler-utils (pdftotext)
