import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	GuildMember,
	Interaction,
	MessageFlags,
} from "discord.js";
import * as Profanity from "../../Schemas/Profanity";
import { Punishment } from "../../Enums/Profanity";
import restrictByPerms from "../../functions/restrictByPerms";
// TODO             Omzetten naar select menu met SelectMenuKit??
export const data: CommandData = {
	name: "profanity",
	description: "Replies with Pong",
	options: [
		{
			name: "words",
			description: "Guild avatar",
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [
				{
					name: "add",
					description: "Guild avatar",
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: "word-add",
							description: "The user to view",
							type: ApplicationCommandOptionType.String,
							required: true,
						},
						{
							name: "strict-add",
							description: "The user to view",
							type: ApplicationCommandOptionType.Boolean,
						},
					],
				},
				{
					name: "remove",
					description: "User avatar",
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: "word-remove",
							description: "The user to view",
							type: ApplicationCommandOptionType.String,
							required: true,
						},
						{
							name: "strict-remove",
							description: "The user to view",
							type: ApplicationCommandOptionType.Boolean,
						},
					],
				},
			],
		},
		{
			name: "config",
			description: "Guild avatar",
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [
				{
					name: "create",
					description: "Guild avatar",
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: "create-punishment",
							description: "User avatar",
							type: ApplicationCommandOptionType.Number,
							choices: [
								{ name: "None", value: Punishment.None },
								{ name: "Delete", value: Punishment.Delete },
								{ name: "Warn", value: Punishment.Warn },
								{ name: "Kick", value: Punishment.Kick },
								{ name: "Ban", value: Punishment.Ban },
							],
						},
					],
				},
				{
					name: "view",
					description: "Guild avatar",
					type: ApplicationCommandOptionType.Subcommand,
				},
				{
					name: "edit-punishment",
					description: "Guild avatar",
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: "new-punishment",
							description: "Guild avatar",
							type: ApplicationCommandOptionType.Number,
							required: true,
							choices: [
								{ name: "None", value: Punishment.None },
								{ name: "Delete", value: Punishment.Delete },
								{ name: "Warn", value: Punishment.Warn },
								{ name: "Kick", value: Punishment.Kick },
								{ name: "Ban", value: Punishment.Ban },
							],
						},
					],
				},
				{
					name: "delete",
					description: "Guild avatar",
					type: ApplicationCommandOptionType.Subcommand,
				},
			],
		},
	],
};

export const run = async ({
	interaction,
	handler,
	client,
}: SlashCommandProps) => {
	await interaction.deferReply({ flags: MessageFlags.Ephemeral });
	const list: Profanity.ISchema | null = await Profanity.default.findOne({
		guildId: interaction.guild?.id,
	});

	switch (interaction.options.getSubcommandGroup()) {
		case "config":
			switch (interaction.options.getSubcommand()) {
				case "create":
					if (list)
						return interaction.followUp(
							"A database was found for this server. You cannot create multiple!"
						);
					if (!list) {
						const newList = new Profanity.default({
							guildId: interaction.guild?.id,
							punishment:
								interaction.options.getNumber(
									"create-punishment"
								) || Punishment.Delete,
						});
						await newList.save();
						interaction.followUp(
							"New database created succesfully!"
						);
					}
					break;
				case "delete":
					// await restrictByPerms(["Administrator"], interaction);
					if (!list)
						return interaction.followUp(
							"No database found for this server."
						);
					const ar =
						new ActionRowBuilder<ButtonBuilder>().addComponents(
							new ButtonBuilder({
								customId: "confirm.profanity.delete",
								label: "Yes, delete",
								style: ButtonStyle.Danger,
								emoji: "🗑️",
							}),
							new ButtonBuilder({
								customId: "abort.profanity.delete",
								label: "No, do not remove",
								style: ButtonStyle.Primary,
							})
						);

					const response = await interaction.followUp({
						content:
							"Are you sure you want to delete your Profanity Database?\nThis action is irreversible!",
						components: [ar],
						withResponse: true,
						flags: [],
					});

					const collectorFilter = (i: any) =>
						i.user.id === interaction.user.id;

					try {
						const confirmation =
							await response.awaitMessageComponent({
								filter: collectorFilter,
								time: 20_000,
							});
						if (!confirmation) return;
						if (
							confirmation.customId === "confirm.profanity.delete"
						) {
							await Profanity.default.findOneAndDelete({
								guildId: interaction.guild?.id,
							});
							await interaction.editReply({
								content: `Profanity Database has been removed succesfully.`,
								components: [],
							});
						} else if (
							confirmation.customId === "abort.profanity.delete"
						) {
							await interaction.editReply({
								content:
									"Action cancelled, database has not been removed.",
								components: [],
							});
						}
					} catch {
						await interaction.editReply({
							content:
								"Confirmation not received within 20 seconds, cancelling",
							components: [],
						});
					}
					break;
				case "edit-punishment":
					if (!list)
						interaction.followUp(
							"No database found for this server."
						);
					if (!interaction.options.getNumber("new-punishment"))
						return;
					await Profanity.default.findOneAndUpdate(
						{
							guildId: interaction.guildId,
						},
						{
							punishment:
								interaction.options.getNumber("new-punishment"),
						}
					);
					return interaction.followUp(
						"Changed punishment succesfully!"
					);

				case "view":
					if (!list)
						return interaction.followUp(
							"No database found for this server."
						);
					const embed = new EmbedBuilder()
						.setTitle(`Profanity List - ${interaction.guild?.name}`)
						.setFields(
							{ name: "Enabled", value: `✅` },
							{
								name: "Punishment",
								value: `${
									Punishment[list.punishment as number]
								}`,
							},
							{
								name: "Strict words list",
								value: `${
									list.strictMatch.join(", ") || "None"
								}`,
							},
							{
								name: "Partial words list",
								value: `${
									list.partialMatch.join(", ") || "None"
								}`,
							}
						);
					return interaction.followUp({ embeds: [embed] });
					break;
			}

			break;

		case "words":
			if (!list)
				return interaction.followUp(
					"No database found for this server."
				);
			switch (interaction.options.getSubcommand()) {
				case "add":
					if (!list)
						interaction.followUp(
							"No database found for this server."
						);
					if (!interaction.options.getString("word-add"))
						return interaction.followUp("An error occurred.");

					if (interaction.options.getBoolean("strict-add") == true) {
						await Profanity.default.findOneAndUpdate(
							{ guildId: interaction.guildId },
							{
								$push: {
									strictMatch: interaction.options
										.getString("word-add")
										?.toLowerCase() as string,
								},
							},
							{ new: true, upsert: true }
						);

						return interaction.followUp(
							`\`${interaction.options
								.getString("word-add")
								?.toLowerCase()}\` has been added to the ${
								interaction.options.getBoolean("strict-add")
									? "strict"
									: "partial"
							} match database!`
						);
					}
					await Profanity.default.findOneAndUpdate(
						{
							guildId: interaction.guildId,
						},
						{
							$push: {
								partialMatch: interaction.options
									.getString("word-add")
									?.toLowerCase() as string,
							},
						},
						{ new: true, upsert: true }
					);
					return interaction.followUp(
						`\`${interaction.options
							.getString("word-add")
							?.toLowerCase()}\` has been added to the ${
							interaction.options.getBoolean("strict-add")
								? "strict"
								: "partial"
						} match database!`
					);

					break;

				case "remove":
					if (!list)
						interaction.followUp(
							"No database found for this server."
						);
					if (!interaction.options.getString("word-remove"))
						return interaction.followUp("An error occurred.");
					if (
						interaction.options.getBoolean("strict-remove") == true
					) {
						if (
							!list.strictMatch.includes(
								interaction.options
									.getString("word-remove")
									?.toLowerCase() as string
							)
						)
							return interaction.followUp(
								"This word is not in this server's database."
							);

						await Profanity.default.findOneAndUpdate(
							{ guildId: interaction.guildId },
							{
								$pull: {
									strictMatch: interaction.options
										.getString("word-remove")
										?.toLowerCase() as string,
								},
							},
							{ new: true, upsert: true }
						);
						return interaction.followUp(
							`\`${interaction.options
								.getString("word-remove")
								?.toLowerCase()}\` has been removed from the ${
								interaction.options.getBoolean("strict-remove")
									? "strict"
									: "partial"
							} match database!`
						);
					}

					if (
						!list.partialMatch.includes(
							interaction.options
								.getString("word-remove")
								?.toLowerCase() as string
						)
					)
						return interaction.followUp(
							"This word is not in this server's database."
						);
					await Profanity.default.findOneAndUpdate(
						{ guildId: interaction.guildId },
						{
							$pull: {
								partialMatch: interaction.options
									.getString("word-remove")
									?.toLowerCase() as string,
							},
						},
						{ new: true, upsert: true }
					);

					return interaction.followUp(
						`\`${interaction.options
							.getString("word-remove")
							?.toLowerCase()}\` has been removed from the ${
							interaction.options.getBoolean("strict-remove")
								? "strict"
								: "partial"
						} match database!`
					);
			}
			break;
	}
};

export const options: CommandOptions = {
	userPermissions: "Administrator",
	// https://commandkit.dev/docs/types/CommandOptions
};
