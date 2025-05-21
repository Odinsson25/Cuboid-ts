import type {
	CommandData,
	SlashCommandProps,
	CommandOptions,
} from "commandkit";
import {
	MessageFlags,
	TextDisplayBuilder,
	ContainerBuilder,
	ComponentBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	ButtonBuilder,
	ButtonStyle,
	SectionBuilder,
} from "discord.js";
export const data: CommandData = {
	name: "botinfo",
	description: "Gives information about the bot",
};

export const run = async ({
	interaction,
	handler,
	client,
}: SlashCommandProps) => {
	await interaction.deferReply();
	const containerComponent = new ContainerBuilder();

	const seperatorComponent = new SeparatorBuilder();

	const TitleBarC = new TextDisplayBuilder().setContent("# Botinfo");
	containerComponent.addTextDisplayComponents(TitleBarC);

	containerComponent.addSeparatorComponents((separator) =>
		separator.setSpacing(SeparatorSpacingSize.Large)
	);

	const textComponent1 = new TextDisplayBuilder().setContent(
		"Invite me to your server! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	);
	const botInviteBtn = new ButtonBuilder()
		.setLabel("Invite me!")
		.setStyle(ButtonStyle.Link)
		.setURL(
			"https://discord.com/oauth2/authorize?client_id=1218969227818434621&permissions=8&scope=applications.commands+bot"
		);
	const section1 = new SectionBuilder()
		.addTextDisplayComponents(textComponent1)
		.setButtonAccessory(botInviteBtn);
	containerComponent.addSectionComponents(section1);

	containerComponent.addSeparatorComponents((separator) =>
		separator.setSpacing(SeparatorSpacingSize.Small)
	);

	const textComponent2 = new TextDisplayBuilder().setContent(
		"Need assistance? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	);
	const supServInviteBtn = new ButtonBuilder()
		.setLabel("Support Sserver")
		.setStyle(ButtonStyle.Link)
		.setURL("https://discord.gg/8Fmk6RCEKj");
	const section2 = new SectionBuilder()
		.addTextDisplayComponents(textComponent2)
		.setButtonAccessory(supServInviteBtn);
	containerComponent.addSectionComponents(section2);

	interaction.editReply({
		flags: MessageFlags.IsComponentsV2,
		components: [containerComponent],
	});
};

export const options: CommandOptions = {
	// https://commandkit.dev/docs/types/CommandOptions
};
