---
date: 2026-01-10T22:27:06-03:00
session_name: mestre-do-livro
researcher: Claude
git_commit: dacb0fc84bf7452e6f5dca144aecff9da7bf835b
branch: main
repository: mestre-do-livro
topic: "Correção de Pipeline de Formatação e Detecção de Vícios de IA"
tags: [formatacao, quality-guard, docx, pipeline, vicios-ia]
status: complete
last_updated: 2026-01-10
last_updated_by: Claude
type: implementation_strategy
root_span_id: ""
turn_span_id: ""
---

# Handoff: Correção de Problemas Críticos no Pipeline de Livros

## Task(s)

### Completadas
1. **Análise completa do projeto** - Identificados todos os bloqueadores críticos
2. **Criação de scripts Python faltantes**:
   - `scripts/apply-book-styles.py` - Aplica estilos editoriais
   - `scripts/generate-toc.py` - Gera sumário automático
   - `scripts/quality-guard.py` - Detecta vícios de escrita de IA
   - `scripts/check-dependencies.py` - Verifica dependências
   - `scripts/install-fonts.sh` - Instala fontes Google
3. **Criação da estrutura knowledge_base/** com templates
4. **Implementação do comando `mdl validar`** - Sistema de scoring completo (não mais stub)
5. **Correção do apply-book-styles.py** para detectar estilos Heading 1/2/3 do pandoc
6. **Adição de detecção de densidade de headings** no quality-guard.py

### Em Progresso
7. **Replicar formato do documento de referência** - Analisado mas não implementado

## Critical References

1. `thoughts/ledgers/CONTINUITY_CLAUDE-mestre-do-livro.md` - Estado atual do projeto
2. `/Users/fabiomarques/Library/CloudStorage/OneDrive.../Livro - 1000 Dias/docs/CAPITULOS/1000-DIAS-VOLUME-I-A-FUNDACAO-FORMATADO-FINAL.docx` - Documento de referência com formato correto
3. `.claude/skills/book-formatter/SKILL.md` - Especificação de estilos

## Recent changes

```
scripts/apply-book-styles.py:89-106 - Adicionada função get_heading_level_from_style()
scripts/apply-book-styles.py:330-366 - Modificado loop para detectar Heading 1/2/3 primeiro
scripts/quality-guard.py:136-158 - Adicionada função _analyze_heading_density()
scripts/quality-guard.py:131-132 - Chamada da análise de densidade
src/commands/validar.js:1-504 - Implementação completa (era stub)
bin/cli.js:61 - Adicionada opção --quality-guard
package.json:5 - Adicionado "type": "module"
```

## Learnings

### Estrutura do Documento de Referência
- Usa estilos **customizados** do Word, não Heading 1/2/3 padrão:
  - `Texto padrão Hypenate` - corpo (3541 ocorrências)
  - `Subtitulos texto` - subtítulos (55)
  - `Textos capitular` - primeiro parágrafo após título (41)
  - `Titulo` - título de capítulo (40)

### Proporção Ideal de Conteúdo
- **Documento de referência**: 20:1 (20 parágrafos de corpo por heading)
- **Nosso capítulo de teste**: 2.4:1 (PROBLEMA - vício de IA)
- **Ideal mínimo**: 5:1

### Problema de Detecção de Estilos
- Pandoc exporta corretamente com estilos `Heading 1`, `Heading 2`, `Heading 3`
- O script original ignorava esses estilos e usava apenas heurísticas de texto
- Solução: Verificar estilo do Word PRIMEIRO, depois usar heurísticas como fallback

### Vício de IA: Muitos Subtítulos, Pouco Conteúdo
- IA tende a criar estrutura de "manual" com muitos subtítulos
- Documento de referência usa fluxo narrativo com subtítulos espaçados
- Quality Guard agora detecta proporção corpo:heading

## Post-Mortem (Required for Artifact Index)

### What Worked
- **Análise com agente Explore**: Identificou rapidamente todos os problemas
- **Scripts Python com python-docx**: Funciona bem para manipulação de DOCX
- **Pandoc para conversão MD→DOCX**: Preserva estrutura de headings corretamente
- **Sistema de scoring**: 12 frameworks funcionando bem para validação

### What Failed
- **Detecção de headings por texto**: Não funciona quando documento já tem estilos
- **generate-toc.py separado**: Cria sumário duplicado, melhor deixar Word gerar
- **Título truncado no Word**: Provavelmente relacionado a como o estilo é aplicado

### Key Decisions
- **Decisão**: Usar fontes Google Fonts (EB Garamond, Josefin Sans) como alternativa
  - Alternativas: Comprar fontes originais (Helsinki, Lorimer, Adobe Garamond)
  - Razão: Fontes gratuitas e disponíveis, resultado visualmente similar

- **Decisão**: Verificar estilo do Word antes de usar heurísticas
  - Alternativas: Apenas heurísticas de texto
  - Razão: Pandoc já aplica estilos corretos, devemos respeitá-los

- **Decisão**: Adicionar detecção de densidade de headings ao Quality Guard
  - Alternativas: Deixar para revisão manual
  - Razão: Automatizar detecção de vício comum de IA

## Artifacts

### Scripts Criados
- `scripts/apply-book-styles.py` - 400+ linhas, formatação DOCX
- `scripts/generate-toc.py` - 300+ linhas, geração de sumário
- `scripts/quality-guard.py` - 450+ linhas, detecção de vícios de IA
- `scripts/check-dependencies.py` - 200+ linhas, verificação de deps
- `scripts/install-fonts.sh` - 80 linhas, instalação de fontes

### Estrutura Criada
- `knowledge_base/conceitos/README.md`
- `knowledge_base/citacoes/README.md`
- `knowledge_base/dados/README.md`
- `knowledge_base/glossario.md`

### Arquivos Atualizados
- `src/commands/validar.js` - Implementação completa
- `bin/cli.js` - Opção --quality-guard
- `package.json` - type: module
- `thoughts/ledgers/CONTINUITY_CLAUDE-mestre-do-livro.md` - Atualizado

### Capítulo de Teste
- `capitulos/rascunhos/capitulo-01-lideranca-consciente.md` - Score 100/100
- `output/capitulo-01-v2.docx` - Versão formatada corrigida

## Action Items & Next Steps

### Prioridade Alta
1. **Criar template DOCX com estilos customizados** baseado no documento de referência
   - Copiar estilos: `Texto padrão Hypenate`, `Subtitulos texto`, `Textos capitular`, `Titulo`
   - Usar como base para formatação

2. **Corrigir problema de título truncado**
   - Verificar se é problema de largura de coluna ou quebra de linha
   - Testar com documento de referência como template

3. **Implementar regra de densidade de headings no pipeline**
   - Mínimo 5 parágrafos de corpo por heading
   - Bloquear publicação se proporção < 5:1

### Prioridade Média
4. **Instalar LibreOffice** para conversão PDF: `brew install --cask libreoffice`
5. **Testar pipeline completo** com livro real
6. **Verificar integração GitHub**: `gh auth status`

### Prioridade Baixa
7. Implementar `mdl gerar capitulo` (conectar ao Narrador)
8. Dashboard de progresso

## Other Notes

### Comandos Úteis
```bash
# Validar capítulo
node bin/cli.js validar capitulos/rascunhos/capitulo-01.md --quality-guard

# Formatar DOCX
python3 scripts/apply-book-styles.py input.docx output.docx --use-google-fonts

# Verificar dependências
python3 scripts/check-dependencies.py

# Quality Guard
python3 scripts/quality-guard.py texto.md --report
```

### Dependências Verificadas
- ✅ python-docx, lxml, pandoc 3.8.3
- ✅ EB Garamond, Josefin Sans (fontes)
- ⚠️ LibreOffice NÃO instalado (conversão PDF indisponível)

### Localização do Documento de Referência
```
/Users/fabiomarques/Library/CloudStorage/OneDrive-BibliotecasCompartilhadas-EscoladaSegurança/redpine - Documentos/Tecnologia da Informação/RedPine/Livro - 1000 Dias/docs/CAPITULOS/
```
