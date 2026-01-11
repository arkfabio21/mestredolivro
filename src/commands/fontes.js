/**
 * Comando: fontes
 * Verifica e instala fontes necessárias
 */

import { access } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';
import chalk from 'chalk';
import ora from 'ora';

const FONTES_NECESSARIAS = [
  {
    nome: 'Helsinki',
    arquivo: 'helsinki.ttf',
    alternativa: null,
    obrigatoria: true,
  },
  {
    nome: 'Lorimer No 2',
    arquivo: 'LorimerNo2-Regular.otf',
    alternativa: 'Josefin Sans',
    obrigatoria: false,
  },
  {
    nome: 'Adobe Garamond Pro',
    arquivo: 'AGaramondPro-Regular.otf',
    alternativa: 'EB Garamond',
    obrigatoria: false,
  },
];

const FONTES_ALTERNATIVAS = [
  { nome: 'Josefin Sans', arquivo: 'JosefinSans-Regular.ttf' },
  { nome: 'EB Garamond', arquivo: 'EBGaramond-Regular.ttf' },
];

export async function fontesCommand(options) {
  console.log(chalk.blue.bold('\n🔤 MESTRE DO LIVRO - Fontes\n'));

  const fontDir = join(homedir(), 'Library', 'Fonts');
  console.log(chalk.gray(`Diretório de fontes: ${fontDir}\n`));

  if (options.verificar) {
    await verificarFontes(fontDir);
    return;
  }

  await verificarFontes(fontDir);

  console.log(chalk.cyan('\n📥 Instalação de Fontes'));
  console.log(chalk.gray('   As fontes comerciais precisam ser obtidas separadamente:'));
  console.log(chalk.white('   - Helsinki: Fonte do projeto (incluída)'));
  console.log(chalk.white('   - Lorimer No 2: Adobe Fonts ou MyFonts'));
  console.log(chalk.white('   - Adobe Garamond Pro: Adobe Creative Cloud'));
  console.log(chalk.gray('\n   Alternativas gratuitas (Google Fonts):'));
  console.log(chalk.white('   - Josefin Sans (substitui Lorimer No 2)'));
  console.log(chalk.white('   - EB Garamond (substitui Adobe Garamond Pro)\n'));
}

async function verificarFontes(fontDir) {
  console.log(chalk.white('Verificando fontes instaladas:\n'));

  const spinner = ora('Verificando...').start();

  const resultados = [];

  // Verificar fontes principais
  for (const fonte of FONTES_NECESSARIAS) {
    const instalada = await verificarFonte(fontDir, fonte.arquivo);
    resultados.push({
      ...fonte,
      instalada,
    });
  }

  // Verificar alternativas
  for (const fonte of FONTES_ALTERNATIVAS) {
    const instalada = await verificarFonte(fontDir, fonte.arquivo);
    if (instalada) {
      resultados.push({
        ...fonte,
        instalada,
        alternativa: true,
      });
    }
  }

  spinner.stop();

  // Exibir resultados
  console.log(chalk.white('Fontes Principais:'));
  for (const r of resultados.filter(r => !r.alternativa)) {
    const status = r.instalada
      ? chalk.green('✓ Instalada')
      : r.alternativa
        ? chalk.yellow(`⚡ Usar ${r.alternativa}`)
        : chalk.red('✗ Não encontrada');
    console.log(`   ${r.nome}: ${status}`);
  }

  const alternativasInstaladas = resultados.filter(r => r.alternativa && r.instalada);
  if (alternativasInstaladas.length > 0) {
    console.log(chalk.white('\nFontes Alternativas (instaladas):'));
    for (const r of alternativasInstaladas) {
      console.log(`   ${chalk.green('✓')} ${r.nome}`);
    }
  }
}

async function verificarFonte(fontDir, arquivo) {
  try {
    await access(join(fontDir, arquivo));
    return true;
  } catch {
    // Tentar variações do nome
    const variacoes = [
      arquivo,
      arquivo.toLowerCase(),
      arquivo.replace('.ttf', '.otf'),
      arquivo.replace('.otf', '.ttf'),
    ];
    for (const v of variacoes) {
      try {
        await access(join(fontDir, v));
        return true;
      } catch {
        continue;
      }
    }
    return false;
  }
}
