import { consumerProps } from '@/utils';
import rhea from 'rhea';

import { config } from './config/env';

export function consumer(props: consumerProps) {
	const connection = rhea.connect({
		host: config.host,
		username: config.user,
		password: config.pass,
		port: config.port,
		receiver_options: { credit_window: 0, autoaccept: false },
		reconnect: true,
		idle_time_out: 5000
	});
	connection.on('connection_open', () => {
		console.log('> conectado');
	});
	connection.on('disconnected', () => {
		console.log('> desconectado');
	});
	connection.open_receiver(props.queue);
	connection.on('receiver_open', (context) => {
		context.receiver.flow(props.numberWorkers);
	});

	connection.on('message', async (context) => {
		try {
			await props.worker(context.message.body);
			context.delivery.accept();
		} catch (error) {
			console.log({ errorMsg: error.message });
			context.delivery.reject();
		}
		context.receiver.add_credit(1);
	});
}
