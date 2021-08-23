import rhea from 'rhea';

const connection = rhea.connect({
	host: 'localhost',
	username: 'user',
	password: 'pass',
	port: 5673,
	container_id: 'prod'
});

export async function sendMessage(queue, message) {
	return new Promise((resolve, reject) => {
		const sender = connection.open_sender(queue);
		sender.on('sendable', (context) => {
			const response = context.sender.send({
				body: message,
				durable: true,
				creation_time: new Date()
			});
			sender.detach();
			sender.close();
			resolve(response);
		});
		sender.on('disconnected', () => {
			sender.close();
			return reject();
		});
		connection.on('disconnected', () => {
			sender.close();
			return reject();
		});
	});
}
