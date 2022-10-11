import rhea from 'rhea';
import {
	AwaitableSender,
	AwaitableSenderOptions,
	Connection,
	ConnectionOptions,
	Delivery,
	Message
} from 'rhea-promise';

import { config } from './config/env';
import { queues } from './utils/contants';

const connection = rhea.connect({
	host: config.host,
	username: config.user,
	password: config.pass,
	port: config.port,
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
	port: config.port,
	channel_max: 1000
	// reconnect: true
};

const connection2: Connection = new Connection(connectionOptions);
const createSender = async (queue) => {
	await connection2.open();
	return await connection2.createAwaitableSender({
		name: (process.env.name || 'teste') + queue,
		target: {
			address: queue
		}
	});
};
let senders: AwaitableSender[] = [];
const createSenders = async () => {
	for (const key in queues) {
		senders.push(await createSender(queues[key]));
	}
};
createSenders();
export async function sendMessagePromise(queue, message) {
	let sender: AwaitableSender = null;
	for (const item of senders) {
		if (item.target.address === queue) {
			sender = item;
			break;
		}
	}
	if (sender === null) throw new Error('Sem conexão');
	const msg: Message = {
		body: message,
		message_id: Math.random() * 1000,
		durable: true
	};

	const a = await sender.send(msg);
	return a.settled;
}
