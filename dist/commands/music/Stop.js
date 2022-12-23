"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = void 0;
const discord_js_1 = require("discord.js");
const Bot_1 = require("../../Bot");
exports.stop = {
    name: "stop",
    description: "Stoppt den Player",
    options: [],
    run: async (client, interaction) => {
        const queue = Bot_1.player.getQueue(interaction.guild.id);
        if (!queue) {
            await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setDescription("Es wird gerade kein Song gespielt")] });
            return;
        }
        queue?.clearQueue();
        await queue.play("https://youtu.be/GRa8bSpRePE");
        setTimeout(() => {
            queue.stop();
            interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setColor("White").setDescription("Der Player wurde gestoppt.")] });
        }, 2000);
    }
};
