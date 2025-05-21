import { Schema, model } from "mongoose";
import { Punishment } from "../Enums/Profanity";

export interface ISchema {
	guildId: string;
	userId: string;
	warnId: string;
	reason: string;
	mod: string;
	givenDate: string;
}
const schema = new Schema<ISchema>({
	guildId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	warnId: {
		type: String,
		default: crypto.randomUUID(),
	},
	reason: {
		type: String,
		required: true,
	},
	mod: {
		type: String,
		required: true,
	},
	givenDate: {
		type: String,
		required: true,
	},
});

export default model<ISchema>("Profanity", schema);
