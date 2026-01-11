---
name: xlsx
description: "Criação, edição e análise de planilhas Excel (.xlsx). Use para criar planilhas com fórmulas, ler dados, modificar existentes, análise de dados."
---

# XLSX - Planilhas Excel

## Quick Start

```python
import pandas as pd

# Ler Excel
df = pd.read_excel('file.xlsx')
df.head()

# Escrever Excel
df.to_excel('output.xlsx', index=False)
```

## Leitura com Pandas

```python
# Ler primeira aba
df = pd.read_excel('file.xlsx')

# Ler aba específica
df = pd.read_excel('file.xlsx', sheet_name='Dados')

# Ler todas as abas
all_sheets = pd.read_excel('file.xlsx', sheet_name=None)

# Análise básica
df.info()
df.describe()
```

## Criar com Openpyxl

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet = wb.active

# Adicionar dados
sheet['A1'] = 'Nome'
sheet['B1'] = 'Valor'
sheet.append(['Item 1', 100])
sheet.append(['Item 2', 200])

# Fórmula
sheet['B4'] = '=SUM(B2:B3)'

# Formatação
sheet['A1'].font = Font(bold=True)
sheet['A1'].fill = PatternFill('solid', start_color='FFFF00')
sheet['A1'].alignment = Alignment(horizontal='center')

# Largura de coluna
sheet.column_dimensions['A'].width = 20

wb.save('output.xlsx')
```

## Editar Existente

```python
from openpyxl import load_workbook

wb = load_workbook('existing.xlsx')
sheet = wb.active

# Modificar célula
sheet['A1'] = 'Novo Valor'

# Inserir linha
sheet.insert_rows(2)

# Deletar coluna
sheet.delete_cols(3)

# Nova aba
new_sheet = wb.create_sheet('Nova Aba')
new_sheet['A1'] = 'Dados'

wb.save('modified.xlsx')
```

## Fórmulas Importantes

**SEMPRE use fórmulas Excel, não valores calculados em Python.**

```python
# BOM - Excel calcula
sheet['B10'] = '=SUM(B2:B9)'
sheet['C5'] = '=(C4-C2)/C2'
sheet['D20'] = '=AVERAGE(D2:D19)'

# RUIM - valor fixo
total = sum(values)
sheet['B10'] = total  # Não atualiza!
```

## Formatação de Números

```python
# Moeda
sheet['A1'].number_format = 'R$ #,##0.00'

# Porcentagem
sheet['B1'].number_format = '0.0%'

# Data
sheet['C1'].number_format = 'DD/MM/YYYY'

# Negativos entre parênteses
sheet['D1'].number_format = '#,##0;(#,##0);"-"'
```

## Cores por Convenção

| Cor | Uso |
|-----|-----|
| Azul | Inputs editáveis |
| Preto | Fórmulas |
| Verde | Links internos |
| Vermelho | Links externos |
| Amarelo (fundo) | Atenção/revisar |

## Análise com Pandas

```python
import pandas as pd

df = pd.read_excel('data.xlsx')

# Filtrar
filtered = df[df['Valor'] > 100]

# Agrupar
grouped = df.groupby('Categoria').sum()

# Pivot
pivot = df.pivot_table(
    values='Valor',
    index='Mês',
    columns='Produto',
    aggfunc='sum'
)

# Exportar múltiplas abas
with pd.ExcelWriter('output.xlsx') as writer:
    df.to_excel(writer, sheet_name='Dados')
    grouped.to_excel(writer, sheet_name='Resumo')
```

## Gráficos

```python
from openpyxl.chart import BarChart, Reference

chart = BarChart()
data = Reference(sheet, min_col=2, min_row=1, max_row=5)
categories = Reference(sheet, min_col=1, min_row=2, max_row=5)

chart.add_data(data, titles_from_data=True)
chart.set_categories(categories)
chart.title = "Vendas por Mês"

sheet.add_chart(chart, "E1")
```

## Recalcular Fórmulas

```bash
# Após criar/editar arquivo com fórmulas
python recalc.py output.xlsx
```

## Dependências

- pandas
- openpyxl
- LibreOffice (recálculo via script)
