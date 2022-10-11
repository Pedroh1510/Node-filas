import type { NextPage } from 'next';
import Head from 'next/head';
import BoxSendMessage from '../components/boxSendMessage';
import styles from '../styles/Home.module.css';

const sendMessageOptions = [
	{ name: 'ActiveMQ', typeSend: 'activemq' },
	{ name: 'Artemis', typeSend: 'artemis' },
	{ name: 'RabbitMQ', typeSend: 'rabbit' },
	{ name: 'Redis', typeSend: 'redis' },
	{ name: 'Kafka', typeSend: 'kafka' }
];

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>NodeFilas</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Node filas</h1>
				<div>
					{sendMessageOptions.map((item) => (
						<BoxSendMessage
							name={item.name}
							typeSend={item.typeSend}
							key={item.typeSend}
						/>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;
