import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import { EmbedBuilder, ChannelType } from "discord.js";

export const data: CommandData = {
	name: "ping",
	description: "Replies with Pong",
};

export const run = ({ interaction, handler }: SlashCommandProps) => {
	let bots =
		(interaction.guild?.memberCount || 0) -
		(interaction.guild?.members.cache.filter((u) => u.user.bot != true)
			.size || 1000000000000000);
	const userEmbed = new EmbedBuilder()
		.setTitle(`Server info - ${interaction.guild?.name}`)
		.setThumbnail(interaction.guild?.iconURL() || "")
		.setAuthor({
			name: interaction.user.displayName,
			iconURL: interaction.user.avatarURL() || "",
		})
		.setFields(
			{
				name: "Members",
				value: `${interaction.guild?.memberCount}`,
				inline: true,
			},
			{ name: "Bots", value: `${bots >= 0 ? bots : 0}`, inline: true },
			{
				name: "Roles",
				value: `${interaction.guild?.roles.cache.size}`,
				inline: true,
			},
			{
				name: "Channels",
				value: `${
					interaction.guild?.channels.cache.filter(
						(c) => c.type === ChannelType.GuildText
					).size
				}`,
				inline: true,
			},
			{
				name: "Categories",
				value: `${
					interaction.guild?.channels.cache.filter(
						(c) => c.type === ChannelType.GuildCategory
					).size
				}`,
				inline: true,
			},
			{
				name: "Voice Channels",
				value: `${
					interaction.guild?.channels.cache.filter(
						(c) =>
							c.type === ChannelType.GuildVoice ||
							c.type === ChannelType.GuildStageVoice
					).size
				}`,
				inline: true,
			}
		);

	interaction.followUp({ embeds: [userEmbed] });
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
