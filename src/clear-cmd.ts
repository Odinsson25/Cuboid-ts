import "dotenv/config";
import { REST, Routes } from "discord.js";
import * as jsonConfig from "../config.json";
const commands: Object = [
  // {
  //   name: 'hey',
  //   description: 'Replies with hey!',
  // },
  // {
  //   name: 'ping',
  //   description: 'Pong!',
  // },
];
console.log("🔁 Clearing slash commands...");

(async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

  try {
    await rest.put(Routes.applicationCommands(jsonConfig.clientId), {
      body: commands,
    });
    console.log("✅ 1/2 | Application commands were cleared successfully..");

    await rest.put(
      Routes.applicationGuildCommands(
        jsonConfig.clientId,
        jsonConfig.testServer
      ),
      {
        body: commands,
      }
    );
    console.log(
      `✅ 2/2 | Guild (${jsonConfig.testServer}) commands were cleared successfully..`
    );

    console.log("✅ Slash commands were cleared successfully!");
  } catch (error) {
    console.log(`❌ There was an error while clearing commands: ${error}`);
  }
})();
