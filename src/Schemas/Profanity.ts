import { Schema, model } from "mongoose";
import { Punishment } from "../Enums/Profanity";

export interface ISchema {
	guildId: string;
	strictMatch: string[];
	partialMatch: string[];
	punishment: number | null;
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
		default: Punishment.Delete,
	},
});

export default model<ISchema>("Profanity", schema);
