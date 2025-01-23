import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import {
	EmbedBuilder,
	ChannelType,
	GuildPremiumTier,
	ActionRowBuilder,
	ButtonBuilder,
	Emoji,
	ButtonStyle,
} from "discord.js";

export const data: CommandData = {
	name: "serverinfo",
	description: "Replies general serverinfo",
};

export const run = async ({ interaction, handler }: SlashCommandProps) => {
	await interaction.deferReply();
	const { guild } = interaction;
	const boosts: string[] = [];

	if (
		guild?.premiumSubscriptionCount &&
		guild?.premiumSubscriptionCount > 0
	) {
		boosts.push(`${guild?.premiumSubscriptionCount} boosts`);
	}
	if (
		!(
			guild?.premiumTier == GuildPremiumTier.None ||
			guild?.premiumTier == null ||
			guild?.premiumTier == undefined
		)
	) {
		boosts.push(`Boost tier ${guild?.premiumTier}`);
	}
	let bots =
		(guild?.memberCount || 0) -
		(guild?.members.cache.filter((u) => u.user.bot != true).size ||
			1000000000000000);

	const rolesBtn = new ButtonBuilder()
		.setCustomId("viewServerRoles")
		.setLabel("View roles")
		.setEmoji("😄")
		.setStyle(ButtonStyle.Primary);
	const emojiBtn = new ButtonBuilder()
		.setCustomId("viewServerEmoji")
		.setLabel("View emoji")
		.setEmoji("🏴")
		.setStyle(ButtonStyle.Primary);

	const infoBtnRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
		rolesBtn,
		emojiBtn
	);

	const userEmbed = new EmbedBuilder()
		.setTitle(`Server info - ${guild?.name}`)
		.setThumbnail(guild?.iconURL() || "")
		.setAuthor({
			name: interaction.user.displayName,
			iconURL: interaction.user.avatarURL() || "",
		})
		.setFields(
			{
				name: "Members",
				value: `${guild?.memberCount}`,
				inline: true,
			},
			{ name: "Bots", value: `${bots >= 0 ? bots : 0}`, inline: true },
			{
				name: "Roles",
				value: `${guild?.roles.cache.size}`,
				inline: true,
			},
			{
				name: "Channels",
				value: `${
					guild?.channels.cache.filter(
						(c) => c.type === ChannelType.GuildText
					).size
				}`,
				inline: true,
			},
			{
				name: "Categories",
				value: `${
					guild?.channels.cache.filter(
						(c) => c.type === ChannelType.GuildCategory
					).size
				}`,
				inline: true,
			},
			{
				name: "Voice Channels",
				value: `${
					guild?.channels.cache.filter(
						(c) =>
							c.type === ChannelType.GuildVoice ||
							c.type === ChannelType.GuildStageVoice
					).size
				}`,
				inline: true,
			},
			{
				name: "Boosts",
				value: `${
					boosts.length > 0 ? boosts.join(", ") : "No server boosts"
				}`,
				inline: true,
			},
			{
				name: "Emoji's",
				value: `${guild?.emojis.cache.size}`,
				inline: true,
			},
			{
				name: "Voice Channels",
				value: `${
					guild?.channels.cache.filter(
						(c) =>
							c.type === ChannelType.GuildVoice ||
							c.type === ChannelType.GuildStageVoice
					).size
				}`,
				inline: true,
			}
		);

	interaction.followUp({ embeds: [userEmbed], components: [infoBtnRow] });
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
