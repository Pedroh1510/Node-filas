export const config: envDTO = {
	host: process.env.redis_host,
	user: process.env.redis_user,
	pass: process.env.redis_pass,
	port: parseInt(process.env.redis_port)
};
