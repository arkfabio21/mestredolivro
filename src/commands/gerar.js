/**
 * Comando: gerar
 * Gera documentos (exemplo, capítulo, livro completo)
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function gerarCommand(tipo, options) {
  console.log(chalk.blue.bold('\n📄 MESTRE DO LIVRO - Gerar Documento\n'));

  const spinner = ora(`Gerando ${tipo}...`).start();

  try {
    switch (tipo) {
      case 'exemplo':
        await gerarExemplo(options);
        break;
      case 'capitulo':
        await gerarCapitulo(options);
        break;
      case 'livro':
        await gerarLivro(options);
        break;
      default:
        spinner.fail(`Tipo desconhecido: ${tipo}`);
        console.log(chalk.yellow('\nTipos disponíveis: exemplo, capitulo, livro'));
        return;
    }

    spinner.succeed(`${tipo} gerado com sucesso!`);
  } catch (error) {
    spinner.fail(`Erro ao gerar ${tipo}`);
    console.error(chalk.red(error.message));
  }
}

async function gerarExemplo(options) {
  // Importar e executar o script de exemplo
  const scriptPath = join(__dirname, '../../scripts/gerar-exemplo-diagramacao.js');

  const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak } = await import('docx');
  const fs = await import('fs');

  // Criar documento de exemplo simplificado
  const doc = new Document({
    creator: 'Mestre do Livro',
    title: 'Exemplo de Diagramação',
    sections: [{
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'EXEMPLO DE DIAGRAMAÇÃO',
              bold: true,
              size: 56,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Mestre do Livro',
              size: 28,
              italics: true,
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Este documento demonstra as especificações de diagramação.',
              size: 22,
            }),
          ],
        }),
      ],
    }],
  });

  const outputDir = options.output || './output';
  const outputPath = join(outputDir, 'exemplo-diagramacao.docx');

  // Criar pasta se não existir
  await fs.promises.mkdir(outputDir, { recursive: true });

  const buffer = await Packer.toBuffer(doc);
  await fs.promises.writeFile(outputPath, buffer);

  console.log(chalk.green(`\n📁 Arquivo: ${outputPath}`));
}

async function gerarCapitulo(options) {
  console.log(chalk.yellow('\n⚠️  Funcionalidade em desenvolvimento'));
  console.log(chalk.gray('   Use os agentes do Claude Code para gerar capítulos.'));
}

async function gerarLivro(options) {
  console.log(chalk.yellow('\n⚠️  Funcionalidade em desenvolvimento'));
  console.log(chalk.gray('   Use os agentes do Claude Code para gerar o livro completo.'));
}
