const express = require('express');//importamos o express
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(serve);

app.use(express.static(path.join(__dirname, 'public')));//definimos onde os arquivos publicos acessados pela aplicação vão ficar.

//configurações para que o servidor entenda que estamos usando as views como HTML
app.set('viwes',path.join(__dirname,'public'));//definimos onde vão ficar as nossas views
app.engine('html', require('ejs').renderFile);//definimos a engine como HTML
app.set('view engine', 'html');

//definimos que ao usuario acessa a rota padrão, ele será direcionado para o arquivo index.html
app.use('/', (req,res) => {
    res.render('index.html');
})

server.listen(3000);//O servidor vai ficar escutando na porta 3000