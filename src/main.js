const readExcel = require('./readexcel');
const consultaProtocolo = require('./consultaProtocolo');

async function main() {
  const protocolos = await readExcel('./PROTOCOLOS.xlsx');
  for (let i = 0; i < protocolos.length; i++) {
    const protocolo = protocolos[i];
    await consultaProtocolo(protocolo);
  }
};
main();