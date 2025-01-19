/**
 *
 * npm run build: turn ts into js
 * npm run dev: run the code in dev mode
 * npm run start: run js code
 *
 */

import "dotenv/config";
import mongoose from "mongoose";
import eventHandler from "./handlers/eventHandler";
// import { Client } from "./classes";
import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});
console.log(client.user?.username);

process.on("unhandledRejection", (reason, promise) => {
  console.log("❗ Unhandled Rejection Error");
  console.log(reason, promise);
});

process.on("uncaughtException", (err, origin) => {
  console.log("❗ Uncaught Exeception Error");
  console.log(err, origin);
});

(async () => {
  try {
    console.log("🔁 Connecting to database...");

    mongoose.set("strictQuery", false);
    await mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => console.log("✅ Connected to database."));
    eventHandler(client);

    client.login(process.env.BOTTOKEN);
  } catch (error) {
    console.log("❌ Connection to database failed!");
    console.log(error);
  }
})();

client.login(process.env.TOKEN);
