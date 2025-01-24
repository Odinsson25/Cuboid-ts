import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";

export const data: CommandData = {
	name: "ping",
	description: "Replies with Pong",
};

export const run = async ({ interaction, handler }: SlashCommandProps) => {
	interaction.reply("Pong!");
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
