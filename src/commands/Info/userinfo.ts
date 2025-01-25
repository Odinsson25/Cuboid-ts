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
	ApplicationCommandOptionType,
	ButtonStyle,
	User,
	Guild,
	GuildMember,
} from "discord.js";
import { request } from "undici";

export const data: CommandData = {
	name: "userinfo",
	description: "Replies with general user info",
	options: [
		{
			name: "user",
			description: "The user to view",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
};
export const run = async ({ interaction, handler }: SlashCommandProps) => {
	await interaction.deferReply();
	const user: User =
		(await interaction.options.getUser("user")?.fetch(true)) ||
		(await interaction.user.fetch(true));
	const devices: string[] = [];
	const memberObject: GuildMember | undefined =
		await interaction.guild?.members.fetch(user.id);

	if (memberObject?.presence?.clientStatus?.desktop)
		devices.push("🖥️ Desktop");
	if (memberObject?.presence?.clientStatus?.web) devices.push("🌐 Website");
	if (memberObject?.presence?.clientStatus?.mobile) devices.push("📲 Mobile");

	const userEmbed = new EmbedBuilder()
		.setTitle(`User info - ${user?.displayName}`)
		.setThumbnail(user.avatarURL() || "")

		.setAuthor({
			name: interaction.user.displayName,
			iconURL: interaction.user.avatarURL() || "",
		})
		.setFields(
			{ name: "User", value: `${user}`, inline: true },
			{
				name: "Global Username",
				value: `${user?.globalName || "None set"}`,
				inline: true,
			},
			{
				name: "Status",
				value: `${memberObject?.presence?.status}`,
				inline: true,
			},
			{
				name: "Joined at",
				value: `<t:${(
					(memberObject?.joinedTimestamp || 0) / 1000
				).toFixed()}:D>`,
				inline: true,
			},
			{
				name: "Created at",
				value: `<t:${(
					(memberObject?.user.createdTimestamp || 0) / 1000
				).toFixed()}:D>`,
				inline: true,
			},
			{
				name: "Booster since",
				value: `${
					memberObject?.premiumSinceTimestamp
						? `<t:${memberObject?.premiumSinceTimestamp}:D>`
						: "Not a booster"
				}`,
				inline: true,
			},
			{ name: "User ID", value: `${user.id}`, inline: true },
			{
				name: "Online devices",
				value: `${
					devices.length > 0 ? devices.join("\n") : "Not online"
				}`,
				inline: true,
			}

			// { name: "Activities", value: `${userActivities?.join("\n") || "No activities"}`, inline: false },
		);
	// const rolesBtn = new ButtonBuilder()
	// 	.setCustomId("viewServerRoles")
	// 	.setLabel("View roles")
	// 	.setEmoji("🏴")
	// 	.setStyle(ButtonStyle.Primary);
	// const emojiBtn = new ButtonBuilder()
	// 	.setCustomId("viewServerEmoji")
	// 	.setLabel("View emoji")
	// 	.setEmoji("😄")
	// 	.setStyle(ButtonStyle.Primary);

	// const infoBtnRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
	// 	rolesBtn,
	// 	emojiBtn
	// );

	interaction.followUp({
		embeds: [userEmbed],
		//  components: [infoBtnRow]
	});
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
