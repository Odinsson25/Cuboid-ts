import * as path from "node:path";
import getAllFiles from "./getAllFiles";
import { Command } from "../classes";

export default async function (exceptions = []): Promise<Array<Object>> {
  const localCommands: Command[] = [];
  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = (await import(commandFile)) as Command;

      if ((exceptions as Object[]).includes(commandObject.data.name)) {
        continue;
      }

      localCommands.push(commandObject as Command);
    }
  }

  return localCommands;
}
