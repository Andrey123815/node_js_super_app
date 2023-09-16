import { parentPort, workerData } from 'worker_threads';
import crypto from 'crypto';
import * as Stream from 'stream';
import { Readable } from 'stream';
import fs from 'fs';

async function stream2buffer(stream: Stream): Promise<Buffer> {
	return new Promise<Buffer>((resolve, reject) => {
		const _buf = Array<any>();

		stream.on('data', (chunk: any) => _buf.push(chunk));
		stream.on('end', () => resolve(Buffer.concat(_buf)));
		stream.on('error', (err: string) => reject(`error converting stream - ${err}`));
	});
}

async function encryptWord(): Promise<void> {
	const { word } = workerData;

	fs.writeFile('../../stdout.log', word as string, {}, () => {});

	const sha1Stream = crypto.createHash('sha1');
	sha1Stream.setEncoding('base64');

	const md5Stream = crypto.createHash('md5');
	md5Stream.setEncoding('base64');

	const inputStream = Readable.from(word as string);

	const calcBuffer = [
		await stream2buffer(inputStream.pipe(sha1Stream)),
		await stream2buffer(inputStream.pipe(md5Stream)),
	];

	parentPort?.postMessage(calcBuffer);
}

encryptWord().then(() => {});
