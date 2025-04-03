import {
	BaseInteraction,
	ButtonInteraction,
	ChatInputCommandInteraction,
	PermissionFlagsBits,
} from "discord.js";
import { interceptors } from "undici";
export type PermissionsString = keyof typeof PermissionFlagsBits;

export default async (
	perms: PermissionsString[],
	interaction:
		| ChatInputCommandInteraction
		| ButtonInteraction
		| BaseInteraction
) => {
	// for (let i = 0; i < perms.length; i++) {
	//     interaction.memberPermissions?.has(Permission[`${perms[i]}`])
	// }
	// interaction.member?.permissions.
	return;
};
