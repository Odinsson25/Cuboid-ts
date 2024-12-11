import { Client } from "../../classes";

/**
 *
 * @param {Client} client
 */
export default function (client: Client): void {
  console.log("ready");
  console.log(`Logged in as ${client.user.username}`);
}
