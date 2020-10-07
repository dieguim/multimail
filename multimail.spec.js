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

  it('deve ler mais que zero registros do arquivo CSV', async () => {
    const lista = await multimail.readCsv('participantes.csv');
    expect(lista.length).toBeGreaterThan(0);
  });

  it('deve ler campos do arquivo CSV corretamente', async () => {
    const lista = await multimail.readCsv('participantes.csv');
    expect(lista[0]).toHaveProperty('NOME');
    expect(lista[0]).toHaveProperty('EMAIL');
    expect(lista[0]).toHaveProperty('CERTIFICADO');
  });
});
