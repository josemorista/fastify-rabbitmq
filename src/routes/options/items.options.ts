export const getItemsOptions = {
	schema: {
		response: {
			200: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: {
							type: "string",
						},
						name: {
							type: "string"
						}
					}
				}
			}
		}
	}
};

export const createItemOptions = {
	schema: {
		body: {
			type: "object",
			required: ["name"],
			properties: {
				name: {
					type: "string"
				}
			}
		},
		response: {
			201: {
			}
		}
	}
};
