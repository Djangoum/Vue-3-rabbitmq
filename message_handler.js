var rabbitMQHandler = require('./rabbitMQ_messaging');

module.exports = messageHandler;

function messageHandler(io){
  rabbitMQHandler('amqp://localhost:9000', function(err, options){
    

  options.onMessageReceived = function onMessageReceived(message){
    console.log("state change arrived");
    io.emit('statechange', message);
  }

    if(err){
      throw err;  
    }

    io.on('connection', websocketConnect);

    function websocketConnect(socket){

      console.log('New connection')
      
      socket.on('disconnect', socketDisconnect);

      socket.on('statechange', (message) => {
        console.log("state change arrived");
        io.emit('statechange', message);
        options.emitMessage(message);
      });

      function socketDisconnect(e){
        console.log('Disconnect ', e);
      }
    }
   });
}
