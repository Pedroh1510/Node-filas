import { exampleWorker } from '@/utils';
import amqpP, { Options } from 'amqplib';

const config: Options.Connect = {
	hostname: 'localhost',
	username: 'guest',
	password: 'guest',
	port: 5674
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
