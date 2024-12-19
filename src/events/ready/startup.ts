import { Client } from "../../classes";
export default (client: Client): void => {
  console.log("ready");
  console.log(`Logged in as ${client.user.username}`);
};
