const nodemailer = require('nodemailer');
const fs = require('fs');
const csv = require('csv-parser');
const { resolve } = require('path');
const { rejects } = require('assert');

class Multimail {
  md(texto, participante) {
    return texto.replace(/#([A-Z]*)/g, (match, p1) => participante[p1]);
  }

  readCsv(arq) {
    return new Promise((resolve, reject) => {
      const participantes = [];
      fs.createReadStream(arq)
        .pipe(csv(['NOME', 'EMAIL', 'CERTIFICADO']))
        .on('data', async (participante) => {
          participantes.push(participante);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(participantes);
        });
    });
  }

  sendMail(conf, participante) {
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

    const to = `"${participante.NOME}" <${participante.EMAIL}>`;

    return transporter.sendMail({
      to,
      subject: this.md(conf.MSG_TITLE, participante),
      text: this.md(conf.MSG_BODY, participante).replace(/(<([^>]+)>)/gi, ''),
      html: this.md(conf.MSG_BODY, participante),
      attachments: [
        {
          path: participante.CERTIFICADO,
        },
      ],
    });
  }
}
module.exports = new Multimail();
