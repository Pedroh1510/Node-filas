export const exampleWorker = async (message) => {
	console.log('> Receive: ' + message);
	console.log('> Finish');
	return true;
};

export interface consumerProps {
	queue: string;
	numberWorkers: number;
	worker: typeof exampleWorker;
}
