const express = require('express');
const amqp = require('amqplib');

let channel, queue;

const app = express();
const port = process.argv[2];

amqp
	.connect(`amqp://localhost`)
	.then((conn) => conn.createChannel())
	.then((ch) => {
		channel = ch;
		return ch.assertExchange('chat', 'fanout');
	})
	.then(() => channel.assertQueue(`chat_service_${port}`, { exclusive: true }))
	.then((qu) => {
		queue = qu.queue;
		return channel.bindQueue(queue, 'chat');
	})
	.then(() => {
		app.get('/chat', (req, res) => {
			res.send(`Message ${req.query.message} received in chat queue by RabbitMQ`);
			channel.publish('chat', '', Buffer.from(req.query.message));
		});
		app.listen(port, () => {
			console.log(`Chat microservice listening on port ${port}`);
		});
	})
	.catch((err) => console.log(err));
