require('dotenv').config();

import express from 'express';

import { sendMessage as activemq } from './activemq/sender';
import { sendMessage as artemis } from './artemis/sender';
import { sendMessage as rabbitmq } from './rabbitmq/sender';

const app = express();

app.use(express.json());

app.get('/artemis', async (req, res) => {
	await artemis('myAddress', 'Artemis');
	return res.send('ok');
});

app.get('/activemq', async (req, res) => {
	await activemq('myQueue', 'Active');
	return res.send('ok');
});

app.get('/rabbit', async (req, res) => {
	await rabbitmq('myQueue', 'Rabbit');
	return res.send('ok');
});

app.listen(3333, () => console.log('Running'));
