import type {
	ButtonInteraction,
	Client,
	ColorResolvable,
	Message,
} from "discord.js";
import { EmbedBuilder, MessageFlags } from "discord.js";
import * as jsonConfig from "../../../config.json";
import * as Profanity from "../../Schemas/Profanity";
import stringContainsArrItems from "../../functions/stringContainsArrItems";

import { CheckType, Punishment } from "../../Enums/Profanity";
export default async (message: Message, client: Client) => {
	console.log("triggered");
	if (message.author.bot) return;

	const list: Profanity.ISchema | null = await Profanity.default.findOne({
		guildId: message.guild?.id,
	});
	if (!list) {
		const newList = jsonConfig.profanityList;
		const check =
			(await stringContainsArrItems(
				message.content.toLowerCase(),
				newList.partialMatch,
				CheckType.Partial
			)) ||
			(await stringContainsArrItems(
				message.content.toLowerCase(),
				newList.strictMatch,
				CheckType.Strict
			));
		if (check == true) {
			message.delete();
		}

		return;
	}

	const check =
		(await stringContainsArrItems(
			message.content.toLowerCase(),
			list.partialMatch,
			CheckType.Partial
		)) ||
		(await stringContainsArrItems(
			message.content.toLowerCase(),
			list.strictMatch,
			CheckType.Strict
		));
	if (check == true) {
		message.delete();
	}

	return;
};
