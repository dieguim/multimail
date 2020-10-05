# multimail

Envio de certificados para lista de participantes

## Utilização

1. Clone este repositório

```shell
$ git clone https://github.com/manejoao/multimail.git
```

2. Confirme ter o [NodeJs](https://nodejs.org/) instalado em sua máquina. Instale as dependências da aplicação

```shell
$ cd multimail
$ npm install
```

3. Configure os valores adequados no arquivo `conf.js`

4. Insira os participantes do evento conforme modelo do arquivo `participantes.csv`

5. Execute o envio das mensagens

```shell
$ node app.js
```
