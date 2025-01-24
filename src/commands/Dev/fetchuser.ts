import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import {
	EmbedBuilder,
	ApplicationCommandOptionType,
	MessageFlags,
	ColorResolvable,
} from "discord.js";
import * as jsonConfig from "../../../config.json";
import { request } from "undici";
// import handleApi from "../../functions/handleApi";
import { devs } from "../../../config.json";

export const data: CommandData = {
	name: "fetchuser",
	description: "Fetch a user",
	options: [
		{
			name: "usertag",
			description: "The user to fetch",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
		{
			name: "userid",
			description: "The user to fetch",
			type: ApplicationCommandOptionType.String,
			required: false,
		},
	],
};

export const run = async ({
	interaction,
	client,
	handler,
}: SlashCommandProps) => {
	if (!devs.includes(interaction.user.id))
		return interaction.followUp("You are not a developer");
	if (!handler.devUserIds.includes(interaction.user.id))
		return interaction.followUp("You are not a developer");

	await interaction.deferReply({ flags: MessageFlags.Ephemeral });

	const userOption = interaction.options.getUser("usertag");
	const userIdOption = interaction.options.getString("userid");
	if (userOption && userIdOption)
		return interaction.followUp("You cannot select both options.");
	if (!userOption && !userIdOption)
		return interaction.followUp("You must select one of the options.");
	if (userOption) {
		const user = await userOption.fetch(true).catch((e) => {
			interaction.followUp(`Failed to fetch user.\n${e}`);
		});

		const userAPI = await request(
			`https://discord.com/api/v10/users/${user?.id}`
		);

		const userRes = await userAPI.body.json();
		console.log(userRes);
		const member = await interaction.guild?.members
			.fetch(userOption)
			.catch((e) => {
				interaction.followUp(`Failed to fetch member.\n${e}`);
			});
		if (!user) return interaction.followUp("Failed to fetch user.");
		if (!member) return interaction.followUp("Failed to fetch member.");
		const embed = new EmbedBuilder()
			.setTitle(`Fetched data of user ${user.username} - ${user.id}`)
			.setColor(jsonConfig.colors.mainColor as ColorResolvable)
			.setDescription(
				`\`\`\`${JSON.stringify(user.toJSON(), null, " ")}\`\`\``
			);
		const embed2 = new EmbedBuilder()
			.setTitle(`Fetched data of member ${user.username} - ${user.id}`)
			.setColor(jsonConfig.colors.mainColor as ColorResolvable)
			.setDescription(
				`\`\`\`${JSON.stringify(member.toJSON(), null, " ")}\`\`\``
			);

		interaction.followUp({ embeds: [embed, embed2] });
		return;
	}
	if (userIdOption) {
		const user = await client.users.fetch(userIdOption).catch((e) => {
			interaction.followUp(`Failed to fetch user.\n${e}`);
		});
		if (!user) return interaction.followUp("Failed to fetch user.");

		const embed = new EmbedBuilder()
			.setTitle(`Fetched data of ${user.username} - ${user.id}`)
			.setColor(jsonConfig.colors.mainColor as ColorResolvable)
			.setDescription(
				`\`\`\`${JSON.stringify(user.toJSON(), null, " ")}\`\`\``
			);

		interaction.followUp({ embeds: [embed] });
		return;
	}
};

export const options: CommandOptions = {
	devOnly: true,
};
