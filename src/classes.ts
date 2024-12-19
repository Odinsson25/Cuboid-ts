import * as djs from "discord.js";

class Client extends djs.Client<true> {
  cooldowns: Object = {};
  constructor() {
    super({
      intents: [
        djs.GatewayIntentBits.Guilds,
        djs.GatewayIntentBits.GuildMembers,
        djs.GatewayIntentBits.GuildMessages,
        djs.GatewayIntentBits.GuildVoiceStates,
        djs.GatewayIntentBits.GuildPresences,
        djs.GatewayIntentBits.MessageContent,
        djs.GatewayIntentBits.GuildEmojisAndStickers,
      ],
    });
  }
}

class Command {
  public data: {
    name: string;
    description: string;
    devOnly: boolean;
    testOnly: boolean;
    options: any[];
    deleted: boolean;
    permissionsRequired: string[];
    callback: (client: Client, interaction: any) => any;
  };

  constructor() {
    this.data = {
      name: "",
      description: "No description set",
      devOnly: false,
      testOnly: false,
      options: [],
      deleted: false,
      permissionsRequired: [],
      callback: () => {},
    };
  }

  setName(name: string): this {
    this.data.name = name;
    return this; // return 'this' for chainability
  }

  setDescription(description: string): this {
    this.data.description = description;
    return this;
  }

  setDevOnly(devOnly: boolean): this {
    this.data.devOnly = devOnly;
    return this;
  }

  setTestOnly(testOnly: boolean): this {
    this.data.testOnly = testOnly;
    return this;
  }

  setOptions(options: any[]): this {
    this.data.options = options;
    return this;
  }

  setPermissionsRequired(permissions: string[]): this {
    this.data.permissionsRequired = permissions;
    return this;
  }

  callback(callback: (client: Client, interaction: any) => void): this {
    this.data.callback = callback;
    return this;
  }

  setDeleted(deleted: boolean): this {
    this.data.deleted = deleted;
    return this;
  }

  getData() {
    return this.data;
  }
}
/**
// Voorbeeld van hoe je het kunt gebruiken:
const command = new Command()
  .setName("testCommand")
  .setDescription("This is a test command")
  .setDevOnly(true)
  .setTestOnly(false)
  .setOptions([{ type: "string", name: "example" }])
  .setPermissionsRequired(["ADMIN"])
  .setCallback((client, interaction) => {
    console.log("Command executed");
  })
  .setDeleted(false);

console.log(command.getData());
*/

export { Client, Command };
