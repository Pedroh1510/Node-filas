import { Kafka, logLevel } from 'kafkajs';

import { config } from './env';

const kafka = new Kafka({
	clientId: 'node-filas',
	brokers: config.brokers,
	logLevel: logLevel.INFO
});
kafka.logger();
export const producer = kafka.producer({
	allowAutoTopicCreation: true
});

export const consumer = kafka.consumer({
	allowAutoTopicCreation: true,
	groupId: 'test-group'
});
