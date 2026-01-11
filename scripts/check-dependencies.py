#!/usr/bin/env python3
"""
check-dependencies.py - Verifica e instala dependências do Mestre do Livro

USAGE:
    python3 scripts/check-dependencies.py [--install]

DESCRIÇÃO:
    Verifica se todas as dependências necessárias estão instaladas:
    - Python packages (python-docx, etc.)
    - CLI tools (pandoc, soffice)
    - Fontes (opcional)

DEPENDÊNCIAS VERIFICADAS:
    Obrigatórias:
    - python-docx: Manipulação de documentos Word
    - pandoc: Conversão entre formatos

    Opcionais:
    - LibreOffice (soffice): Conversão DOCX → PDF
    - Fontes: Helsinki, EB Garamond, Josefin Sans
"""

import argparse
import subprocess
import sys
import shutil
from pathlib import Path


def run_command(cmd: list, capture: bool = True) -> tuple:
    """Executa comando e retorna (sucesso, output)"""
    try:
        result = subprocess.run(
            cmd,
            capture_output=capture,
            text=True,
            timeout=30
        )
        return result.returncode == 0, result.stdout.strip()
    except Exception as e:
        return False, str(e)


def check_python_package(package: str) -> bool:
    """Verifica se um pacote Python está instalado"""
    try:
        __import__(package.replace('-', '_'))
        return True
    except ImportError:
        return False


def check_cli_tool(tool: str) -> tuple:
    """Verifica se uma ferramenta CLI está disponível"""
    path = shutil.which(tool)
    if path:
        # Tentar obter versão
        success, version = run_command([tool, '--version'])
        if success:
            version = version.split('\n')[0]
        else:
            version = "versão desconhecida"
        return True, path, version
    return False, None, None


def check_libreoffice() -> tuple:
    """Verifica LibreOffice em múltiplos locais"""
    # Locais comuns no macOS
    paths = [
        '/Applications/LibreOffice.app/Contents/MacOS/soffice',
        '/opt/homebrew/bin/soffice',
        '/usr/local/bin/soffice',
    ]

    for path in paths:
        if Path(path).exists():
            return True, path, "LibreOffice"

    # Tentar via which
    return check_cli_tool('soffice')


def install_python_package(package: str) -> bool:
    """Instala um pacote Python via pip"""
    print(f"   Instalando {package}...")
    success, _ = run_command([sys.executable, '-m', 'pip', 'install', package])
    return success


def main():
    parser = argparse.ArgumentParser(
        description='Verifica dependências do Mestre do Livro'
    )
    parser.add_argument(
        '--install', '-i',
        action='store_true',
        help='Instalar dependências Python faltantes automaticamente'
    )
    parser.add_argument(
        '--quiet', '-q',
        action='store_true',
        help='Saída mínima (apenas erros)'
    )

    args = parser.parse_args()

    print("=" * 60)
    print("🔍 Verificando Dependências - Mestre do Livro")
    print("=" * 60)

    all_ok = True
    warnings = []

    # =========================================================================
    # PYTHON PACKAGES
    # =========================================================================
    print("\n📦 Python Packages:")

    python_deps = [
        ('python-docx', 'docx', 'Manipulação de DOCX', True),
        ('lxml', 'lxml', 'Processamento XML', True),
    ]

    for pip_name, import_name, desc, required in python_deps:
        if check_python_package(import_name):
            if not args.quiet:
                print(f"   ✅ {pip_name}: OK")
        else:
            if required:
                print(f"   ❌ {pip_name}: FALTANDO ({desc})")
                if args.install:
                    if install_python_package(pip_name):
                        print(f"   ✅ {pip_name}: Instalado!")
                    else:
                        print(f"   ❌ Falha ao instalar {pip_name}")
                        all_ok = False
                else:
                    print(f"      Execute: pip install {pip_name}")
                    all_ok = False
            else:
                warnings.append(f"{pip_name} não instalado (opcional)")

    # =========================================================================
    # CLI TOOLS
    # =========================================================================
    print("\n🛠️  CLI Tools:")

    # Pandoc
    found, path, version = check_cli_tool('pandoc')
    if found:
        if not args.quiet:
            print(f"   ✅ pandoc: {version}")
            print(f"      Path: {path}")
    else:
        print("   ❌ pandoc: FALTANDO")
        print("      Instale via: brew install pandoc")
        all_ok = False

    # LibreOffice
    found, path, version = check_libreoffice()
    if found:
        if not args.quiet:
            print(f"   ✅ LibreOffice: OK")
            print(f"      Path: {path}")
    else:
        print("   ⚠️  LibreOffice: NÃO ENCONTRADO (opcional)")
        print("      Necessário para conversão DOCX → PDF")
        print("      Instale via: brew install --cask libreoffice")
        warnings.append("LibreOffice não instalado (conversão PDF indisponível)")

    # =========================================================================
    # FONTES
    # =========================================================================
    print("\n🔤 Fontes:")

    # Verificar fontes no sistema (macOS)
    font_dir = Path.home() / 'Library' / 'Fonts'
    system_fonts = Path('/System/Library/Fonts')
    library_fonts = Path('/Library/Fonts')

    fonts_to_check = [
        ('Helsinki', ['Helsinki*.ttf', 'Helsinki*.otf']),
        ('EB Garamond', ['EBGaramond*.ttf', 'EBGaramond*.otf']),
        ('Josefin Sans', ['JosefinSans*.ttf', 'JosefinSans*.otf']),
    ]

    for font_name, patterns in fonts_to_check:
        found = False
        for font_path in [font_dir, system_fonts, library_fonts]:
            if font_path.exists():
                for pattern in patterns:
                    if list(font_path.glob(pattern)):
                        found = True
                        break
            if found:
                break

        if found:
            if not args.quiet:
                print(f"   ✅ {font_name}: Instalada")
        else:
            print(f"   ⚠️  {font_name}: Não encontrada")
            warnings.append(f"Fonte {font_name} não instalada")

    # =========================================================================
    # ESTRUTURA DO PROJETO
    # =========================================================================
    print("\n📁 Estrutura do Projeto:")

    project_root = Path(__file__).parent.parent
    required_dirs = [
        'knowledge_base',
        'knowledge_base/conceitos',
        'knowledge_base/citacoes',
        'knowledge_base/dados',
        'scripts',
    ]

    for dir_name in required_dirs:
        dir_path = project_root / dir_name
        if dir_path.exists():
            if not args.quiet:
                print(f"   ✅ {dir_name}/")
        else:
            print(f"   ❌ {dir_name}/ FALTANDO")
            all_ok = False

    # =========================================================================
    # RESUMO
    # =========================================================================
    print("\n" + "=" * 60)

    if all_ok and not warnings:
        print("✅ Todas as dependências estão OK!")
    elif all_ok:
        print("✅ Dependências obrigatórias OK")
        print("\n⚠️  Avisos:")
        for w in warnings:
            print(f"   • {w}")
    else:
        print("❌ Algumas dependências estão faltando")
        print("\nPara instalar automaticamente pacotes Python:")
        print("   python3 scripts/check-dependencies.py --install")

    print("=" * 60)

    return 0 if all_ok else 1


if __name__ == '__main__':
    sys.exit(main())
