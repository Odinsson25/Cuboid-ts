require("dotenv/config");
const jsonConfig = require("./config.json");
const { REST, Routes } = require("discord.js");

const commands = [];

console.log("🔁 Clearing slash commands...");

(async () => {
	const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

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
