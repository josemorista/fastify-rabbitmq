import { connect } from "amqplib";
import { queueConfig } from "../config/queue";

export class MqService {
	static async publish(message: unknown): Promise<void> {
		const connection = await connect(queueConfig.url);
		const channel = await connection.createChannel();
		channel.assertQueue(queueConfig.name);
		await channel.sendToQueue(queueConfig.name, Buffer.from(JSON.stringify(message)));
	}

	static async startConsumer(callback: (msg: string) => void | Promise<void>): Promise<void> {
		const connection = await connect(queueConfig.url);
		const channel = await connection.createChannel();
		channel.assertQueue(queueConfig.name);
		channel.consume(queueConfig.name, async (message) => {
			if (message) {
				await callback(message.content.toString());
				channel.ack(message);
			}
		});
	}
}
