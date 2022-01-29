import rhea, { generate_uuid } from 'rhea';
import {
	AwaitableSender,
	AwaitableSenderOptions,
	Connection,
	ConnectionOptions,
	Delivery,
	Message
} from 'rhea-promise';

import { config } from './config/env';

const connection = rhea.connect({
	host: config.host,
	username: config.user,
	password: config.pass,
	port: parseInt(config.port),
	container_id: process.env.name + 1 || 'teste1'
});

export async function sendMessage(queue, message) {
	return new Promise((resolve, reject) => {
		const sender = connection.open_sender(queue);
		sender.on('sendable', (context) => {
			const response = context.sender.send({
				body: message,
				durable: true,
				creation_time: new Date()
			});
			sender.detach();
			sender.close();
			resolve(response);
		});
		sender.on('disconnected', () => {
			sender.close();
			return reject();
		});
		connection.on('disconnected', () => {
			sender.close();
			return reject();
		});
	});
}

const connectionOptions: ConnectionOptions = {
	// transport: 'tls',
	host: config.host,
	hostname: config.host,
	username: config.user,
	password: config.pass,
	port: parseInt(config.port),
	reconnect: true
};
const connection2: Connection = new Connection(connectionOptions);
connection2.open();
export async function sendMessagePromise(queue, message) {
	const sender: AwaitableSender = await connection2.createAwaitableSender({
		name: process.env.name || 'teste',
		target: {
			address: queue
		}
	});
	console.log(message);
	const msg: Message = {
		body: message,
		message_id: Math.random() * 1000
	};

	const a = await sender.send(msg);
	await sender.close();
	// await connection2.close();

	return a.settled;
}
