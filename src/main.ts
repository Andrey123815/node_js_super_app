import express, { Request, Response } from 'express';

const PORT_OPTION = '--port';

if (process.argv.length !== 4) {
	throw Error('В качестве аргумента должен быть передан порт через опцию --port');
}

if (process.argv[2] !== PORT_OPTION) {
	throw Error(`Обязательно должна быть указана опция ${PORT_OPTION}`);
}

const app = express();
const port = process.argv[3];

app.get('/', (req: Request, res: Response) => {
	res.send(`Hello World from ${port}!`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
