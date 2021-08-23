import { exampleWorker } from '@/utils';
import rhea from 'rhea';

interface consumerProps {
	queue: string;
	numberWorkers: number;
	worker: typeof exampleWorker;
}

export function consumer(props: consumerProps) {
	const connection = rhea.connect({
		host: 'localhost',
		username: 'user',
		password: 'pass',
		port: 5673,
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
