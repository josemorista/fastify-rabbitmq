import fastify from "fastify";
import { itemsRoutes } from "./routes/items.routes";
import fastifySwagger from "fastify-swagger";
import { MqService } from "./services/MqService";

const app = fastify({
	logger: true
});

app.register(fastifySwagger, {
	exposeRoute: true,
	routePrefix: "/docs",
	swagger: {
		info: {
			version: "3",
			title: "Fastify rabbitMq"
		}
	}
});

app.register(itemsRoutes);

app.listen(process.env.port || 3333, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(address);

	MqService.startConsumer((msg) => {
		console.log(JSON.stringify(JSON.parse(msg)));
	});
});
