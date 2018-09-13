var amqp = require('amqplib/callback_api');

var address = 'amqp://localhost:9000'

console.log(address);

amqp.connect(address, function amqpConnectCallback(err, conn){
    if(err){
        return callback(err);  
      } 

      setInterval(() => {
        var randomNumber = Math.floor((Math.random() * 100) + 1);
        var newstate = "operational";
        if(randomNumber > 30 && randomNumber < 70)
            newstate = "maintenance";
            else if(randomNumber >= 70)
            newstate = "error";
            else if(randomNumber <= 30)
            newstate = "operational";
    
            conn.createChannel(function(err, ch){
            if(err){
                return callback(err);  
            } 
    
            var id = Math.floor(Math.random() * 6) + 1;
    
            ch.publish("messages", '', new Buffer(JSON.stringify({ id, newstate})))
            console.log("publish id : " + id + "state " + newstate);
            ch.close();
            });
      }, 200); 
});