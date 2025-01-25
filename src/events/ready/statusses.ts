import { ActivityType } from "discord.js";
import * as jsonConfig from "../../../config.json";

import type { Client } from "discord.js";
export default (client: Client<true>) => {
	let statusses = [
		{
			name: "Cuboid Development",
			type: ActivityType.Custom,
		},
		{
			name: "© Cuboid",
			type: ActivityType.Custom,
		},
		{
			name: `Join de support Server!`,
			type: ActivityType.Custom,
		},
		{
			name: "Invite mij in jouw server!",
			type: ActivityType.Custom,
		},
		{
			name: "Hulp nodig? Open een ticket!",
			type: ActivityType.Custom,
		},
		{
			name: "Server link in beschrijving!",
			type: ActivityType.Custom,
		},
	];

	let statusCount = -1;
	setInterval(() => {
		statusCount++;
		if (statusCount === statusses.length) statusCount = 0;

		client.user?.setActivity(statusses[statusCount]);
	}, 5 * 1000);
};
