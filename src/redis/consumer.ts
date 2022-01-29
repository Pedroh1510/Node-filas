import { consumerProps } from '@/utils';
import Queue from 'bull';

import { config } from './config/env';

const myQueue = new Queue('myQueue', {
	redis: { port: config.port, host: config.host, password: config.pass }
});

export async function consumer(props: consumerProps) {
	if (props.queue === 'myQueue') {
		await myQueue.process(props.numberWorkers, async (job, done) => {
			console.log(job.data.data);

			const dataReturn = await props.worker(job.data.data);
			if (dataReturn) {
				done();
			} else {
				done(new Error('error transcoding'));
			}
		});
	}
}
