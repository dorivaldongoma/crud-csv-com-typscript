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
});
