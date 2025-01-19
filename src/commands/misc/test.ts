import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../../classes";

const command = new Command()
  .setName("ping")
  .setDescription("Test bot commands")
  .setDevOnly(false)
  .setTestOnly(false)
  .setOptions([{ type: ApplicationCommandOptionType.String, name: "example" }])
  .setPermissionsRequired([
    PermissionFlagsBits.Administrator,
    PermissionFlagsBits.SendMessages,
  ])
  .setDeleted(false)

  .callback(async (client, interaction) => {
    interaction.reply("Yippie!");

    console.log("Command executed! This works");
  });

export default command.data;
