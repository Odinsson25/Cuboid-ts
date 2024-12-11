const { Client, Message } = require('discord.js');
const jsonConfig = require("../../../config.json");
const configSchema = require("../../models/ServerConfig");
const countingSchema = require("../../models/Counting");
/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
    // if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;


};