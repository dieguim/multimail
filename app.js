const conf = require('./conf');

const csv = require('csv-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const transporterOpts = {
  host: conf.MAIL_HOST,
  port: conf.MAIL_PORT,
  secure: conf.MAIL_SECURE === 'true',
  auth: {
    user: conf.MAIL_AUTH_USER,
    pass: conf.MAIL_AUTH_PASS,
  },
};

const transporterDfts = {
  from: conf.MAIL_FROM,
};

const transporter = nodemailer.createTransport(
  transporterOpts,
  transporterDfts
);

function md(texto, participante) {
  return texto.replace(/#([A-Z]*)/g, (match, p1) => participante[p1]);
}

fs.createReadStream('participantes.csv')
  .pipe(csv(['NOME', 'EMAIL', 'CERTIFICADO']))
  .on('data', (participante) => {
    const to = `"${participante.NOME}" <${participante.EMAIL}>`;

    console.log(`ENVIANDO PARA ${to}`);
    transporter
      .sendMail({
        to,
        subject: md(conf.MSG_TITLE, participante),
        text: md(conf.MSG_BODY, participante).replace(/(<([^>]+)>)/gi, ''),
        html: md(conf.MSG_BODY, participante),
        attachments: [
          {
            path: participante.CERTIFICADO,
          },
        ],
      })
      .then((res) => {
        console.log(
          `ENVIADA COM SUCESSO from: "${res.envelope.from}" to: "${res.envelope.to}" messageId: "${res.messageId}"`
        );
      })
      .catch((err) => {
        console.error(`ERRO AO ENVIAR to: ${to}`, err);
      });
  })
  .on('end', () => {
    console.log('FIM DO CSV');
  });
