import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import { EmbedBuilder } from "discord.js";
import { request } from "undici";

export const data: CommandData = {
	name: "cat",
	description: "Random cat image",
};

export const run = async ({ interaction, handler }: SlashCommandProps) => {
	// ...
	await interaction.deferReply();
	const catResult = await request(
		"https://api.thecatapi.com/v1/images/search"
	);
	const res: any = await catResult.body.json();
	const catEmbed = new EmbedBuilder()
		.setImage(res[0].url)
		.setTitle("Random cat")
		.setFooter({
			text: "Made with the API from thecatapi.com - ID: " + res[0].id,
		})
		.setColor("Random");
	await interaction.followUp({ embeds: [catEmbed] });
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
