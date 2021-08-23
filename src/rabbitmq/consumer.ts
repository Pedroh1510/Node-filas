import { consumerProps } from '@/utils';
import amqp, { Options } from 'amqplib/callback_api';

const config: Options.Connect = {
	hostname: 'localhost',
	username: 'guest',
	password: 'guest',
	port: 5674
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
