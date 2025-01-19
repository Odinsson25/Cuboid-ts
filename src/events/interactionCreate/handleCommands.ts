import { devs, testServer } from "../../../config.json";
import { GuildMember, Interaction, Client } from "discord.js";
import getLocalCommands from "../../utils/getLocalCommands";
import { Command } from "../../classes";

// const blacklistSchema = require("../../models/Blacklist");

/**
 *
 * @param {Client} client
 * @param {ChatInputCommandInteraction} interaction
 * @returns
 */
export = async function (
  client: Client,
  interaction: Interaction
): Promise<void> {
  if (interaction.isChatInputCommand()) {
    if (!interaction.guild || !interaction.member) return;
    const localCommands = await getLocalCommands();

    try {
      const commandObject = localCommands.find(
        (cmd: any) => cmd.name === interaction.commandName
      ) as Command;

      if (!commandObject) return;

      if (commandObject.data.devOnly) {
        if (!devs.includes((interaction.member as GuildMember).id)) {
          interaction.reply({
            content: "Only developers are allowed to run this command.",
            ephemeral: true,
          });
          return;
        }
      }

      if (commandObject.data.testOnly) {
        if (!(interaction.guild.id === testServer)) {
          interaction.reply({
            content: "This command cannot be ran here.",
            ephemeral: true,
          });
          return;
        }
      }
      /**
      const blacklistDb = await blacklistSchema.findOne({
        id: 1,
      });
      if (
        blacklistDb?.users?.includes(interaction.user.id) &&
        !commandObject.data.devOnly
      ) {
        interaction.reply({
          content:
            "You are on the blacklist of this bot. This means you cannot execute commands.\nPlease contact our support team if you think this is a mistake.",
          ephemeral: true,
        });
        return;
      }

      if (
        blacklistDb?.guilds?.includes(interaction.guild.id) &&
        !commandObject.data.devOnly
      ) {
        interaction.reply({
          content:
            "This guild is on the blacklist of this bot. This means you cannot execute commands in this server.\nIf you wish to appeal, please contact our support team if you think this is a mistake.",
          ephemeral: true,
        });
        return;
      }
        */

      if (commandObject.data.permissionsRequired?.length) {
        for (const permission of commandObject.data.permissionsRequired) {
          if (!interaction.memberPermissions?.has(permission)) {
            interaction.reply({
              content:
                "You do not have enough permissions. `" +
                commandObject.data.permissionsRequired.join(", ") +
                "`",
              ephemeral: true,
            });
            return;
          }
        }
      }

      if (commandObject.data.botPermissions?.length) {
        for (const permission of commandObject.data.botPermissions) {
          const bot = interaction.guild.members.me;
          if (!bot) return;

          if (!bot.permissions.has(permission)) {
            interaction.reply({
              content: "I do not have enough permissions.",
              ephemeral: true,
            });
            return;
          }
        }
      }
      /** const { cooldowns } = client;
      if (!cooldowns[commandObject.data.name]) {
        cooldowns.set(commandObject.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns[commandObject.data.name];
      const defaultCooldownDuration = 3;
      const cooldownAmount =
        (commandObject.data.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1_000);
          interaction.reply({
            content: `Please wait, you are on a cooldown for \`${commandObject.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
            ephemeral: true,
          });
          return;
        }
      }
 */
      await commandObject.data.callback(client, interaction);
      console.log(`=-= ${
        interaction.commandName ||
        interaction.command?.name ||
        commandObject.data.name
      } / ${interaction.commandId || interaction.command?.id} executed.
       By ${interaction.user.username}/${interaction.user.id} in G${
        interaction.guild.id
      }/C${interaction.channel?.id}`);

      // timestamps.set(interaction.user.id, now);
      // setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    } catch (error) {
      console.log(error);
      try {
        await interaction.reply({
          content:
            "Something whent wrong executing this command. Try again later, or create a ticket in the support server.",
          ephemeral: true,
        });
      } catch (error) {
        try {
          await interaction.editReply({
            content:
              "Something whent wrong executing this command. Try again later, or create a ticket in the support server.",
          });
        } catch (error) {}
      }
    }
  } else if (interaction) {
  } else {
    return;
  }
};
