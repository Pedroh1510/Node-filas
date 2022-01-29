import { consumerProps } from '@/utils';
import amqp, { Options } from 'amqplib/callback_api';

import { config as configEnv } from './config/env';

const config: Options.Connect = {
	hostname: configEnv.host,
	username: configEnv.user,
	password: configEnv.pass,
	port: parseInt(configEnv.port)
};

export function consumer(props: consumerProps) {
	amqp.connect(config, function (err, conn) {
		if (err != null) throw err;
		conn.createChannel((err, ch) => {
			if (err != null) throw err;
			console.log('> conectado');

			ch.assertQueue(props.queue, {
				durable: true
			});
			ch.prefetch(props.numberWorkers);
			ch.consume(props.queue, async function (msg) {
				if (msg !== null) {
					try {
						await props.worker(msg.content.toString());
						ch.ack(msg);
					} catch (error) {
						ch.nack(msg, false);
					}
				}
			});
		});
	});
}
