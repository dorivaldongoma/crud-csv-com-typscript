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

  // Criar o arquivo CSV
  const cabecalhos = ['Nome', 'Idade', 'Cidade'];
  const dados = [
    ['Alice', '30', 'Luanda'],
    ['Dori', '25', 'Lunda Norte'],
  ];
  criarCSV(cabecalhos, dados);

});
