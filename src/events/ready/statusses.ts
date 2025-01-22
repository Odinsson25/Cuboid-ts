import { ActivityType } from "discord.js";
import * as jsonConfig from "../../../config.json";

import type { Client } from "discord.js";
export default (client: Client<true>) => {
  let statusses = [
    {
      name: "Welkom in Breda!",
      type: ActivityType.Custom,
    },
    {
      name: "BredaV2!",
      type: ActivityType.Custom,
    },
    {
      name: "met de spelers",
      type: ActivityType.Playing,
    },
    {
      name: `Join de game! Code: `,
      type: ActivityType.Custom,
    },
    {
      name: "Invite je vrienden om mee te spelen!",
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
