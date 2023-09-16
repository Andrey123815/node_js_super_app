import express, { Request, Response } from 'express';
import { Worker } from 'worker_threads';

interface IQueryParam {
	word: string;
}

const CHAT_MESSAGES_HISTORY: string[] = [];

const PORT_OPTION = '--port';

if (process.argv.length !== 4) {
	throw Error('В качестве аргумента должен быть передан порт через обязательную опцию --port');
}

if (process.argv[2] !== PORT_OPTION) {
	throw Error(`Обязательно должна быть указана опция ${PORT_OPTION}`);
}

const app = express();
const port = process.argv[3];

app.get('/', (req: Request, res: Response) => {
	res.send(`Hello World from server at ${port}!`);
});

app.get('/crypto-word', (req: Request<{}, {}, {}, IQueryParam>, res: Response) => {
	const worker = new Worker('./src/workers/cryptoWorker.ts', {
		workerData: {
			word: req.query.word,
		},
	});

	worker.once('message', (array: Array<string>) => {
		res.send(array);
	});
});

app.listen(port, () => {
	console.log(`Start worker process listening on port ${port}`);
});

/** Server exceptions simulation */
// setTimeout(() => {
// 	throw new Error('Ooops');
// }, Math.ceil(Math.random() * 100) * 1000);
