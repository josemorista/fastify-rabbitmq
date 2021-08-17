import { nanoid } from "nanoid";
import { Item } from "../models/Item";

let instance: null | ItemsRepository = null;
export class ItemsRepository {

	private items: Array<Item>;

	constructor() {
		this.items = [];
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	async all(): Promise<Array<Item>> {
		return this.items;
	}

	async create(name: string): Promise<void> {
		const item = new Item(nanoid(), name);
		this.items.push(item);
	}
}


