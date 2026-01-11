#!/usr/bin/env python3
"""
apply-book-styles.py - Aplica estilos editoriais profissionais a documentos Word

USAGE:
    python3 scripts/apply-book-styles.py input.docx output.docx [--use-google-fonts]

DESCRIÇÃO:
    Aplica formatação profissional de livros conforme especificação "Mestre do Livro":
    - Fontes: Helsinki, Lorimer No 2, Adobe Garamond Pro (ou alternativas Google Fonts)
    - Espaçamentos: 5.65pt antes/depois, 15pt entrelinhas
    - Estilos: Título, Subtítulo, Texto corrido, Bullets, Citações
    - Remove linhas divisórias (---)
    - Aplica caixa alta onde especificado

FONTES:
    Original           | Alternativa (Google Fonts)
    -------------------|---------------------------
    Helsinki Medium    | Josefin Sans Medium
    Lorimer No 2 Light | Josefin Sans Light
    Adobe Garamond Pro | EB Garamond

DEPENDÊNCIAS:
    pip install python-docx
"""

import argparse
import sys
import re
from pathlib import Path

try:
    from docx import Document
    from docx.shared import Pt, Cm, Twips
    from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
    from docx.enum.style import WD_STYLE_TYPE
    from docx.oxml.ns import qn
    from docx.oxml import OxmlElement
except ImportError:
    print("ERRO: python-docx não instalado.")
    print("Execute: pip install python-docx")
    sys.exit(1)


# =============================================================================
# CONFIGURAÇÃO DE ESTILOS
# =============================================================================

# Fontes originais vs alternativas Google Fonts
FONTS_ORIGINAL = {
    'titulo': 'Helsinki Medium',
    'subtitulo': 'Lorimer No 2 Light',
    'subtitulo1': 'Lorimer No 2',
    'subtitulo2': 'Lorimer No 2',
    'texto': 'Adobe Garamond Pro',
}

FONTS_GOOGLE = {
    'titulo': 'Josefin Sans',
    'subtitulo': 'Josefin Sans Light',
    'subtitulo1': 'Josefin Sans',
    'subtitulo2': 'Josefin Sans',
    'texto': 'EB Garamond',
}

# Tamanhos de fonte
FONT_SIZES = {
    'titulo': Pt(44),
    'subtitulo': Pt(18),
    'subtitulo1': Pt(13.5),
    'subtitulo2': Pt(11),
    'texto': Pt(11),
    'bullet': Pt(11),
    'citacao': Pt(10),
}

# Espaçamentos (em pontos)
SPACING = {
    'antes': Pt(5.65),
    'depois': Pt(5.65),
    'entrelinhas': Pt(15),  # Exato
}


# =============================================================================
# FUNÇÕES DE DETECÇÃO DE TIPO DE PARÁGRAFO
# =============================================================================

def get_heading_level_from_style(paragraph) -> int:
    """Retorna o nível do heading baseado no estilo do Word (0 = não é heading)"""
    if not paragraph.style:
        return 0

    style_name = paragraph.style.name.lower()

    # Detectar Heading 1, 2, 3 (inglês e português)
    if 'heading 1' in style_name or 'título 1' in style_name:
        return 1
    if 'heading 2' in style_name or 'título 2' in style_name:
        return 2
    if 'heading 3' in style_name or 'título 3' in style_name:
        return 3
    if 'heading 4' in style_name or 'título 4' in style_name:
        return 4

    return 0


def is_chapter_title(text: str) -> bool:
    """Detecta se é título de capítulo (ex: 'Capítulo 1' ou 'CAPÍTULO 1')"""
    patterns = [
        r'^cap[íi]tulo\s+\d+',
        r'^chapter\s+\d+',
        r'^parte\s+\d+',
        r'^[IVX]+\.\s+',  # Numeração romana
    ]
    text_lower = text.lower().strip()
    return any(re.match(p, text_lower) for p in patterns)


def is_main_title(text: str, prev_text: str = '') -> bool:
    """Detecta título principal do capítulo (após 'Capítulo X')"""
    # Se o parágrafo anterior era 'Capítulo X', este é o título
    if is_chapter_title(prev_text):
        return True
    # Ou se é curto e em caixa alta
    if len(text) < 100 and text.isupper():
        return True
    return False


def is_subtitle(text: str) -> bool:
    """Detecta subtítulos (linhas curtas, geralmente em caixa alta ou com formatação especial)"""
    text = text.strip()
    # Curto e provavelmente um heading
    if len(text) < 80 and not text.endswith('.'):
        # Começa com número ou é caixa alta
        if re.match(r'^\d+\.', text) or text.isupper():
            return True
    return False


def is_bullet(text: str) -> bool:
    """Detecta item de lista"""
    text = text.strip()
    patterns = [
        r'^[\•\-\*\→\▸]\s',
        r'^\d+\.\s',
        r'^[a-z]\)\s',
        r'^[ivx]+\)\s',
    ]
    return any(re.match(p, text.lower()) for p in patterns)


def is_citation(text: str) -> bool:
    """Detecta citação (texto entre aspas ou em itálico longo)"""
    text = text.strip()
    if text.startswith('"') and text.endswith('"'):
        return True
    if text.startswith('"') and text.endswith('"'):
        return True
    if text.startswith('«') and text.endswith('»'):
        return True
    # Citação com autor (— Nome)
    if '—' in text and len(text) < 200:
        return True
    return False


def is_divider(text: str) -> bool:
    """Detecta linhas divisórias para remover"""
    text = text.strip()
    return text in ['---', '***', '___', '* * *', '• • •', '—', '———']


# =============================================================================
# FUNÇÕES DE APLICAÇÃO DE ESTILOS
# =============================================================================

def set_paragraph_spacing(paragraph, before=None, after=None, line_spacing=None):
    """Define espaçamento do parágrafo"""
    pf = paragraph.paragraph_format

    if before is not None:
        pf.space_before = before
    if after is not None:
        pf.space_after = after
    if line_spacing is not None:
        pf.line_spacing = line_spacing
        pf.line_spacing_rule = WD_LINE_SPACING.EXACTLY


def set_font(run, font_name: str, size, bold: bool = False, italic: bool = False):
    """Define fonte de um run"""
    run.font.name = font_name
    run.font.size = size
    run.font.bold = bold
    run.font.italic = italic

    # Necessário para fontes não-latinas
    r = run._element
    rPr = r.get_or_add_rPr()
    rFonts = rPr.get_or_add_rFonts()
    rFonts.set(qn('w:eastAsia'), font_name)


def apply_title_style(paragraph, fonts: dict):
    """Aplica estilo de título de capítulo"""
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(
        paragraph,
        before=Pt(72),  # Mais espaço antes do título
        after=Pt(24),
        line_spacing=SPACING['entrelinhas']
    )

    # Converter para caixa alta
    for run in paragraph.runs:
        run.text = run.text.upper()
        set_font(run, fonts['titulo'], FONT_SIZES['titulo'], bold=True)


def apply_subtitle_style(paragraph, fonts: dict, level: int = 1):
    """Aplica estilo de subtítulo"""
    paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT

    if level == 1:
        font_key = 'subtitulo1'
        before = Pt(24)
        after = Pt(12)
    else:
        font_key = 'subtitulo2'
        before = Pt(18)
        after = Pt(6)

    set_paragraph_spacing(paragraph, before=before, after=after, line_spacing=SPACING['entrelinhas'])

    for run in paragraph.runs:
        if level == 1:
            run.text = run.text.upper()
        set_font(run, fonts[font_key], FONT_SIZES[font_key], bold=(level == 1))


def apply_body_style(paragraph, fonts: dict):
    """Aplica estilo de texto corrido"""
    paragraph.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    set_paragraph_spacing(
        paragraph,
        before=SPACING['antes'],
        after=SPACING['depois'],
        line_spacing=SPACING['entrelinhas']
    )

    for run in paragraph.runs:
        set_font(run, fonts['texto'], FONT_SIZES['texto'])


def apply_bullet_style(paragraph, fonts: dict):
    """Aplica estilo de bullet/lista"""
    paragraph.alignment = WD_ALIGN_PARAGRAPH.LEFT
    paragraph.paragraph_format.left_indent = Cm(0.5)
    set_paragraph_spacing(
        paragraph,
        before=Pt(3),
        after=Pt(3),
        line_spacing=SPACING['entrelinhas']
    )

    for run in paragraph.runs:
        set_font(run, fonts['texto'], FONT_SIZES['bullet'])


def apply_citation_style(paragraph, fonts: dict):
    """Aplica estilo de citação"""
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    paragraph.paragraph_format.left_indent = Cm(2)
    paragraph.paragraph_format.right_indent = Cm(1)
    set_paragraph_spacing(
        paragraph,
        before=Pt(12),
        after=Pt(12),
        line_spacing=SPACING['entrelinhas']
    )

    for run in paragraph.runs:
        set_font(run, fonts['texto'], FONT_SIZES['citacao'], italic=True)


# =============================================================================
# PROCESSAMENTO PRINCIPAL
# =============================================================================

def process_document(input_path: str, output_path: str, use_google_fonts: bool = False):
    """Processa documento aplicando todos os estilos"""

    print(f"📖 Carregando: {input_path}")
    doc = Document(input_path)

    # Seleciona conjunto de fontes
    fonts = FONTS_GOOGLE if use_google_fonts else FONTS_ORIGINAL
    font_type = "Google Fonts" if use_google_fonts else "Fontes Originais"
    print(f"🔤 Usando: {font_type}")

    paragraphs_to_remove = []
    prev_text = ''

    stats = {
        'titulos': 0,
        'subtitulos': 0,
        'corpo': 0,
        'bullets': 0,
        'citacoes': 0,
        'removidos': 0,
    }

    print("✨ Aplicando estilos...")

    for i, para in enumerate(doc.paragraphs):
        text = para.text.strip()

        if not text:
            continue

        # Remover divisórias
        if is_divider(text):
            paragraphs_to_remove.append(para)
            stats['removidos'] += 1
            continue

        # PRIMEIRO: Verificar estilo do Word (Heading 1, 2, 3)
        heading_level = get_heading_level_from_style(para)

        if heading_level == 1:
            # Heading 1 = Título de capítulo
            apply_title_style(para, fonts)
            stats['titulos'] += 1
        elif heading_level == 2:
            # Heading 2 = Subtítulo principal
            apply_subtitle_style(para, fonts, level=1)
            stats['subtitulos'] += 1
        elif heading_level in [3, 4]:
            # Heading 3/4 = Subtítulo secundário
            apply_subtitle_style(para, fonts, level=2)
            stats['subtitulos'] += 1
        # FALLBACK: Heurísticas de texto (para documentos sem estilos)
        elif is_chapter_title(text):
            apply_title_style(para, fonts)
            stats['titulos'] += 1
        elif is_main_title(text, prev_text):
            apply_title_style(para, fonts)
            stats['titulos'] += 1
        elif is_subtitle(text):
            level = 1 if text.isupper() or re.match(r'^\d+\.', text) else 2
            apply_subtitle_style(para, fonts, level)
            stats['subtitulos'] += 1
        elif is_bullet(text):
            apply_bullet_style(para, fonts)
            stats['bullets'] += 1
        elif is_citation(text):
            apply_citation_style(para, fonts)
            stats['citacoes'] += 1
        else:
            apply_body_style(para, fonts)
            stats['corpo'] += 1

        prev_text = text

    # Remover parágrafos marcados (divisórias)
    for para in paragraphs_to_remove:
        p = para._element
        p.getparent().remove(p)

    # Salvar documento
    print(f"💾 Salvando: {output_path}")
    doc.save(output_path)

    # Relatório
    print("\n📊 Estatísticas:")
    print(f"   Títulos:    {stats['titulos']}")
    print(f"   Subtítulos: {stats['subtitulos']}")
    print(f"   Corpo:      {stats['corpo']}")
    print(f"   Bullets:    {stats['bullets']}")
    print(f"   Citações:   {stats['citacoes']}")
    print(f"   Removidos:  {stats['removidos']} (divisórias)")
    print("\n✅ Formatação concluída!")

    return stats


def main():
    parser = argparse.ArgumentParser(
        description='Aplica estilos editoriais profissionais a documentos Word',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python3 apply-book-styles.py manuscrito.docx livro-formatado.docx
  python3 apply-book-styles.py input.docx output.docx --use-google-fonts
        """
    )

    parser.add_argument('input', help='Documento Word de entrada (.docx)')
    parser.add_argument('output', help='Documento Word de saída (.docx)')
    parser.add_argument(
        '--use-google-fonts', '-g',
        action='store_true',
        help='Usar fontes alternativas do Google Fonts (Josefin Sans, EB Garamond)'
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Modo verbose com mais detalhes'
    )

    args = parser.parse_args()

    # Validar entrada
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"ERRO: Arquivo não encontrado: {args.input}")
        sys.exit(1)

    if not input_path.suffix.lower() == '.docx':
        print(f"ERRO: Arquivo deve ser .docx: {args.input}")
        sys.exit(1)

    # Processar
    try:
        process_document(args.input, args.output, args.use_google_fonts)
    except Exception as e:
        print(f"ERRO: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
