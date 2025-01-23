import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	AttachmentBuilder,
} from "discord.js";
export const data: CommandData = {
	name: "avatar",
	description: "View a user's avatar",
	options: [
		{
			name: "guild",
			description: "Guild avatar",
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: "user",
			description: "User avatar",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "user",
					description: "The user to view",
					type: ApplicationCommandOptionType.User,
				},
			],
		},
	],
};

export const run = async ({ interaction, handler }: SlashCommandProps) => {
	await interaction.deferReply();
	switch (interaction.options.getSubcommand()) {
		case "user":
			let user = interaction.options.getUser("user") || interaction.user;
			user = await user.fetch();
			if (!user) return;
			if (!user.avatar)
				return interaction.followUp("User does not have a avatar.");
			const dname: string =
				(user.displayName as string).substring(
					user.username.length - 1
				) == "s"
					? user.displayName + "'"
					: user.displayName + "'s";
			const userembed = new EmbedBuilder()
				.setTitle(`${dname} avatar`)
				.setColor(user.hexAccentColor || null)
				.setImage(
					`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`
				);
			interaction.followUp({ embeds: [userembed] });
			break;

		case "guild":
			const guild =
				(await interaction.guild?.fetch()) || interaction.guild;
			if (!guild?.icon)
				return interaction.followUp("User does not have a avatar.");
			const gname: string =
				(guild?.name as string).substring(guild?.name.length - 1) == "s"
					? guild?.name + "'"
					: guild?.name + "'s";
			const embed = new EmbedBuilder()
				.setTitle(`${gname} avatar`)
				.setImage(
					`https://cdn.discordapp.com/avatars/${guild.id}/${guild.icon}.png?size=4096`
				);
			interaction.followUp({ embeds: [embed] });
			break;
	}
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
