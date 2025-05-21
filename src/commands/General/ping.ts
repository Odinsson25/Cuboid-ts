import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import { MessageFlags } from "discord.js";
export const data: CommandData = {
	name: "ping",
	description: "Replies with Pong",
};

export const run = async ({
	interaction,
	handler,
	client,
}: SlashCommandProps) => {
	interaction.reply(`Pong! ${client.ws.ping}ms WS Ping`);
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
