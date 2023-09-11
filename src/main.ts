import cluster, { Worker } from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
	console.log(`main ${process.pid}`);

	const cpuCount = os.cpus().length;
	console.log(`Clustering to ${cpuCount} CPUs`);
	for (let i = 0; i < cpuCount; ++i) {
		cluster.fork();
	}

	cluster.on('exit', (worker: any, code: number) => {
		if (code !== 0 && !worker.process.killed) {
			console.log('Worker crashed. Starting new Worker Process');
			cluster.fork();
		}
	});

	process.on('SIGUSR2', () => {
		console.log('Restarting workers...');
		const workers = Object.keys(cluster.workers || {});

		function restartWorker(workerNumber: number): void {
			if (workerNumber >= workers.length) {
				return;
			}

			const worker = cluster.workers?.[workers[workerNumber]];
			if (!worker) {
				console.log('error worker');
				return;
			}

			console.log(`Stopping worker: ${worker.process.pid}`);
			worker.disconnect();

			worker.on('exit', () => {
				const newWorker = cluster.fork();
				newWorker.on('listening', () => {
					restartWorker(workerNumber + 1);
				});
			});
		}

		restartWorker(0);
	});
} else {
	console.log(`Worker process with PID: ${cluster.worker?.process.pid} started`);
	require('./app');
}
