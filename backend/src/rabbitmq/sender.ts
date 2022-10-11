import amqpP, { Options } from 'amqplib';

import { config as configEnv } from './config/env';
import { queues } from './utils/contants';

const config: Options.Connect = {
	hostname: configEnv.host,
	username: configEnv.user,
	password: configEnv.pass,
	port: configEnv.port
};

const connection = amqpP.connect(config);

const createChannel = async (queue?: string) => {
	return connection
		.then((conn) => conn.createChannel())
		.then((ch) => {
			if (queue) {
				ch.assertQueue(queue, {
					durable: true
				});
			}
			return ch;
		});
};

let channel: amqpP.Channel;
const createChannels = async () => {
	channel = await createChannel();
	channel.assertExchange('test', 'direct', { durable: true });
	channel.assertQueue('myQueue', { durable: true });
	channel.bindQueue('myQueue', 'test', '');
};
createChannels();
export async function sendMessage(queue, msg) {
	return await channel.publish(queue, '', Buffer.from(msg));
}
