const { Client, Message } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const cooldowns = new Set();
const jsonConfig = require("../../../config.json")
function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

  const xpToGive = getRandomXp(2, 25);
  console.log(xpToGive)
  const query = {
    userId: message.author.id,
    guildId: message.guild.id,
  };

  try {
    const level = await Level.findOne(query);

    if (level) {
      level.xp += xpToGive;

      if (level.xp > calculateLevelXp(level.level , jsonConfig.configs.xpFactor)) {
        // level.xp = (await level.xp - calculateLevelXp(level.level));
        level.level += 1;

        message.channel.send(`🎉 ${message.member} you have leveled up to **level ${level.level}**.`);
      }
      await level.save().catch((e) => {
        console.log(e);
        return;
      });
      switch (level.level) {
        case 5:
        await message.member.roles.add(jsonConfig.roles.levels["5"]);
          break;

        case 20:
          await message.member.roles.add(jsonConfig.roles.levels["20"]);

          break;

        case 50:
          await message.member.roles.add(jsonConfig.roles.levels["50"]);

          break;

        case 100:
          await message.member.roles.add(jsonConfig.roles.levels["100"]);

          break;


      }
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 60000);
    }

    // if (!level)
    else {
      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      });

      await newLevel.save();
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 60000);
    }
  } catch (error) {
    console.log(error);
  }
};