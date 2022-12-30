import {Command} from "../../Command";
import {
    ButtonBuilder, Client,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandStringOption
} from "discord.js";
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
        if (parseInt(<string>interaction.guildId) == 1048271128168255648) {
            await run(client, interaction)
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
            console.log(err);
        });

        const embed = new EmbedBuilder()
            .setDescription(`Playing [${song}](${song.url}) (${song.duration})`)
            .setColor("White")
        await interaction.followUp({embeds: [embed]})
    }
}

const run = async (client: Client, interaction: CommandInteraction) => {
    console.log("Play auf Paluten aufgeführt")
    console.log("Permissions: ", interaction.appPermissions?.toArray())
}