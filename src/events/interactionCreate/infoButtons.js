const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const { ChatInputCommandInteraction, Client, Collection, EmbedBuilder, Interaction } = require('discord.js');
const blacklistSchema = require("../../models/Blacklist");
const jsonConfig = require("../../../config.json");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId == "viewServerRoles") {
        let roleArr = [];
        let roles = "Error while getting role's";
        (await interaction.guild.roles.fetch()).sort((a, b) => b.position - a.position).forEach(r => {
            roleArr.push(`<@&${r.id}>`)
        });
        roles = roleArr.join(", ");

        const serverRolesEmbed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
            .setColor(jsonConfig.colors.mainColor)
            .setTitle(`Roles - ${interaction.guild.name}`)
            .setDescription(`${roles}`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
            .setTimestamp();
        interaction.reply({ embeds: [serverRolesEmbed], ephemeral: true })

    };
    if (interaction.customId == "viewServerEmoji") {
        let emojiArr = [];
        let emojis = "Error while getting emoji's";
        (await interaction.guild.emojis.fetch()).forEach(e => {
            const newEmoji = `<${e.animated ? "a" : ""}:${e.name}:${e.id}> - ${(e.name).replace("_", "\\_")}`
            emojiArr.push(newEmoji)
            // console.log(newEmoji)
        });
        emojis = emojiArr.join("\n")
        const serverEmojiEmbed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
            .setColor(jsonConfig.colors.mainColor)
            .setTitle(`Emojis - ${interaction.guild.name}`)
            .setDescription(`${emojis}`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
            .setTimestamp();
        interaction.reply({ embeds: [serverEmojiEmbed], ephemeral: true })
    };

};