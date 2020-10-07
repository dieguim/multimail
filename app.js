const fs = require('fs');
const csv = require('csv-parser');

const conf = require('./conf');
const multimail = require('./multimail');

fs.createReadStream('participantes.csv')
  .pipe(csv(['NOME', 'EMAIL', 'CERTIFICADO']))
  .on('data', async (participante) => {
    console.log(
      `ENVIANDO PARA ${participante.NOME}:${participante.EMAIL} (ANEXO: ${participante.CERTIFICADO})`
    );
    const ret = await multimail.sendMail(conf, participante);
    console.log(ret);
  })
  .on('end', () => {
    console.log('FIM DO CSV');
  });
