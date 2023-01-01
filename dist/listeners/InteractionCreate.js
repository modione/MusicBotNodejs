"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = require("../Commands");
const Bot_1 = require("../Bot");
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
        await Bot_1.webhook.send({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle("Slash Command")
                    .setColor("Green")
                    .addFields({
                    name: "Command",
                    value: interaction.commandName,
                    inline: true
                }, {
                    name: "User",
                    value: interaction.user.tag,
                    inline: true
                }, {
                    name: "Server",
                    value: interaction.guild.name,
                    inline: true
                }, {
                    name: "Parameters",
                    value: interaction.options != undefined ? interaction.options.data.map(o => `${o.name}: ${o.value}`).join("\n") : "None",
                })
            ]
        });
    }
    catch (e) {
        console.error("An Error occured: " + e);
        await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setDescription("An error occured!").setColor(discord_js_1.Colors.Red)] });
    }
};
