import { Command } from "../../classes";

const command = new Command()
  .setName("ping")
  .setDescription("Test bot commands")
  .setDevOnly(false)
  .setTestOnly(false)
  .setOptions([{ type: "string", name: "example" }])
  .setPermissionsRequired(["ADMIN"])
  .setDeleted(false)

  .callback(async (client, interaction) => {
    console.log("Command executed! This works");
  });

export default command.data;
