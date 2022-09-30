const { Socket } = require('engine.io');
const express = require('express');//importamos o express
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));//definimos onde os arquivos publicos acessados pela aplicação vão ficar.

//configurações para que o servidor entenda que estamos usando as views como HTML
app.set('views',path.join(__dirname,'public'));//definimos onde vão ficar as nossas views
app.engine('html', require('ejs').renderFile);//definimos a engine como HTML
app.set('view engine', 'html');

//definimos que ao usuario acessa a rota padrão, ele será direcionado para o arquivo index.html
app.use('/', (req,res) => {
    res.render('index.html');
});

//array para armazenar as mensagens recebidas
let messages = [];

//toda vez que um novo cliente se conectar...
io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`);

    socket.emit('previousMessage', messages);
    //recebe o valor enviado pelo front
    socket.on('sendMessage', data => {
        messages.push(data);//faz um push para a var message
        /**
         * O socket tem 3 eventos basicamente:
         * socket.emit = emit a mensagem unicamente para o socket criado
         * socket.on = ouvir uma mensagem
         * socket.broadcast.emit = envia para todos os sockets conectados na aplicação
         */
        socket.broadcast.emit('receivedmessage', data);
    });
})


server.listen(3000); //O servidor vai ficar escutando na porta 3000