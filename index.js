var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('underscore');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/admin.html');
})

io.on('connection', function(socket){
	console.log('connection');
	socket.on('q.get', function() {
		io.emit('question', getQuestion());
	});

    socket.on('q.list', function(){
        io.emit('list', getQuestionList());
    });

    socket.on('q.set', function(data){
        active_q = data;
        io.emit('question', getQuestion());
    });
});

function getQuestion() {
	var ret = qlist[active_q];
	delete ret["acceptable"];
	return ret;
}

function getQuestionList() {
    return qlist;
}


http.listen(3000, function(){
  console.log('listening on *:3000');
});
