const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// CONFIG FIXA
const LARGURA_FILME = 28;
const ESPACAMENTO = 0.5;

// FUNÇÃO DE CÁLCULO
function calcularMetragem(largura, altura, quantidade) {
  const larguraNum = parseFloat(String(largura).replace(",", "."));
  const alturaNum = parseFloat(String(altura).replace(",", "."));
  const quantidadeNum = parseInt(quantidade, 10);

  if (isNaN(larguraNum) || isNaN(alturaNum) || isNaN(quantidadeNum)) {
    throw new Error("Os valores precisam ser numéricos");
  }

  if (larguraNum <= 0 || alturaNum <= 0 || quantidadeNum <= 0) {
    throw new Error("Os valores precisam ser maiores que zero");
  }

  const larguraTotal = larguraNum + ESPACAMENTO;
  const alturaTotal = alturaNum + ESPACAMENTO;

  const porLinha = Math.floor(LARGURA_FILME / larguraTotal);

  if (porLinha <= 0) {
    throw new Error("Largura do adesivo maior que o filme");
  }

  const linhas = Math.ceil(quantidadeNum / porLinha);
  const alturaFinalCm = linhas * alturaTotal;
  const metros = alturaFinalCm / 100;

  return {
    largura: larguraNum,
    altura: alturaNum,
    quantidade: quantidadeNum,
    porLinha,
    linhas,
    metros: metros.toFixed(2)
  };
}

// ROTA BASE
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// ROTA DE CÁLCULO
app.get("/calcular", (req, res) => {
  try {
    const { largura, altura, quantidade } = req.query;

    if (!largura || !altura || !quantidade) {
      return res.status(400).json({
        erro: "Informe largura, altura e quantidade"
      });
    }

    const resultado = calcularMetragem(largura, altura, quantidade);

    const resposta = `Para ${resultado.quantidade} adesivos de ${resultado.largura}x${resultado.altura}cm, você vai precisar de aproximadamente ${resultado.metros} metros lineares.`;

    return res.json({
      resposta,
      porLinha: resultado.porLinha,
      linhas: resultado.linhas,
      metros: resultado.metros
    });
  } catch (error) {
    return res.status(400).json({
      erro: error.message
    });
  }
});

// ROTA DE RESPOSTA PRONTA
app.get("/responder", (req, res) => {
  try {
    const { largura, altura, quantidade } = req.query;

    if (!largura || !altura || !quantidade) {
      return res.status(400).json({
        erro: "Informe largura, altura e quantidade"
      });
    }

    const resultado = calcularMetragem(largura, altura, quantidade);

    const resposta = `Para ${resultado.quantidade} adesivos de ${resultado.largura}x${resultado.altura}cm, você vai precisar de aproximadamente ${resultado.metros} metros lineares.`;

    return res.json({
      resposta
    });
  } catch (error) {
    return res.status(400).json({
      erro: error.message
    });
  }
});

// START
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});