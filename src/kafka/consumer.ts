import { consumerProps } from './../utils';
import { consumer as consumerConnection } from './config/connection';

const createConsumer = async () => {
	await consumerConnection.connect();
};
createConsumer();

export const consumer = async (props: consumerProps) => {
	await consumerConnection.subscribe({
		topic: props.queue,
		fromBeginning: true
	});
	consumerConnection.run({
		partitionsConsumedConcurrently: props.numberWorkers,
		autoCommit: false,
		eachMessage: async ({ topic, message, partition }) => {
			await props.worker(message.value);
		}
	});
};
