#!/usr/bin/env node

/**
 * MESTRE DO LIVRO - CLI
 * Sistema de escrita de livros com IA
 *
 * Comandos disponíveis:
 *   mdl init          - Iniciar novo projeto de livro
 *   mdl gerar         - Gerar documento de exemplo
 *   mdl validar       - Validar capítulo/livro
 *   mdl formatar      - Formatar para DOCX/PDF
 *   mdl relatorio     - Gerar relatório final
 */

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar versão do package.json
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
);

const program = new Command();

program
  .name('mestre-do-livro')
  .description('Sistema de escrita de livros com IA - Pipeline completo')
  .version(packageJson.version);

// Comando: init
program
  .command('init [nome]')
  .description('Iniciar novo projeto de livro')
  .option('-t, --template <tipo>', 'Template do livro (tecnico, ficcao, negocios)', 'tecnico')
  .action(async (nome, options) => {
    const { initCommand } = await import('../src/commands/init.js');
    await initCommand(nome, options);
  });

// Comando: gerar
program
  .command('gerar <tipo>')
  .description('Gerar documento (exemplo, capitulo, livro)')
  .option('-o, --output <caminho>', 'Caminho de saída')
  .option('-f, --formato <formato>', 'Formato de saída (docx, pdf)', 'docx')
  .action(async (tipo, options) => {
    const { gerarCommand } = await import('../src/commands/gerar.js');
    await gerarCommand(tipo, options);
  });

// Comando: validar
program
  .command('validar [arquivo]')
  .description('Validar capítulo ou livro completo')
  .option('-s, --score-minimo <numero>', 'Score mínimo para aprovação', '95')
  .option('-q, --quality-guard', 'Executar Quality Guard (detectar vícios de IA)')
  .action(async (arquivo, options) => {
    const { validarCommand } = await import('../src/commands/validar.js');
    await validarCommand(arquivo, options);
  });

// Comando: formatar
program
  .command('formatar <entrada>')
  .description('Formatar markdown para DOCX/PDF')
  .option('-o, --output <caminho>', 'Caminho de saída')
  .option('-f, --formato <formato>', 'Formato (docx, pdf, ambos)', 'docx')
  .option('--template <template>', 'Template de formatação')
  .action(async (entrada, options) => {
    const { formatarCommand } = await import('../src/commands/formatar.js');
    await formatarCommand(entrada, options);
  });

// Comando: relatorio
program
  .command('relatorio')
  .description('Gerar relatório final do livro')
  .option('-o, --output <caminho>', 'Caminho de saída')
  .action(async (options) => {
    const { relatorioCommand } = await import('../src/commands/relatorio.js');
    await relatorioCommand(options);
  });

// Comando: fontes
program
  .command('fontes')
  .description('Instalar fontes necessárias')
  .option('--verificar', 'Apenas verificar fontes instaladas')
  .action(async (options) => {
    const { fontesCommand } = await import('../src/commands/fontes.js');
    await fontesCommand(options);
  });

program.parse();
