/**
 * Comando: init
 * Inicializa um novo projeto de livro
 */

import { mkdir, writeFile, access } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';

const ESTRUTURA_PROJETO = {
  pastas: [
    'capitulos',
    'capitulos/rascunhos',
    'capitulos/revisados',
    'capitulos/aprovados',
    'knowledge_base',
    'knowledge_base/conceitos',
    'knowledge_base/citacoes',
    'knowledge_base/dados',
    'output',
    'output/docx',
    'output/pdf',
  ],
  arquivos: {
    'livro.config.json': (config) => JSON.stringify(config, null, 2),
    'knowledge_base/glossario.md': () => '# Glossário\n\n<!-- Adicione termos e definições aqui -->\n',
    'README.md': (config) => `# ${config.titulo}\n\n**Autor:** ${config.autor}\n\n## Sobre\n\n${config.descricao}\n\n## Estrutura\n\n- \`capitulos/\` - Capítulos do livro\n- \`knowledge_base/\` - Base de conhecimento\n- \`output/\` - Arquivos gerados\n\n## Comandos\n\n\`\`\`bash\nmdl gerar exemplo    # Gerar documento de exemplo\nmdl validar          # Validar capítulos\nmdl formatar         # Gerar DOCX/PDF\nmdl relatorio        # Gerar relatório final\n\`\`\`\n`,
  },
};

export async function initCommand(nome, options) {
  console.log(chalk.blue.bold('\n📚 MESTRE DO LIVRO - Novo Projeto\n'));

  // Coletar informações via inquirer
  const respostas = await inquirer.prompt([
    {
      type: 'input',
      name: 'titulo',
      message: 'Título do livro:',
      default: nome || 'Meu Novo Livro',
    },
    {
      type: 'input',
      name: 'subtitulo',
      message: 'Subtítulo (opcional):',
    },
    {
      type: 'input',
      name: 'autor',
      message: 'Nome do autor:',
      default: process.env.USER || 'Autor',
    },
    {
      type: 'input',
      name: 'descricao',
      message: 'Descrição breve do livro:',
    },
    {
      type: 'list',
      name: 'template',
      message: 'Tipo de livro:',
      choices: [
        { name: 'Técnico/Negócios', value: 'tecnico' },
        { name: 'Ficção', value: 'ficcao' },
        { name: 'Didático', value: 'didatico' },
        { name: 'Autobiografia', value: 'biografia' },
      ],
      default: options.template,
    },
    {
      type: 'number',
      name: 'capitulos',
      message: 'Número estimado de capítulos:',
      default: 10,
    },
    {
      type: 'number',
      name: 'paginasPorCapitulo',
      message: 'Páginas por capítulo (média):',
      default: 13,
    },
  ]);

  const spinner = ora('Criando estrutura do projeto...').start();

  try {
    const pastaRaiz = nome
      ? join(process.cwd(), nome.toLowerCase().replace(/\s+/g, '-'))
      : process.cwd();

    // Verificar se pasta já existe
    try {
      await access(pastaRaiz);
      if (nome) {
        spinner.fail(`Pasta ${nome} já existe!`);
        return;
      }
    } catch {
      // Pasta não existe, criar
      if (nome) await mkdir(pastaRaiz, { recursive: true });
    }

    // Criar pastas
    for (const pasta of ESTRUTURA_PROJETO.pastas) {
      await mkdir(join(pastaRaiz, pasta), { recursive: true });
    }

    // Configuração do projeto
    const config = {
      titulo: respostas.titulo,
      subtitulo: respostas.subtitulo,
      autor: respostas.autor,
      descricao: respostas.descricao,
      template: respostas.template,
      meta: {
        capitulos: respostas.capitulos,
        paginasPorCapitulo: respostas.paginasPorCapitulo,
        paginasTotal: respostas.capitulos * respostas.paginasPorCapitulo + 17,
        caracteresPorPagina: 3300,
      },
      validacao: {
        scoreMinimo: 95,
        frameworks: [
          'first_principles',
          'second_order_thinking',
          'goodharts_law',
          'circle_of_competence',
          'map_vs_territory',
          'via_negativa',
          'antifragility',
          'skin_in_the_game',
          'falsifiability',
          'pareto',
          'regret_minimization',
          'survivorship_bias',
        ],
      },
      diagramacao: {
        fontes: {
          tituloCapitulo: { font: 'Helsinki', size: 44 },
          subtituloCapitulo: { font: 'Lorimer No 2', size: 18 },
          subtitulo1: { font: 'Lorimer No 2', size: 13.5 },
          subtitulo2: { font: 'Lorimer No 2', size: 11 },
          textoCorrente: { font: 'Adobe Garamond Pro', size: 11 },
        },
        espacamento: {
          antes: 5.65,
          depois: 5.65,
          entrelinhas: 15,
        },
      },
      criado: new Date().toISOString(),
      versao: '1.0.0',
    };

    // Criar arquivos
    for (const [arquivo, gerador] of Object.entries(ESTRUTURA_PROJETO.arquivos)) {
      const conteudo = gerador(config);
      await writeFile(join(pastaRaiz, arquivo), conteudo, 'utf-8');
    }

    spinner.succeed('Projeto criado com sucesso!');

    // Resumo
    console.log(chalk.green('\n✅ Projeto inicializado!\n'));
    console.log(chalk.white('📁 Estrutura criada:'));
    console.log(chalk.gray(`   ${pastaRaiz}/`));
    console.log(chalk.gray('   ├── capitulos/'));
    console.log(chalk.gray('   ├── knowledge_base/'));
    console.log(chalk.gray('   ├── output/'));
    console.log(chalk.gray('   ├── livro.config.json'));
    console.log(chalk.gray('   └── README.md'));

    console.log(chalk.white('\n📊 Configuração:'));
    console.log(chalk.gray(`   Título: ${config.titulo}`));
    console.log(chalk.gray(`   Autor: ${config.autor}`));
    console.log(chalk.gray(`   Capítulos: ${config.meta.capitulos}`));
    console.log(chalk.gray(`   Páginas estimadas: ${config.meta.paginasTotal}`));

    console.log(chalk.cyan('\n🚀 Próximos passos:'));
    if (nome) console.log(chalk.white(`   cd ${nome.toLowerCase().replace(/\s+/g, '-')}`));
    console.log(chalk.white('   mdl gerar exemplo     # Ver exemplo de diagramação'));
    console.log(chalk.white('   mdl fontes            # Instalar fontes necessárias\n'));

  } catch (error) {
    spinner.fail('Erro ao criar projeto');
    console.error(chalk.red(error.message));
  }
}
