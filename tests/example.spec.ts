import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('get started link', async ({ page }) => {

  const caminhoDoArquivoCSV = path.join(process.cwd(), 'utils/dados.csv');

// Função para criar um arquivo CSV
  function criarCSV(cabecalhos: string[], dados: string[][]): void {
    const conteudoCSV = [cabecalhos.join(','), ...dados.map(linha => linha.join(','))].join('\n');
    fs.writeFileSync(caminhoDoArquivoCSV, conteudoCSV, 'utf8');
    console.log('Arquivo CSV criado com sucesso.');
  }

// Função para ler um arquivo CSV
  function lerCSV(): void {
    if (!fs.existsSync(caminhoDoArquivoCSV)) {
      console.error('Arquivo CSV não encontrado.');
      return;
    }
    const conteudoCSV = fs.readFileSync(caminhoDoArquivoCSV, 'utf8');
    console.log('Conteúdo do arquivo CSV:');
    console.log(conteudoCSV);
  }

// Função para adicionar uma linha ao arquivo CSV
  function adicionarLinhaCSV(novaLinha: string[]): void {
    if (!fs.existsSync(caminhoDoArquivoCSV)) {
      console.error('Arquivo CSV não encontrado.');
      return;
    }
    const conteudoCSV = fs.readFileSync(caminhoDoArquivoCSV, 'utf8');
    const conteudoAtualizado = conteudoCSV + '\n' + novaLinha.join(',');
    fs.writeFileSync(caminhoDoArquivoCSV, conteudoAtualizado, 'utf8');
    console.log('Linha adicionada ao arquivo CSV com sucesso.');
  }

  // Função para editar uma linha específica no arquivo CSV
  function editarLinhaCSV(indiceLinha: number, novaLinha: string[]): void {
    if (!fs.existsSync(caminhoDoArquivoCSV)) {
      console.error('Arquivo CSV não encontrado.');
      return;
    }

    const conteudoCSV = fs.readFileSync(caminhoDoArquivoCSV, 'utf8');
    const linhas = conteudoCSV.split('\n');
    if (indiceLinha < 0 || indiceLinha >= linhas.length - 1) { // Verificação de índice válido
      console.error('Índice de linha inválido.');
      return;
    }

    const cabecalhos = linhas[0]; // Mantém os cabeçalhos
    linhas[indiceLinha + 1] = novaLinha.join(','); // Substitui a linha específica (indiceLinha + 1 para ignorar cabeçalhos)
    const conteudoAtualizado = [cabecalhos, ...linhas.slice(1)].join('\n');

    fs.writeFileSync(caminhoDoArquivoCSV, conteudoAtualizado, 'utf8');
    console.log('Linha do arquivo CSV editada com sucesso.');
  }

  // Função para editar um dado específico de uma coluna em uma linha específica
  function editarColunaCSV(indiceLinha: number, indiceColuna: number, novoDado: string): void {
    if (!fs.existsSync(caminhoDoArquivoCSV)) {
      console.error('Arquivo CSV não encontrado.');
      return;
    }

    const conteudoCSV = fs.readFileSync(caminhoDoArquivoCSV, 'utf8');
    const linhas = conteudoCSV.split('\n');
    if (indiceLinha < 0 || indiceLinha >= linhas.length - 1) { // Verificação de índice válido
      console.error('Índice de linha inválido.');
      return;
    }

    const cabecalhos = linhas[0]; // Mantém os cabeçalhos
    const colunas = linhas[indiceLinha + 1].split(',');
    if (indiceColuna < 0 || indiceColuna >= colunas.length) { // Verificação de índice válido de coluna
      console.error('Índice de coluna inválido.');
      return;
    }

    colunas[indiceColuna] = novoDado;
    linhas[indiceLinha + 1] = colunas.join(',');
    const conteudoAtualizado = [cabecalhos, ...linhas.slice(1)].join('\n');

    fs.writeFileSync(caminhoDoArquivoCSV, conteudoAtualizado, 'utf8');
    console.log('Coluna do arquivo CSV editada com sucesso.');
  }

  // Criar o arquivo CSV
  const cabecalhos = ['Nome', 'Idade', 'Cidade'];
  const dados = [
    ['Alice', '30', 'Luanda'],
    ['Dori', '25', 'Lunda Norte'],
  ];
  criarCSV(cabecalhos, dados);

  // Ler o arquivo CSV
  lerCSV();

  // Adicionar linha ao arquivo CSV
  const novaLinha = ['Ana', '28', 'Cabinda'];
  adicionarLinhaCSV(novaLinha);
  // Ler novamente para verificar a edição
  lerCSV();

  // Edita uma linha específica do arquivo CSV
  const linhaAtualizada = ['David', '40', 'Huíla'];
  const indiceLinha = 1; // Índice da linha que queremos editar (0 = primeira linha de dados)
  editarLinhaCSV(indiceLinha, linhaAtualizada);
// Ler novamente para verificar a edição da linha
  lerCSV();

  // Editar uma coluna específica de uma linha específica do arquivo CSV
  const indiceColuna = 1; // Índice da coluna que queremos editar (0 = primeira coluna)
  const novoDado = '35'; // Novo dado para a coluna específica
  editarColunaCSV(indiceLinha, indiceColuna, novoDado);
  // Ler novamente para verificar a edição da coluna
  lerCSV();
});
