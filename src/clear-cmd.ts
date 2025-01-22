import "dotenv/config";
import { REST, Routes } from "discord.js";
import * as jsonConfig from "../config.json";
const commands: any = [];

console.log("🔁 Clearing slash commands...");

(async () => {
	const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

	try {
		await rest.put(Routes.applicationCommands("1218969227818434621"), {
			body: commands,
		});
		console.log(
			"✅ 1/2 | Application commands were cleared successfully.."
		);

		await rest.put(
			Routes.applicationGuildCommands(
				"1218969227818434621",
				"951575338092232805"
			),
			{
				body: commands,
			}
		);
		console.log(
			`✅ 2/2 | Guild (${"951575338092232805"}) commands were cleared successfully..`
		);

		console.log("✅ Slash commands were cleared successfully!");
	} catch (error) {
		console.log(`❌ There was an error while clearing commands: ${error}`);
	}
})();
