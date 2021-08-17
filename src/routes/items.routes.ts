import { FastifyPluginCallback } from "fastify";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { MqService } from "../services/MqService";
import { getItemsOptions, createItemOptions } from "./options/items.options";

export const itemsRoutes: FastifyPluginCallback = (fastify, _, done) => {

	const repository = new ItemsRepository();

	fastify.get("/items", getItemsOptions, async (_, reply): Promise<void> => {
		reply.send(await repository.all());
	});

	fastify.post<{ Body: { name: string } }>("/items", createItemOptions, async (request, reply): Promise<void> => {
		try {
			await repository.create(request.body.name);
			reply.status(201);
			MqService.publish({ "event": "creation", data: { name: request.body.name } }).finally();
			reply.send();
		} catch (error) {
			console.error(error);
			reply.status(400);
		}
	});

	done();
};
