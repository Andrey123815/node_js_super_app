import net from 'net';
import fs from 'fs';
import { demultiplexChannel } from '../utils/mux-demux-utils';

export function initLoggerMicroService(): void {
	net
		.createServer((socket) => {
			const stdoutStream = fs.createWriteStream('stdout.log');
			const stderrStream = fs.createWriteStream('stderr.log');
			demultiplexChannel(socket, [stdoutStream, stderrStream]);
		})
		.listen(10000, () => {
			console.log('Logger service started');
		});
}
