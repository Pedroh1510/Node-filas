import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import Queue from 'bull';

import { config } from './config/env';

const myQueue = new Queue('myQueue', {
	redis: { port: config.port, host: config.host, password: config.pass }
});

export async function sendMessage(queue, message) {
	if (queue === 'myQueue') {
		const data = await myQueue.add(
			{ data: message },
			{ removeOnComplete: true }
		);
		return data.id;
	}
	return 0;
}

const serverAdapter = new ExpressAdapter();
createBullBoard({
	queues: [new BullAdapter(myQueue)],
	serverAdapter: serverAdapter
});
serverAdapter.setBasePath('/admin/queues');
export const serverControllerRedis = serverAdapter;
