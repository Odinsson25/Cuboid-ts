import { Message, messageLink } from "discord.js";
import { Punishment } from "../Enums/Profanity";

export default async (m: Message, p: Punishment) => {
	if (!m) return;
	// console.log(p);
	if (p == Punishment.None) return;
	if (p == Punishment.Delete) {
		if (m.deletable) await m.delete();
		return;
	}
	if (p == Punishment.Warn) {
		// TODO warn system uitwerken!
		if (m.deletable) await m.delete();

		return;
	}
	if (p == Punishment.Timeout) {
		if (m.deletable) await m.delete();
		if (m.member?.manageable)
			m.member.timeout(
				15 * 60 * 1000,
				"Timed out by Anti-Profanity system - Cuboid"
			);
		return;
	}
	if (p == Punishment.Kick) {
		if (m.deletable) await m.delete();

		if (m.member?.kickable)
			m.member?.kick("Kicked by Anti-Profanity system - Cuboid");

		return;
	}
	if (p == Punishment.Ban) {
		if (m.member?.bannable)
			m.member?.ban({
				reason: "Banned by Anti-Profanity system - Cuboid",
				deleteMessageSeconds: 30 * 60,
			});
		return;
	}
};
