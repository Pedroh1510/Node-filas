import axios from 'axios';
import { useState } from 'react';

interface Props {
	typeSend: string;
	name: string;
}

const BoxSendMessage: React.FC<Props> = (props) => {
	const [time, setTime] = useState(null);

	async function sendMessage(type: string) {
		return axios
			.get(`http://localhost:3333/${type}`)
			.then((response) => response?.data)
			.catch(() => {
				return null;
			});
	}

	return (
		<div style={{ display: 'flex', margin: 10, width: 300 }}>
			<button
				style={{ width: 100, height: 30, marginRight: 5 }}
				onClick={async () => {
					setTime(await sendMessage(props.typeSend));
				}}
			>
				{props.name}
			</button>
			<span>Tempo de envio: {time ? time : ''}</span>
		</div>
	);
};

export default BoxSendMessage;
