import express from 'express';
import { sendMessage as artemis } from './artemis/sender';
import { sendMessage as activemq } from './activemq/sender';
import { sendMessage as rabbitmq } from './rabbitmq/sender';

const app = express();

app.use(express.json());

app.get('/1', async (req, res) => {
	await artemis('myAddress', 'Artemis');
	return res.send('ok');
});

app.get('/2', async (req, res) => {
	await activemq('myQueue', 'Active');
	return res.send('ok');
});

app.get('/3', async (req, res) => {
	await rabbitmq('myQueue', 'Rabbit');
	return res.send('ok');
});

app.listen(3333, () => console.log('Running'));
