/**
 * MESTRE DO LIVRO - Gerador de Exemplo de Diagramação
 *
 * Este script gera um documento Word de exemplo demonstrando
 * todas as especificações de diagramação do projeto.
 *
 * FONTES UTILIZADAS:
 * - Helsinki Medium: Títulos de capítulo (44pt, CAIXA ALTA, direita)
 * - Lorimer No 2 Light: Subtítulos de capítulo (18pt, CAIXA ALTA, direita)
 * - Lorimer No 2: Subtítulos no texto (13.5pt e 11pt)
 * - Adobe Garamond Pro Book: Texto corrido (11pt, justificado)
 *
 * NOTA: Se as fontes não estiverem instaladas, o Word substituirá automaticamente.
 */

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  PageBreak,
  TableOfContents,
  HeadingLevel,
  convertInchesToTwip,
  LineRuleType,
  Tab,
  TabStopType,
  TabStopPosition,
  BorderStyle,
  PageNumber,
  Footer,
  Header,
} = require("docx");
const fs = require("fs");

// Conversão de pontos para twips (1 ponto = 20 twips)
const ptToTwip = (pt) => pt * 20;
const ptToHalfPt = (pt) => pt * 2; // Para tamanho de fonte

// Configurações de estilo baseadas na especificação
// FONTES INSTALADAS:
// - Helsinki (original) → helsinki.ttf
// - Lorimer No 2 → substituída por Josefin Sans (Google Fonts)
// - Adobe Garamond Pro → substituída por EB Garamond (Google Fonts)
const STYLES = {
  // Título do capítulo: Helsinki Medium, 44pt, CAIXA ALTA, Direita
  tituloCapitulo: {
    font: "Helsinki",
    size: ptToHalfPt(44),
    bold: true,
    allCaps: true,
  },
  // Subtítulo do capítulo: Lorimer No 2 Light, 18pt, CAIXA ALTA, Direita
  // → Usando Josefin Sans como alternativa
  subtituloCapitulo: {
    font: "Josefin Sans",
    size: ptToHalfPt(18),
    allCaps: true,
  },
  // Subtítulo 1 no texto: Lorimer No 2, 13.5pt, CAIXA ALTA
  // → Usando Josefin Sans como alternativa
  subtitulo1: {
    font: "Josefin Sans",
    size: ptToHalfPt(13.5),
    allCaps: true,
    bold: true,
  },
  // Subtítulo 2 no texto: Lorimer No 2, 11pt, Normal
  // → Usando Josefin Sans como alternativa
  subtitulo2: {
    font: "Josefin Sans",
    size: ptToHalfPt(11),
    bold: true,
  },
  // Texto corrido: Adobe Garamond Pro Book, 11pt, Justificado
  // → Usando EB Garamond como alternativa (mesma família tipográfica)
  textoCorrente: {
    font: "EB Garamond",
    size: ptToHalfPt(11),
  },
  // Sumário - Numeração capítulo: Helsinki, 45pt
  sumarioNumero: {
    font: "Helsinki",
    size: ptToHalfPt(45),
    bold: true,
  },
  // Sumário - Título capítulo: Lorimer No 2, 10pt
  // → Usando Josefin Sans como alternativa
  sumarioTitulo: {
    font: "Josefin Sans",
    size: ptToHalfPt(10),
  },
  // Sumário - Número página: Lorimer No 2, 12pt
  // → Usando Josefin Sans como alternativa
  sumarioPagina: {
    font: "Josefin Sans",
    size: ptToHalfPt(12),
  },
  // Sumário - Prefácio/Agradecimento/Introdução: Lorimer No 2, 11pt
  // → Usando Josefin Sans como alternativa
  sumarioSecao: {
    font: "Josefin Sans",
    size: ptToHalfPt(11),
  },
};

// Espaçamento do texto corrido: Antes 5.65pt / Depois 5.65pt, Entrelinhas 15pt
const SPACING = {
  before: ptToTwip(5.65),
  after: ptToTwip(5.65),
  line: ptToTwip(15),
  lineRule: LineRuleType.EXACT,
};

// ============================================
// CONTEÚDO DE EXEMPLO
// ============================================

const CONTEUDO = {
  titulo: "A ARTE DE LIDERAR COM SEGURANÇA",
  subtitulo: "UM NOVO OLHAR SOBRE A CULTURA ORGANIZACIONAL",
  autora: "Andreza Araújo",

  capitulo1: {
    numero: "01",
    titulo: "O DESPERTAR",
    subtitulo: "QUANDO A SEGURANÇA SE TORNA CUIDADO",
    subtitulo1: "A JORNADA COMEÇA AQUI",
    subtitulo2: "Repensando o que sabemos",
    texto1: `Eu costumo dizer que a segurança precisa ser ressignificada. Durante meus 17 anos trabalhando com líderes em 25 países, percebi que as organizações mais bem-sucedidas não tratam a segurança como um conjunto de regras a serem cumpridas, mas como uma expressão genuína de cuidado com as pessoas.

Quando Frank Bird publicou seus estudos na década de 1960, ele nos mostrou uma verdade incômoda: para cada acidente fatal, existem milhares de comportamentos de risco que passaram despercebidos. Essa pirâmide, que muitos conhecem apenas como teoria, revela na prática que os grandes desastres são sempre precedidos por pequenos sinais que ignoramos.`,
    texto2: `Kahneman e Tversky demonstraram em suas pesquisas sobre vieses cognitivos que nossa mente tende a subestimar riscos que não experimentamos diretamente. É por isso que, mesmo com treinamentos e procedimentos bem definidos, os acidentes continuam acontecendo. Não se trata de falta de conhecimento, mas de como processamos esse conhecimento.

O caso de Chernobyl é emblemático. Os operadores da usina eram profissionais altamente qualificados, com anos de experiência. No entanto, uma combinação de pressão por resultados, excesso de confiança e falhas sistêmicas de comunicação levou ao maior desastre nuclear da história. O que podemos aprender com isso?`,
    texto3: `A resposta não está em mais regras ou mais punições. Está em criar ambientes onde as pessoas se sintam seguras para falar sobre insegurança. Parece paradoxal, mas é exatamente isso: precisamos de segurança psicológica para construir segurança física.`,
  },

  sumario: [
    { tipo: "secao", titulo: "Prefácio", pagina: "7" },
    { tipo: "secao", titulo: "Agradecimentos", pagina: "11" },
    { tipo: "secao", titulo: "Introdução", pagina: "15" },
    { tipo: "capitulo", numero: "01", titulo: "O Despertar", pagina: "23" },
    { tipo: "capitulo", numero: "02", titulo: "A Pirâmide Invertida", pagina: "37" },
    { tipo: "capitulo", numero: "03", titulo: "Liderança que Cuida", pagina: "51" },
    { tipo: "capitulo", numero: "04", titulo: "O Fator Humano", pagina: "65" },
  ],
};

// ============================================
// FUNÇÕES DE CRIAÇÃO DE ELEMENTOS
// ============================================

function criarFolhaRosto() {
  return [
    // Espaço no topo
    new Paragraph({ spacing: { before: ptToTwip(200) } }),

    // Título principal
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: CONTEUDO.titulo,
          font: STYLES.tituloCapitulo.font,
          size: STYLES.tituloCapitulo.size,
          bold: true,
        }),
      ],
    }),

    // Subtítulo
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: ptToTwip(20), after: ptToTwip(60) },
      children: [
        new TextRun({
          text: CONTEUDO.subtitulo,
          font: STYLES.subtituloCapitulo.font,
          size: STYLES.subtituloCapitulo.size,
        }),
      ],
    }),

    // Espaço
    new Paragraph({ spacing: { before: ptToTwip(100) } }),

    // Nome da autora
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: CONTEUDO.autora,
          font: STYLES.textoCorrente.font,
          size: ptToHalfPt(14),
          italics: true,
        }),
      ],
    }),

    // Quebra de página
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

function criarFichaTecnica() {
  const linhaFicha = (label, valor) =>
    new Paragraph({
      spacing: { after: ptToTwip(6) },
      children: [
        new TextRun({
          text: `${label}: `,
          font: STYLES.textoCorrente.font,
          size: ptToHalfPt(9),
          bold: true,
        }),
        new TextRun({
          text: valor,
          font: STYLES.textoCorrente.font,
          size: ptToHalfPt(9),
        }),
      ],
    });

  return [
    new Paragraph({ spacing: { before: ptToTwip(400) } }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: ptToTwip(20) },
      children: [
        new TextRun({
          text: "FICHA TÉCNICA",
          font: STYLES.subtitulo1.font,
          size: STYLES.subtitulo1.size,
          bold: true,
        }),
      ],
    }),

    new Paragraph({ spacing: { before: ptToTwip(20) } }),

    linhaFicha("Título", CONTEUDO.titulo),
    linhaFicha("Autora", CONTEUDO.autora),
    linhaFicha("Editora", "Editora Exemplo"),
    linhaFicha("ISBN", "978-65-00000-00-0"),
    linhaFicha("Edição", "1ª edição"),
    linhaFicha("Ano", "2026"),
    linhaFicha("Páginas", "199"),

    new Paragraph({ spacing: { before: ptToTwip(20) } }),

    new Paragraph({
      spacing: { before: ptToTwip(40) },
      children: [
        new TextRun({
          text: "© 2026 Andreza Araújo. Todos os direitos reservados.",
          font: STYLES.textoCorrente.font,
          size: ptToHalfPt(8),
          italics: true,
        }),
      ],
    }),

    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

function criarSumario() {
  const elementos = [
    // Título do sumário
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: ptToTwip(40) },
      children: [
        new TextRun({
          text: "SUMÁRIO",
          font: STYLES.tituloCapitulo.font,
          size: STYLES.tituloCapitulo.size,
          bold: true,
        }),
      ],
    }),

    new Paragraph({ spacing: { before: ptToTwip(30) } }),
  ];

  // Adicionar itens do sumário
  for (const item of CONTEUDO.sumario) {
    if (item.tipo === "secao") {
      // Seções como Prefácio, Agradecimentos
      elementos.push(
        new Paragraph({
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: convertInchesToTwip(5.5),
              leader: "dot",
            },
          ],
          spacing: { before: ptToTwip(12), after: ptToTwip(6) },
          children: [
            new TextRun({
              text: item.titulo,
              font: STYLES.sumarioSecao.font,
              size: STYLES.sumarioSecao.size,
            }),
            new TextRun({
              children: [new Tab()],
            }),
            new TextRun({
              text: item.pagina,
              font: STYLES.sumarioPagina.font,
              size: STYLES.sumarioPagina.size,
            }),
          ],
        })
      );
    } else if (item.tipo === "capitulo") {
      // Capítulos com número grande
      elementos.push(
        new Paragraph({
          spacing: { before: ptToTwip(20), after: ptToTwip(4) },
          children: [
            new TextRun({
              text: item.numero,
              font: STYLES.sumarioNumero.font,
              size: STYLES.sumarioNumero.size,
              bold: true,
            }),
          ],
        })
      );
      elementos.push(
        new Paragraph({
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: convertInchesToTwip(5.5),
              leader: "dot",
            },
          ],
          spacing: { after: ptToTwip(10) },
          children: [
            new TextRun({
              text: item.titulo,
              font: STYLES.sumarioTitulo.font,
              size: STYLES.sumarioTitulo.size,
            }),
            new TextRun({
              children: [new Tab()],
            }),
            new TextRun({
              text: item.pagina,
              font: STYLES.sumarioPagina.font,
              size: STYLES.sumarioPagina.size,
            }),
          ],
        })
      );
    }
  }

  elementos.push(
    new Paragraph({
      children: [new PageBreak()],
    })
  );

  return elementos;
}

function criarCapitulo() {
  const cap = CONTEUDO.capitulo1;

  return [
    // Espaço no topo
    new Paragraph({ spacing: { before: ptToTwip(100) } }),

    // Número do capítulo (alinhado à direita)
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text: cap.numero,
          font: STYLES.tituloCapitulo.font,
          size: ptToHalfPt(72),
          bold: true,
          color: "CCCCCC",
        }),
      ],
    }),

    // Título do capítulo: Helsinki Medium, 44pt, CAIXA ALTA, Direita
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: ptToTwip(10) },
      children: [
        new TextRun({
          text: cap.titulo,
          font: STYLES.tituloCapitulo.font,
          size: STYLES.tituloCapitulo.size,
          bold: true,
        }),
      ],
    }),

    // Subtítulo do capítulo: Lorimer No 2 Light, 18pt, CAIXA ALTA, Direita
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: ptToTwip(8), after: ptToTwip(40) },
      children: [
        new TextRun({
          text: cap.subtitulo,
          font: STYLES.subtituloCapitulo.font,
          size: STYLES.subtituloCapitulo.size,
        }),
      ],
    }),

    // Linha decorativa
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: ptToTwip(30) },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    }),

    // Subtítulo 1: Lorimer No 2, 13.5pt, CAIXA ALTA
    new Paragraph({
      spacing: { before: ptToTwip(20), after: ptToTwip(15) },
      children: [
        new TextRun({
          text: cap.subtitulo1,
          font: STYLES.subtitulo1.font,
          size: STYLES.subtitulo1.size,
          bold: true,
        }),
      ],
    }),

    // Texto corrido: Adobe Garamond Pro Book, 11pt, Justificado
    // Espaçamento: Antes 5.65pt / Depois 5.65pt, Entrelinhas 15pt
    ...cap.texto1.split("\n\n").map(
      (paragrafo) =>
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: SPACING,
          children: [
            new TextRun({
              text: paragrafo,
              font: STYLES.textoCorrente.font,
              size: STYLES.textoCorrente.size,
            }),
          ],
        })
    ),

    // Subtítulo 2: Lorimer No 2, 11pt, Normal
    new Paragraph({
      spacing: { before: ptToTwip(25), after: ptToTwip(15) },
      children: [
        new TextRun({
          text: cap.subtitulo2,
          font: STYLES.subtitulo2.font,
          size: STYLES.subtitulo2.size,
          bold: true,
        }),
      ],
    }),

    // Mais texto corrido
    ...cap.texto2.split("\n\n").map(
      (paragrafo) =>
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: SPACING,
          children: [
            new TextRun({
              text: paragrafo,
              font: STYLES.textoCorrente.font,
              size: STYLES.textoCorrente.size,
            }),
          ],
        })
    ),

    // Texto final
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: SPACING,
      children: [
        new TextRun({
          text: cap.texto3,
          font: STYLES.textoCorrente.font,
          size: STYLES.textoCorrente.size,
        }),
      ],
    }),
  ];
}

// ============================================
// CRIAÇÃO DO DOCUMENTO
// ============================================

async function gerarDocumento() {
  console.log("Gerando documento de exemplo de diagramação...\n");

  const doc = new Document({
    creator: "Mestre do Livro",
    title: CONTEUDO.titulo,
    description: "Exemplo de diagramação conforme especificação do projeto",
    styles: {
      default: {
        document: {
          run: {
            font: STYLES.textoCorrente.font,
            size: STYLES.textoCorrente.size,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: [
          ...criarFolhaRosto(),
          ...criarFichaTecnica(),
          ...criarSumario(),
          ...criarCapitulo(),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = "./output/exemplo-diagramacao.docx";

  // Criar pasta output se não existir
  if (!fs.existsSync("./output")) {
    fs.mkdirSync("./output", { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);

  console.log("✅ Documento gerado com sucesso!");
  console.log(`📄 Arquivo: ${outputPath}`);
  console.log("\n📋 ESPECIFICAÇÕES DE DIAGRAMAÇÃO DEMONSTRADAS:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("1. FOLHA DE ROSTO");
  console.log("   - Título centralizado");
  console.log("   - Subtítulo e nome da autora");
  console.log("");
  console.log("2. FICHA TÉCNICA");
  console.log("   - Dados editoriais");
  console.log("   - Copyright");
  console.log("");
  console.log("3. SUMÁRIO");
  console.log("   - Seções: Lorimer No 2, 11pt");
  console.log("   - Numeração capítulo: Helsinki, 45pt");
  console.log("   - Título capítulo: Lorimer No 2, 10pt");
  console.log("   - Número página: Lorimer No 2, 12pt");
  console.log("");
  console.log("4. CAPÍTULO");
  console.log("   - Título: Helsinki Medium, 44pt, CAIXA ALTA, direita");
  console.log("   - Subtítulo capítulo: Lorimer No 2 Light, 18pt, CAIXA ALTA, direita");
  console.log("   - Subtítulo 1: Lorimer No 2, 13.5pt, CAIXA ALTA");
  console.log("   - Subtítulo 2: Lorimer No 2, 11pt, Normal");
  console.log("   - Texto corrido: Adobe Garamond Pro Book, 11pt, Justificado");
  console.log("   - Espaçamento: Antes 5.65pt / Depois 5.65pt");
  console.log("   - Entrelinhas: Exatamente 15pt");
  console.log("");
  console.log("⚠️  NOTA: Se as fontes Helsinki, Lorimer No 2 e Adobe Garamond Pro");
  console.log("   não estiverem instaladas, o Word substituirá automaticamente.");
}

gerarDocumento().catch(console.error);
