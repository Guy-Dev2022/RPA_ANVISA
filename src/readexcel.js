const XLSX = require('xlsx');

function readexcel(planilha) {
  const workbook = XLSX.readFile(__dirname + '/' + planilha);
  const sheet_name_list = workbook.SheetNames;
  const dadosBrutos = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]]);
  const dados = dadosBrutos.split('\n');
  const dadosTamanho = dados.length - 1;
  const dadosClean = dados.slice(1, dadosTamanho)
  return dadosClean
};
// readexcel('./PROTOCOLOS.xlsx');
module.exports = readexcel;