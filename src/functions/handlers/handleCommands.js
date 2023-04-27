const { token } = process.env;
//const { REST } = require('@discordjs/rest');
//const { Routes } = require('discord-api-types/v9');
const { REST, Routes } = require('discord.js');
const fs = require("fs");

//const { commands, commandArray } = client;

module.exports = (client) => {
  const { commands, commandArray } = client;
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      //const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        //commandArray.push(command, command.data.toJSON());
        commandArray.push(command.data.toJSON());
        console.log(command.data.name);
      }
    }

    console.log(commandArray);
    const clientID = "1023350453452410900";
    const guildID = "1010145294333268079";
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
        body: commandArray,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
