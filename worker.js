#!/usr/bin/env node

var amqp= require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
	conn.createChannel(function(err,ch){
	var q = 'task_queue';
	ch.assertQueue(q,{durable:true});
	ch.prefetch(1);
	console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
	ch.consume(q, function(msg) {
		var secs= msg.content.toString().split('.').length - 1;
 		 console.log(" [x] Received %s", msg.content.toString());
        console.log(" [x] Secs is  %s", secs);
 		 setTimeout(function () {
             console.log(" [X] Done");
             ch.ack(msg);
         }, secs * 10000);
		}, {noAck: false});
	});

});

