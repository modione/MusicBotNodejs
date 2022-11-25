"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const discord_js_1 = require("discord.js");
const Bot_1 = require("../../Bot");
const discord_music_player_1 = require("discord-music-player");
exports.loop = {
    name: "loop",
    description: "Wiederholt den Song",
    options: [
        new discord_js_1.SlashCommandStringOption()
            .setName("loop_modus")
            .setDescription("Steuert den wiederhol Modi")
            .addChoices({ name: "Song", value: "s" }, { name: "Queue", value: "q" }, { name: "Aus", value: "d" })
            .setRequired(true)
    ],
    run: async (client, interaction) => {
        const queue = Bot_1.player.getQueue(interaction.guild.id);
        if (!queue) {
            await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setDescription("Es wird gerade kein Song gespielt")] });
            return;
        }
        let modus;
        switch (interaction.options.get("loop_modus")?.value) {
            case "s":
                modus = discord_music_player_1.RepeatMode.SONG;
                break;
            case "q":
                modus = discord_music_player_1.RepeatMode.QUEUE;
                break;
            case "d":
                modus = discord_music_player_1.RepeatMode.DISABLED;
        }
        queue?.setRepeatMode(modus);
        let element = discord_music_player_1.RepeatMode[modus];
        let repeat = element.charAt(0) + element.slice(1).toLowerCase();
        const embed = new discord_js_1.EmbedBuilder().setDescription(`Wiederholungs Modus zu ${repeat} geändert`).setColor("White");
        await interaction.followUp({ embeds: [embed] });
    }
};
