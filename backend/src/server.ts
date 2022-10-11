require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { PerformanceObserver, performance } from 'node:perf_hooks';

import { sendMessagePromise as activemq } from './activemq/sender';
import { sendMessagePromise as artemis } from './artemis/sender';
import { sendMessage as kafka } from './kafka/sender';
import { sendMessage as rabbitmq } from './rabbitmq/sender';
import { sendMessage as redis, serverControllerRedis } from './redis/sender';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/teste', async (req, res) => {
	return res.send('ok');
});

app.get('/artemis', async (req, res) => {
	try {
		const start = performance.now();
		if (await artemis('myAddress', 'Artemis')) {
			const end = performance.now();
			return res.send(`${parseFloat(String(end - start)).toFixed(2)} ms`);
		}
	} catch (error) {
		console.log(error);
	}
	return res.sendStatus(400);
});

app.get('/activemq', async (req, res) => {
	try {
		const start = performance.now();
		if (await activemq('myQueue', 'Active')) {
			const end = performance.now();

			return res.send(`${parseFloat(String(end - start)).toFixed(2)} ms`);
		}
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
	}
	return res.sendStatus(400);
});

app.get('/rabbit', async (req, res) => {
	try {
		const start = performance.now();
		if (await rabbitmq('test', 'Rabbit')) {
			const end = performance.now();
			return res.send(`${parseFloat(String(end - start)).toFixed(2)} ms`);
		}
		return res.sendStatus(204);
	} catch (error) {}
	return res.sendStatus(400);
});

app.get('/redis', async (req, res) => {
	try {
		const start = performance.now();
		const data = await redis('myQueue', 'Redis');
		if (data) {
			const end = performance.now();
			return res.send(`${parseFloat(String(end - start)).toFixed(2)} ms`);
		}
	} catch (error) {}
	return res.sendStatus(400);
});

app.use('/admin/queues', serverControllerRedis.getRouter());

app.get('/kafka', async (req, res) => {
	try {
		const start = performance.now();
		if (await kafka('node-filas', 'kafka')) {
			const end = performance.now();
			return res.send(`${parseFloat(String(end - start)).toFixed(2)} ms`);
		}
	} catch (error) {}
	return res.sendStatus(400);
});

app.listen(3333, () => console.log('Running'));
