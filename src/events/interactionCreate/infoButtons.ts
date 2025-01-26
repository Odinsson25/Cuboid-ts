import type { ButtonInteraction, Client, ColorResolvable } from "discord.js";
import { EmbedBuilder, MessageFlags } from "discord.js";
import * as jsonConfig from "../../../config.json";
export default async (interaction: ButtonInteraction, client: Client) => {
	if (!interaction.isButton() || !interaction.guild) return;
	if (interaction.customId == "viewServerRoles") {
		let roleArr: string[] = [];
		let roles = "Error while getting role's";
		(await interaction.guild.roles.fetch())
			.sort((a, b) => b.position - a.position)
			.forEach((r) => {
				roleArr.push(`<@&${r.id}>`);
			});
		roles = roleArr.length > 0 ? roleArr.join(" ") : "No roles";

		const serverRolesEmbed = new EmbedBuilder()
			.setAuthor({
				name: interaction.guild.name,
				iconURL: interaction.guild.iconURL() || "",
			})
			.setColor(jsonConfig.colors.mainColor as ColorResolvable)
			.setTitle(`Roles - ${interaction.guild.name}`)
			.setDescription(`${roles}`)
			.setThumbnail(interaction.guild.iconURL())
			.setFooter({
				text: client.user?.username as string,
				iconURL: client.user?.avatarURL() || "",
			})
			.setTimestamp();
		interaction.reply({
			embeds: [serverRolesEmbed],
			flags: MessageFlags.Ephemeral,
		});
	}
	if (interaction.customId == "viewServerEmoji") {
		let emojiArr: string[] = [];
		let emojis = "Error while getting emoji's";
		(await interaction.guild.emojis.fetch()).forEach((e) => {
			const newEmoji = `<${e.animated ? "a" : ""}:${e.name}:${
				e.id
			}> - ${e.name?.replace("_", "\\_")}`;
			emojiArr.push(newEmoji);
		});
		emojis = emojiArr.length > 0 ? emojiArr.join("\n") : "No emoji's";
		const serverEmojiEmbed = new EmbedBuilder()
			.setAuthor({
				name: interaction.guild.name,
				iconURL: interaction.guild.iconURL() || "",
			})
			.setColor(jsonConfig.colors.mainColor as ColorResolvable)
			.setTitle(`Emojis - ${interaction.guild.name}`)
			.setDescription(`${emojis}`)
			.setThumbnail(interaction.guild.iconURL())
			.setFooter({
				text: client.user?.username as string,
				iconURL: client.user?.avatarURL() || "",
			})
			.setTimestamp();
		interaction.reply({
			embeds: [serverEmojiEmbed],
			flags: MessageFlags.Ephemeral,
		});
	}
};
