#!/bin/bash
#
# install-fonts.sh - Instala fontes alternativas do Google Fonts
#
# USAGE:
#   ./scripts/install-fonts.sh
#
# DESCRIÇÃO:
#   Baixa e instala as fontes alternativas do Google Fonts:
#   - EB Garamond (alternativa para Adobe Garamond Pro)
#   - Josefin Sans (alternativa para Lorimer No 2 e Helsinki)
#
# NOTA:
#   As fontes originais (Helsinki, Lorimer No 2, Adobe Garamond Pro)
#   são comerciais. Este script instala alternativas gratuitas de alta qualidade.
#

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "🔤 Instalador de Fontes - Mestre do Livro"
echo "========================================"
echo ""

# Detectar SO
if [[ "$OSTYPE" == "darwin"* ]]; then
    FONT_DIR="$HOME/Library/Fonts"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    FONT_DIR="$HOME/.local/share/fonts"
    mkdir -p "$FONT_DIR"
else
    echo -e "${RED}❌ Sistema operacional não suportado: $OSTYPE${NC}"
    exit 1
fi

echo "📁 Diretório de fontes: $FONT_DIR"
echo ""

# Criar diretório temporário
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Função para baixar e instalar fonte
install_font() {
    local font_name=$1
    local font_url=$2
    local font_file=$3

    echo -e "${YELLOW}📥 Baixando $font_name...${NC}"

    # Baixar
    if curl -L -s -o "$TEMP_DIR/$font_file" "$font_url"; then
        echo "   Extraindo..."

        # Extrair (assumindo ZIP)
        unzip -q -o "$TEMP_DIR/$font_file" -d "$TEMP_DIR/${font_name}"

        # Copiar arquivos TTF/OTF
        find "$TEMP_DIR/${font_name}" -name "*.ttf" -o -name "*.otf" | while read file; do
            cp "$file" "$FONT_DIR/"
            echo "   ✓ $(basename "$file")"
        done

        echo -e "${GREEN}   ✅ $font_name instalada!${NC}"
    else
        echo -e "${RED}   ❌ Falha ao baixar $font_name${NC}"
        return 1
    fi
}

# EB Garamond
echo ""
echo "1/2 - EB Garamond"
echo "    Alternativa para: Adobe Garamond Pro"
echo "    Uso: Texto corrido"

if ls "$FONT_DIR"/EBGaramond* >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Já instalada${NC}"
else
    install_font "EBGaramond" \
        "https://fonts.google.com/download?family=EB%20Garamond" \
        "EBGaramond.zip"
fi

# Josefin Sans
echo ""
echo "2/2 - Josefin Sans"
echo "    Alternativa para: Helsinki Medium, Lorimer No 2"
echo "    Uso: Títulos e subtítulos"

if ls "$FONT_DIR"/JosefinSans* >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Já instalada${NC}"
else
    install_font "JosefinSans" \
        "https://fonts.google.com/download?family=Josefin%20Sans" \
        "JosefinSans.zip"
fi

# Atualizar cache de fontes (Linux)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo ""
    echo "Atualizando cache de fontes..."
    fc-cache -f -v "$FONT_DIR" >/dev/null 2>&1
fi

echo ""
echo "========================================"
echo -e "${GREEN}✅ Instalação concluída!${NC}"
echo "========================================"
echo ""
echo "Fontes instaladas em: $FONT_DIR"
echo ""
echo "Para usar as fontes alternativas nos scripts:"
echo "  python3 scripts/apply-book-styles.py input.docx output.docx --use-google-fonts"
echo ""
