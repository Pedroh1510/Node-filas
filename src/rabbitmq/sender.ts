import amqpP, { Options } from 'amqplib';

import { config as configEnv } from './config/env';

const config: Options.Connect = {
	hostname: configEnv.host,
	username: configEnv.user,
	password: configEnv.pass,
	port: configEnv.port
};

const connection = amqpP.connect(config);

export async function sendMessage(queue, msg) {
	return connection
		.then((conn) => conn.createChannel())
		.then((ch) =>
			ch
				.assertQueue(queue, {
					durable: true
				})
				.then(() => ch.sendToQueue(queue, Buffer.from(msg)))
		);
}
