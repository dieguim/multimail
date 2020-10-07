const multimail = require('./multimail');
const conf = require('./conf');

multimail
  .readCsv('participantes.csv')
  .then((participantes) => {
    participantes.forEach((participante) => {
      console.log(
        `ENVIANDO PARA ${participante.NOME}:${participante.EMAIL} (ANEXO: ${participante.CERTIFICADO})`
      );
      multimail
        .sendMail(conf, participante)
        .then((ret) => {
          console.log(ret);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => console.log(err));
