require('dotenv').config();

import express from 'express';

import { sendMessagePromise as activemq } from './activemq/sender';
import { sendMessagePromise as artemis } from './artemis/sender';
import { sendMessage as rabbitmq } from './rabbitmq/sender';

const app = express();

app.use(express.json());

app.get('/teste', async (req, res) => {
	return res.send('ok');
});

app.get('/artemis', async (req, res) => {
	try {
		if (await artemis('myAddress', 'Artemis')) {
			return res.send('ok');
		}
	} catch (error) {}
	return res.sendStatus(400);
});

app.get('/activemq', async (req, res) => {
	try {
		if (await activemq('myQueue', 'Active')) {
			return res.send('ok');
		}
	} catch (error) {}
	return res.sendStatus(400);
});

app.get('/rabbit', async (req, res) => {
	try {
		if (await rabbitmq('myQueue', 'Rabbit')) {
			return res.send('ok');
		}
	} catch (error) {}
	return res.sendStatus(400);
});

app.listen(3333, () => console.log('Running'));
