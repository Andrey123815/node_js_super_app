export function multiplexChannels(sources: any[], destination: any) {
	let totalChannels = sources.length;

	for (let i = 0; i < totalChannels; ++i) {
		sources[i]
			.on('readable', () => {
				let chunk: any;
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				while ((chunk = this.read()) !== null) {
					const outBuff = Buffer.alloc(1 + 4 + chunk.length);
					outBuff.writeUInt8(i);
					outBuff.writeUInt32BE(chunk.length, 1);
					chunk.copy(outBuff, 5);
					console.log('Sending packet to channel: ', i);
					destination.write(outBuff);
				}
			})
			.on('end', () => {
				if (--totalChannels === 0) {
					destination.end();
				}
			});
	}
}

export function demultiplexChannel(source: any, destinations: any[]) {
	let currentChannel: number | null = null;
	let currentLength: number | null = null;

	source
		.on('readable', () => {
			let chunk;

			if (currentChannel === null) {
				chunk = source.read(1);
				currentChannel = chunk && chunk.readUInt8(0);
			}

			if (currentChannel === null) {
				return;
			}

			if (currentLength === null) {
				chunk = source.read(4);
				currentLength = chunk && chunk.readUInt32BE(0);
				if (currentLength === null) {
					return;
				}
			}

			chunk = source.read(currentLength);
			if (chunk === null) {
				return;
			}

			console.log('Received packet from ' + currentChannel);
			destinations[currentChannel].write(chunk);

			currentChannel = null;
			currentLength = null;
		})
		.on('end', () => {
			destinations.forEach((destination) => destination.end());
			console.log('Source channel closed');
		});
}
