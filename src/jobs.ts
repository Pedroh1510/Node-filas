import { consumer as artemis } from './artemis/consumer';
import { consumer as activemq } from './activemq/consumer';
import { consumer as rabbitmq } from './rabbitmq/consumer';
import { exampleWorker } from './utils';

artemis({
	queue: 'myAddress::myQueue',
	worker: exampleWorker,
	numberWorkers: 1
});

activemq({
	queue: 'myQueue',
	worker: exampleWorker,
	numberWorkers: 1
});

rabbitmq({
	queue: 'myQueue',
	worker: exampleWorker,
	numberWorkers: 1
});
