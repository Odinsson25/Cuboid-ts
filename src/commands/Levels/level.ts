import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";

export const data: CommandData = {
  name: "level",
  description: "Level command",
};

export const run = ({ interaction, handler }: SlashCommandProps) => {
  interaction.reply("Pong!");
};

export const options: CommandOptions = {};
