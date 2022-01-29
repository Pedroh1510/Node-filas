export const config: envDTO = {
	host: process.env.rabbit_host,
	user: process.env.rabbit_user,
	pass: process.env.rabbit_pass,
	port: parseInt(process.env.rabbit_port)
};
