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
import handleProfanity from "../../functions/handleProfanity";
export default async (message: Message, client: Client) => {
	// console.log("triggered");
	if (message.author.bot) return;

	const list: Profanity.ISchema | null = await Profanity.default.findOne({
		guildId: message.guild?.id,
	});
	if (!list) {
		console.log("no list found");
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
			await handleProfanity(message, Punishment.Delete);
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
		// await message.delete();
		await handleProfanity(message, list.punishment || Punishment.Delete);
	}

	return;
};
