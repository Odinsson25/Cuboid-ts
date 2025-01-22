import { Schema, model } from "mongoose";

export interface ISchema {
	guildId: string;
	roles: {
		moderation: string[];
		management: string[];
	};
	channels: {
		logs: {
			ticketLogs: string;
			modLogs: string;
			joinLogs: string;
			messageLogs: string;
		};
		greetings: {
			welcomeChannel: string;
			leaveChannel: string;
			boosterChannel: string;
		};
	};
	modulesEnabled: {};
	settings: {};
}
const schema = new Schema<ISchema>({
	guildId: {
		type: String,
		required: true,
	},
	roles: {},
	channels: {},
	modulesEnabled: {},
	settings: {},
});

export default model("GuildConfig", schema);
