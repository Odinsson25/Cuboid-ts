import type { Message, Client, GuildMember, ColorResolvable } from "discord.js";
import type { CommandKit } from "commandkit";
import { EmbedBuilder } from "discord.js";
import * as jsonConfig from "../../../config.json";
export default function (
  member: GuildMember,
  client: Client<true>,
  handler: CommandKit
) {
  const leaveEmbed = new EmbedBuilder()
    .setAuthor({
      name: member.user.username,
      iconURL:
        member.user.avatarURL() ||
        member.user.defaultAvatarURL ||
        member.user.displayAvatarURL(),
      url: `https://discord.com/users/${member.user.id}/`,
    })
    .setTitle("Tot ziens!")
    .setColor(jsonConfig.colors.mainColor as ColorResolvable)
    .setThumbnail(member.user.avatarURL())
    .setDescription(`Tot ziens ${member}! Hopelijk zien we je snel terug!`)
    .setFooter({
      text: `${member.guild.name.toString()}`,
      iconURL: member.guild.iconURL() || "",
    })
    .setTimestamp();
  member.guild.systemChannel?.send({ embeds: [leaveEmbed] });
}
