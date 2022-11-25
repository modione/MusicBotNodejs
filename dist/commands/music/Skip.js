"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skip = void 0;
const discord_js_1 = require("discord.js");
const Bot_1 = require("../../Bot");
exports.skip = {
    name: "skip",
    description: "Überspringt ein Lied",
    options: [
        new discord_js_1.SlashCommandIntegerOption().setName("anzahl").setDescription("Wieviele Songs du überspringen willst")
    ],
    run: async (client, interaction) => {
        const queue = Bot_1.player.getQueue(interaction.guild.id);
        if (!queue) {
            await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setDescription("Es werden gerade keine Songs gespielt")] });
            return;
        }
        else if (queue?.songs.length == 1) {
            await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setDescription("Es gibt keinen Song danach")] });
            return;
        }
        const prev_song = queue?.songs[0];
        let song = queue?.songs[1];
        let embed = new discord_js_1.EmbedBuilder().setDescription(`Überspringe [${prev_song}](${prev_song.url}) --> [${song}](${song.url})`).setColor("White");
        await interaction.followUp({ embeds: [embed] });
        queue?.skip();
    }
};
