import { Schema, model } from "mongoose";

export interface ISchema {
	guildId: string;
	strictMatch: string[];
	partialMatch: string[];
	punishment: string | number | null;
}
const schema = new Schema<ISchema>({
	guildId: {
		type: String,
		required: true,
	},
	strictMatch: [],
	partialMatch: [],
	punishment: {
		type: String || Number || null,
		default: null,
	},
});

export default model("Profanity", schema);
