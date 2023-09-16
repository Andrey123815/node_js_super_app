const amqp = require('amqplib');
const express = require('express');

let channel, queue;

const CHAT_HISTORY = [];
const app = express();
const port = process.argv[2];

amqp
	.connect('amqp://localhost')
	.then((conn) => conn.createChannel())
	.then((ch) => {
		channel = ch;
		return ch.assertExchange('chat', 'fanout');
	})
	.then(() => channel.assertQueue('history_service'))
	.then((qu) => {
		queue = qu.queue;
		return channel.bindQueue(queue, 'chat');
	})
	.then(() => {
		return channel.consume(queue, ({ content }) => {
			CHAT_HISTORY.push(content);
			console.log(`Message ${content} received in history queue by RabbitMQ`);
		});
	})
	.then(() => {
		app.get('/history', (req, res) => {
			res.send(`Chat history: ${CHAT_HISTORY.join(', ')}`);
		});
		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`);
		});
	})
	.catch((err) => console.log(err));
