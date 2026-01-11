/**
 * Comando: validar
 * Valida capítulos e livros usando os 12 frameworks e sistema de scoring
 */

import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =============================================================================
// CONFIGURAÇÃO DO SISTEMA DE SCORING
// =============================================================================

const SCORE_CONFIG = {
  minimo: 95,
  categorias: {
    QUALITY: {
      peso: 40,
      criterios: {
        has_framework: { peso: 15, desc: 'Contém framework/metodologia' },
        has_exercise: { peso: 15, desc: 'Contém exercício prático' },
        has_critique: { peso: 10, desc: 'Contém análise crítica' },
      }
    },
    COMPLETENESS: {
      peso: 30,
      criterios: {
        structure_adequate: { peso: 15, desc: 'Estrutura adequada' },
        size_adequate: { peso: 10, desc: 'Tamanho adequado' },
        has_stories: { peso: 5, desc: 'Contém histórias/exemplos' },
      }
    },
    HYGIENE: {
      peso: 30,
      criterios: {
        min_chars: { valor: 3000, desc: 'Mínimo 3000 caracteres' },
        min_chapters: { valor: 3, desc: 'Mínimo 3 capítulos' },
        no_ai_artifacts: { desc: 'Sem artefatos de IA' },
        no_placeholder: { desc: 'Sem placeholders' },
      }
    }
  }
};

// Padrões para detectar vícios de IA
const AI_ARTIFACTS = [
  /\bAlém disso\b/gi,
  /\bPortanto\b/gi,
  /\bNo entanto\b/gi,
  /\bÉ importante ressaltar\b/gi,
  /\bVale destacar que\b/gi,
  /\bNesse sentido\b/gi,
  /\bDiante do exposto\b/gi,
  /\bCabe ressaltar\b/gi,
  /—/g,  // Travessão artificial
];

// Padrões de placeholder
const PLACEHOLDERS = [
  /\[TODO\]/gi,
  /\[INSERIR\]/gi,
  /\[COMPLETAR\]/gi,
  /\[PLACEHOLDER\]/gi,
  /Lorem ipsum/gi,
  /XXX/g,
];

// Padrões de framework/metodologia
const FRAMEWORK_PATTERNS = [
  /metodologia/gi,
  /framework/gi,
  /modelo\s+de/gi,
  /etapa[s]?\s*:/gi,
  /passo[s]?\s*:/gi,
  /fase[s]?\s*\d/gi,
];

// Padrões de exercício
const EXERCISE_PATTERNS = [
  /exercício/gi,
  /pratique/gi,
  /faça\s+você/gi,
  /sua\s+vez/gi,
  /tente\s+isso/gi,
  /aplicação\s+prática/gi,
];

// Padrões de crítica
const CRITIQUE_PATTERNS = [
  /crítica/gi,
  /análise/gi,
  /por\s+outro\s+lado/gi,
  /no\s+entanto/gi,
  /embora/gi,
  /apesar\s+de/gi,
];

// Padrões de histórias
const STORY_PATTERNS = [
  /história/gi,
  /caso\s+real/gi,
  /exemplo/gi,
  /aconteceu/gi,
  /certa\s+vez/gi,
  /imagine/gi,
];

// =============================================================================
// FUNÇÕES DE VALIDAÇÃO
// =============================================================================

/**
 * Lê conteúdo de um arquivo
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
}

/**
 * Lista arquivos de capítulos
 */
function listChapters(dir) {
  const chapters = [];
  const extensions = ['.md', '.txt', '.docx'];

  if (!fs.existsSync(dir)) {
    return chapters;
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext)) {
      chapters.push(path.join(dir, file));
    }
  }

  // Ordenar por número do capítulo
  chapters.sort((a, b) => {
    const numA = parseInt(path.basename(a).match(/\d+/)?.[0] || '0');
    const numB = parseInt(path.basename(b).match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  return chapters;
}

/**
 * Conta ocorrências de padrões
 */
function countPatterns(text, patterns) {
  let count = 0;
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

/**
 * Valida um capítulo individual
 */
function validateChapter(filePath) {
  const content = readFile(filePath);
  if (!content) {
    return {
      file: filePath,
      error: 'Arquivo não encontrado ou ilegível',
      score: 0,
      passed: false,
    };
  }

  const result = {
    file: filePath,
    fileName: path.basename(filePath),
    chars: content.length,
    words: content.split(/\s+/).length,
    lines: content.split('\n').length,
    scores: {},
    issues: [],
    passed: false,
  };

  // =========================================================================
  // QUALITY (40 pts)
  // =========================================================================
  let qualityScore = 0;

  // has_framework
  const frameworkCount = countPatterns(content, FRAMEWORK_PATTERNS);
  if (frameworkCount >= 2) {
    qualityScore += SCORE_CONFIG.categorias.QUALITY.criterios.has_framework.peso;
    result.scores.has_framework = true;
  } else {
    result.issues.push('Faltam frameworks/metodologias (mínimo 2 menções)');
    result.scores.has_framework = false;
  }

  // has_exercise
  const exerciseCount = countPatterns(content, EXERCISE_PATTERNS);
  if (exerciseCount >= 1) {
    qualityScore += SCORE_CONFIG.categorias.QUALITY.criterios.has_exercise.peso;
    result.scores.has_exercise = true;
  } else {
    result.issues.push('Falta exercício prático');
    result.scores.has_exercise = false;
  }

  // has_critique
  const critiqueCount = countPatterns(content, CRITIQUE_PATTERNS);
  if (critiqueCount >= 1) {
    qualityScore += SCORE_CONFIG.categorias.QUALITY.criterios.has_critique.peso;
    result.scores.has_critique = true;
  } else {
    result.issues.push('Falta análise crítica');
    result.scores.has_critique = false;
  }

  result.scores.QUALITY = qualityScore;

  // =========================================================================
  // COMPLETENESS (30 pts)
  // =========================================================================
  let completenessScore = 0;

  // structure_adequate (tem títulos, subtítulos)
  const headings = content.match(/^#+\s+.+$/gm) || [];
  if (headings.length >= 3) {
    completenessScore += SCORE_CONFIG.categorias.COMPLETENESS.criterios.structure_adequate.peso;
    result.scores.structure_adequate = true;
  } else {
    result.issues.push('Estrutura inadequada (mínimo 3 seções)');
    result.scores.structure_adequate = false;
  }

  // size_adequate (mínimo 1500 palavras por capítulo)
  if (result.words >= 1500) {
    completenessScore += SCORE_CONFIG.categorias.COMPLETENESS.criterios.size_adequate.peso;
    result.scores.size_adequate = true;
  } else {
    result.issues.push(`Tamanho insuficiente (${result.words} palavras, mínimo 1500)`);
    result.scores.size_adequate = false;
  }

  // has_stories
  const storyCount = countPatterns(content, STORY_PATTERNS);
  if (storyCount >= 1) {
    completenessScore += SCORE_CONFIG.categorias.COMPLETENESS.criterios.has_stories.peso;
    result.scores.has_stories = true;
  } else {
    result.issues.push('Faltam histórias/exemplos');
    result.scores.has_stories = false;
  }

  result.scores.COMPLETENESS = completenessScore;

  // =========================================================================
  // HYGIENE (30 pts - Pass/Fail)
  // =========================================================================
  let hygienePass = true;
  const hygieneIssues = [];

  // min_chars
  if (content.length < SCORE_CONFIG.categorias.HYGIENE.criterios.min_chars.valor) {
    hygienePass = false;
    hygieneIssues.push(`Menos de ${SCORE_CONFIG.categorias.HYGIENE.criterios.min_chars.valor} caracteres`);
  }

  // no_ai_artifacts
  const aiArtifacts = countPatterns(content, AI_ARTIFACTS);
  if (aiArtifacts > 0) {
    hygienePass = false;
    hygieneIssues.push(`${aiArtifacts} artefatos de IA encontrados`);
  }

  // no_placeholder
  const placeholders = countPatterns(content, PLACEHOLDERS);
  if (placeholders > 0) {
    hygienePass = false;
    hygieneIssues.push(`${placeholders} placeholders encontrados`);
  }

  result.scores.HYGIENE = hygienePass ? 30 : 0;
  result.scores.hygiene_pass = hygienePass;
  result.issues.push(...hygieneIssues);

  // =========================================================================
  // SCORE TOTAL
  // =========================================================================
  result.totalScore = qualityScore + completenessScore + (hygienePass ? 30 : 0);
  result.passed = result.totalScore >= SCORE_CONFIG.minimo;

  return result;
}

/**
 * Valida múltiplos capítulos
 */
function validateChapters(chapters) {
  const results = [];

  for (const chapter of chapters) {
    results.push(validateChapter(chapter));
  }

  return results;
}

/**
 * Executa quality-guard em um arquivo
 */
async function runQualityGuard(filePath) {
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, '../../scripts/quality-guard.py');

    if (!fs.existsSync(scriptPath)) {
      resolve({ success: false, error: 'Script quality-guard.py não encontrado' });
      return;
    }

    const process = spawn('python3', [scriptPath, filePath, '--json']);
    let output = '';
    let error = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.on('close', (code) => {
      try {
        const result = JSON.parse(output);
        resolve({ success: true, result });
      } catch {
        resolve({ success: false, error: error || output });
      }
    });
  });
}

// =============================================================================
// EXIBIÇÃO DE RESULTADOS
// =============================================================================

function displayResults(results, scoreMinimo) {
  console.log(chalk.blue.bold('\n📊 RESULTADOS DA VALIDAÇÃO\n'));

  let totalPassed = 0;
  let totalFailed = 0;

  for (const result of results) {
    if (result.error) {
      console.log(chalk.red(`❌ ${result.file}`));
      console.log(chalk.gray(`   Erro: ${result.error}\n`));
      totalFailed++;
      continue;
    }

    const icon = result.passed ? '✅' : '❌';
    const color = result.passed ? chalk.green : chalk.red;

    console.log(color(`${icon} ${result.fileName}`));
    console.log(chalk.gray(`   Score: ${result.totalScore}/100`));
    console.log(chalk.gray(`   Palavras: ${result.words} | Caracteres: ${result.chars}`));

    // Detalhes do score
    console.log(chalk.gray(`   QUALITY: ${result.scores.QUALITY}/40 | COMPLETENESS: ${result.scores.COMPLETENESS}/30 | HYGIENE: ${result.scores.HYGIENE}/30`));

    if (result.issues.length > 0) {
      console.log(chalk.yellow('   Issues:'));
      for (const issue of result.issues.slice(0, 5)) {
        console.log(chalk.yellow(`   - ${issue}`));
      }
      if (result.issues.length > 5) {
        console.log(chalk.yellow(`   ... e mais ${result.issues.length - 5} issues`));
      }
    }

    console.log('');

    if (result.passed) {
      totalPassed++;
    } else {
      totalFailed++;
    }
  }

  // Resumo
  console.log(chalk.blue.bold('═'.repeat(50)));
  console.log(chalk.white.bold('RESUMO'));
  console.log(chalk.green(`   Aprovados: ${totalPassed}`));
  console.log(chalk.red(`   Reprovados: ${totalFailed}`));
  console.log(chalk.gray(`   Score mínimo: ${scoreMinimo}`));
  console.log(chalk.blue.bold('═'.repeat(50)));

  return { passed: totalPassed, failed: totalFailed };
}

// =============================================================================
// COMANDO PRINCIPAL
// =============================================================================

export async function validarCommand(arquivo, options) {
  console.log(chalk.blue.bold('\n✅ MESTRE DO LIVRO - Validação\n'));

  const scoreMinimo = parseInt(options.scoreMinimo) || SCORE_CONFIG.minimo;
  SCORE_CONFIG.minimo = scoreMinimo;

  console.log(chalk.white(`Score mínimo: ${scoreMinimo}`));

  let chapters = [];

  if (arquivo) {
    // Arquivo ou diretório específico
    if (fs.existsSync(arquivo)) {
      const stats = fs.statSync(arquivo);
      if (stats.isDirectory()) {
        chapters = listChapters(arquivo);
        console.log(chalk.white(`Diretório: ${arquivo}`));
        console.log(chalk.white(`Capítulos encontrados: ${chapters.length}\n`));
      } else {
        chapters = [arquivo];
        console.log(chalk.white(`Arquivo: ${arquivo}\n`));
      }
    } else {
      console.log(chalk.red(`\n❌ Arquivo/diretório não encontrado: ${arquivo}`));
      return;
    }
  } else {
    // Procurar em capitulos/
    const defaultDirs = ['capitulos', 'capitulos/rascunhos', 'capitulos/revisados'];
    for (const dir of defaultDirs) {
      if (fs.existsSync(dir)) {
        chapters.push(...listChapters(dir));
      }
    }

    if (chapters.length === 0) {
      console.log(chalk.yellow('\n⚠️  Nenhum capítulo encontrado.'));
      console.log(chalk.gray('   Crie a estrutura com: mdl init "Nome do Livro"'));
      console.log(chalk.gray('   Ou especifique um arquivo: mdl validar arquivo.md\n'));
      return;
    }

    console.log(chalk.white(`Capítulos encontrados: ${chapters.length}\n`));
  }

  // Executar validação
  const spinner = ora('Validando capítulos...').start();

  const results = validateChapters(chapters);

  spinner.succeed('Validação concluída!');

  // Executar quality-guard se opção ativada
  if (options.qualityGuard) {
    const qgSpinner = ora('Executando Quality Guard...').start();

    for (let i = 0; i < results.length; i++) {
      if (!results[i].error) {
        const qgResult = await runQualityGuard(results[i].file);
        if (qgResult.success) {
          results[i].qualityGuard = qgResult.result;
          if (qgResult.result.total_vicios > 0) {
            results[i].issues.push(`Quality Guard: ${qgResult.result.total_vicios} vícios de IA`);
          }
        }
      }
    }

    qgSpinner.succeed('Quality Guard concluído!');
  }

  // Exibir resultados
  const summary = displayResults(results, scoreMinimo);

  // Código de saída
  if (summary.failed > 0) {
    console.log(chalk.yellow('\n💡 Dica: Use os agentes do Claude Code para melhorar os capítulos:'));
    console.log(chalk.gray('   @quality-guard limpar texto'));
    console.log(chalk.gray('   @revisor-estilo melhorar capítulo'));
    console.log(chalk.gray('   @auditor-qualidade avaliar capítulo\n'));
    process.exitCode = 1;
  } else if (summary.passed > 0) {
    console.log(chalk.green('\n🎉 Todos os capítulos aprovados!\n'));
    process.exitCode = 0;
  }
}
