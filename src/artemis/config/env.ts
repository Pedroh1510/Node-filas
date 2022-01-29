export const config: envDTO = {
	host: process.env.artemis_host,
	user: process.env.artemis_user,
	pass: process.env.artemis_pass,
	port: parseInt(process.env.artemis_port)
};
