import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.get("/calcular", (req, res) => {
  const { largura, altura, quantidade } = req.query;

  if (!largura || !altura || !quantidade) {
    return res.status(400).json({
      erro: "Informe largura, altura e quantidade"
    });
  }

  const espacamento = 0.5;
  const larguraFilme = 28;

  const larguraNum = parseFloat(String(largura).replace(",", "."));
  const alturaNum = parseFloat(String(altura).replace(",", "."));
  const quantidadeNum = parseInt(quantidade, 10);

  if (isNaN(larguraNum) || isNaN(alturaNum) || isNaN(quantidadeNum)) {
    return res.status(400).json({
      erro: "Os valores precisam ser numéricos"
    });
  }

  const larguraTotal = larguraNum + espacamento;
  const alturaTotal = alturaNum + espacamento;

  const porLinha = Math.floor(larguraFilme / larguraTotal);

  if (porLinha <= 0) {
    return res.status(400).json({
      erro: "Largura do adesivo maior que o filme"
    });
  }

  const linhas = Math.ceil(quantidadeNum / porLinha);
  const alturaFinalCm = linhas * alturaTotal;
  const metros = alturaFinalCm / 100;

  const resposta = `Para ${quantidadeNum} adesivos de ${larguraNum}x${alturaNum}cm, você vai precisar de aproximadamente ${metros.toFixed(2)} metros lineares.`;

  res.json({
    resposta,
    porLinha,
    linhas,
    metros: metros.toFixed(2)
  });
});

app.get("/responder", (req, res) => {
  const { largura, altura, quantidade } = req.query;

  if (!largura || !altura || !quantidade) {
    return res.status(400).json({
      erro: "Informe largura, altura e quantidade"
    });
  }

  const espacamento = 0.5;
  const larguraFilme = 28;

  const larguraNum = parseFloat(String(largura).replace(",", "."));
  const alturaNum = parseFloat(String(altura).replace(",", "."));
  const quantidadeNum = parseInt(quantidade, 10);

  if (isNaN(larguraNum) || isNaN(alturaNum) || isNaN(quantidadeNum)) {
    return res.status(400).json({
      erro: "Os valores precisam ser numéricos"
    });
  }

  const larguraTotal = larguraNum + espacamento;
  const alturaTotal = alturaNum + espacamento;

  const porLinha = Math.floor(larguraFilme / larguraTotal);

  if (porLinha <= 0) {
    return res.status(400).json({
      erro: "Largura do adesivo maior que o filme"
    });
  }

  const linhas = Math.ceil(quantidadeNum / porLinha);
  const alturaFinalCm = linhas * alturaTotal;
  const metros = alturaFinalCm / 100;

  const resposta = `Para ${quantidadeNum} adesivos de ${larguraNum}x${alturaNum}cm, você vai precisar de aproximadamente ${metros.toFixed(2)} metros lineares.`;

  res.json({
    resposta
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});