import * as path from "path";
import getAllFiles from "../utils/getAllFiles";
import { Client } from "../classes";

export default function eventHandler(client: Client): void {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a: any, b: any) => a > b);

    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    console.log(eventName);
    console.log(eventFolder);
    console.log(eventFiles);
    client.on(eventName, async (arg: any) => {
      for (const eventFile of eventFiles) {
        console.log(eventFile);
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
}
