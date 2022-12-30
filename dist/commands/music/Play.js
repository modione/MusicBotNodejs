"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const discord_js_1 = require("discord.js");
const Bot_1 = require("../../Bot");
exports.play = {
    name: "play",
    description: "Spielt ein Lied ab",
    options: [
        new discord_js_1.SlashCommandStringOption()
            .setName("name")
            .setDescription("Der Name des Lieds")
            .setRequired(true)
    ],
    run: async (client, interaction) => {
        if (parseInt(interaction.guildId) == 1048271128168255648) {
            await run(client, interaction);
        }
        let queue = Bot_1.player.getQueue(interaction.guild.id);
        if (!queue)
            queue = Bot_1.player.createQueue(interaction.guild.id);
        const voice = interaction.guild.members.cache.get(interaction.user.id).voice;
        if (!voice.channel) {
            await interaction.followUp({ embeds: [new discord_js_1.EmbedBuilder().setColor("Red").setDescription("Du musst in einem Sprachkanal sein!")] });
            return;
        }
        await queue.join(voice.channelId);
        const name = interaction.options.get("name")?.value;
        const song = await queue.play(name).catch(err => {
            console.log(err);
        });
        const embed = new discord_js_1.EmbedBuilder()
            .setDescription(`Playing [${song}](${song.url}) (${song.duration})`)
            .setColor("White");
        await interaction.followUp({ embeds: [embed] });
    }
};
const run = async (client, interaction) => {
    console.log("Play auf Paluten aufgeführt");
    console.log("Permissions: ", interaction.appPermissions?.toArray());
};
