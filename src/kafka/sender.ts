import { producer } from './config/connection';

const createProducer = async () => {
	await producer.connect();
};
createProducer();
export const sendMessage = async (topic, message) => {
	const a = await producer.send({
		messages: [{ value: message }],
		topic: topic
	});

	return a[0].errorCode === 0;
};
