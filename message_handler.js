var rabbitMQHandler = require('./rabbitMQ_messaging');

module.exports = messageHandler;

function messageHandler(io){
  rabbitMQHandler('amqp://rabbitmq:rabbitmq@localhost:5672', function(err, options){
    
    if(err){
      throw err;  
    }

    options.onMessageReceived = function onMessageReceived(message){
      console.log("state change arrived");
      io.emit('statechange', message);
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
