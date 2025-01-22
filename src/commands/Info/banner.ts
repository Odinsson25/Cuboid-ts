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
  name: "banner",
  description: "View a user's banner",
  options: [
    {
      name: "user",
      description: "The user to view",
      type: ApplicationCommandOptionType.User,
    },
  ],
};

export const run = async ({ interaction, handler }: SlashCommandProps) => {
  await interaction.deferReply();
  let user = interaction.options.getUser("user") || interaction.user;
  user = await user.fetch();
  if (!user) return;
  if (!user.banner) return interaction.followUp("User does not have a banner.");
  const dname: string =
    (interaction.user.displayName as string).substring(
      interaction.user.username.length - 5
    ) == "s"
      ? interaction.user.displayName + "'"
      : interaction.user.displayName + "'s";
  const embed = new EmbedBuilder()
    .setTitle(`${dname} banner`)
    .setColor(user.hexAccentColor || null)
    .setImage(
      `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=4096`
    );
  interaction.followUp({ embeds: [embed] });
};

export const options: CommandOptions = {
  // https://commandkit.dev/docs/types/CommandOptions
};
