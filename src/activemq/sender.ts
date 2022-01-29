import rhea from 'rhea';

import { config } from './config/env';

const connection = rhea.connect({
	host: config.host,
	username: config.user,
	password: config.pass,
	port: config.port,
	container_id: 'prod'
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
