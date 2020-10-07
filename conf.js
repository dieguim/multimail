const conf = {
  MAIL_AUTH_USER: 'dieguim', // Usuario do e-mail
  MAIL_AUTH_PASS: '', // Senha
  MAIL_FROM: '"Diego Assis" <dieguim@unicamp.br>', // Substituir de acordo com o remetente desejado
  // MSG_TITLE e MSG_BODY podem receber as palavras-chaves #NOME e #EMAIL, que serão
  // substituídas para cada destinatário
  MSG_TITLE: 'Certificado para #NOME',
  MSG_BODY: `
  Caro #NOME,<br>
  Você se chama #NOME e seu e-mail é #EMAIL.<br>
  Está recebendo o certificado em anexo. <b>Aceitamos HTML</b>
  `,
  // Não precisa alterar abaixo
  MAIL_HOST: 'smtp-imp.unicamp.br',
  MAIL_PORT: 587,
  MAIL_SECURE: false,
};

module.exports = conf;
