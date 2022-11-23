const puppeteer = require('puppeteer');

const urlAlvo = 'https://consultas.anvisa.gov.br/#/documentos/tecnicos/';

async function consultaProtocolo(prot) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 150,
  });
  const page = await browser.newPage();

  try {
    await page.goto(urlAlvo);
    await console.log(`Consultando protocolo ${prot}`);

    //Adiciona protocolo
    await page.waitForSelector('div:nth-child(5) > input');
    await page.type('div:nth-child(5) > input', prot);

    //Clica not bt consultar
    await page.waitForSelector('.btn.btn-primary');
    await page.click('.btn.btn-primary');

    //Webscraping
    const situacao = await page.$eval('tr.ng-scope > td:nth-child(7)', (el) => el.textContent || false);
    const cnpj = await page.$eval('tr.ng-scope > td:nth-child(3)', (el) => el.textContent || false);
    const razaoSocial = await page.$eval('tbody > tr.ng-scope > td:nth-child(4)', (el) => el.textContent || false);

    const situacaoFinal = { prot, razaoSocial, cnpj, situacao }

    console.log(situacaoFinal);


    const rzSocial = razaoSocial.replace('/', '_');

    //Gera relatorio em pdf
    await page.waitForSelector('tbody > tr.ng-scope > td:nth-child(4)');
    await page.click('tbody > tr.ng-scope > td:nth-child(4)');
    await console.log('Gerando PDF...');
    await page.waitForSelector('div:nth-child(4) > div');
    await page.pdf({
      path: `./CONSULTA-PROTOCOLO-${rzSocial}.pdf`, format: 'A4'
    })

  } catch (error) {
    console.log(` PROBLEMAS DE CONSULTA NO PROTOCOLO: ${prot}`);
  }

  await browser.close();
};

module.exports = consultaProtocolo;