import { Client } from "discord.js";

import { testServer } from "../../../config.json";
import areCommandsDifferent from "../../utils/areCommandsDifferent";
import getApplicationCommands from "../../utils/getApplicationCommands";
import getLocalCommands from "../../utils/getLocalCommands";
import { Command } from "../../classes";

export default async function (client: Client): Promise<void> {
  console.log("r");
  try {
    const localCommands = await getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options, deleted } = (localCommand as Command)
        .data;

      const existingCommand = await applicationCommands.cache.find(
        (cmd: any) => cmd.name === name
      );

      if (existingCommand) {
        if (deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`➕ Registered command "${name}".`);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
