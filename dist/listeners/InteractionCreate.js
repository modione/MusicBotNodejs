"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = require("../Commands");
exports.default = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand() || interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};
const handleSlashCommand = async (client, interaction) => {
    const slashCommand = Commands_1.Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({ content: "An error has occurred" });
        return;
    }
    await interaction.deferReply();
    console.log(`Command "${interaction.commandName}" played on ${interaction.guild.name} by ${interaction.user.tag}`);
    try {
        slashCommand.run(client, interaction);
    }
    catch (e) {
        console.error("An Error occured: " + e);
        await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setDescription("An error occured!").setColor(discord_js_1.Colors.Red)] });
    }
};
