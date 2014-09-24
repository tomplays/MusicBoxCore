var io;
var socket;
var says;


exports.socketer = function(socket, data){
	console.log('socketz')
	console.log(data)
	socket.emit('newsback', data)
	socket.broadcast.emit('newsback', data)
}
