const conf = require('./conf');
const multimail = require('./multimail');

describe('Testes de Mala Direta', () => {
  it('deve substituir texto com variáveis de participante', () => {
    const texto = `
    Olá #NOME,
    Esse é seu E-mail: <b>#EMAIL</b>.
    `;

    const participante = {
      NOME: 'Diego Assis',
      EMAIL: 'diego.assis@gmail.com',
    };

    expect(multimail.md(texto, participante)).toEqual(`
    Olá Diego Assis,
    Esse é seu E-mail: <b>diego.assis@gmail.com</b>.
    `);
  });

  it('deve enviar email para participante', async () => {
    const participante = {
      NOME: 'Diego Assis',
      EMAIL: 'diego.assis@gmail.com',
    };

    const ret = await multimail.sendMail(conf, participante);
    expect(ret.accepted[0]).toEqual(participante.EMAIL);
  });
});
