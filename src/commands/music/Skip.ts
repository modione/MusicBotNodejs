import {Command} from "../../Command";
import {Client, CommandInteraction, EmbedBuilder, SlashCommandIntegerOption} from "discord.js";
import {player} from "../../Bot";
import {Song} from "discord-music-player";

export const skip: Command = {
    name: "skip",
    description: "Überspringt ein Lied",
    options: [
        new SlashCommandIntegerOption().setName("anzahl").setDescription("Wieviele Songs du überspringen willst")
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const queue = player.getQueue(interaction.guild!.id)
        if (!queue) {
            await interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Es werden gerade keine Songs gespielt")]})
            return
        }else if (queue?.songs.length==1) {
            await interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Es gibt keinen Song danach")]})
            return
        }
        const prev_song: Song = <Song> queue?.songs[0]
        let song: Song = <Song> queue?.songs[1]
        let embed = new EmbedBuilder().setDescription(`Überspringe [${prev_song}](${prev_song.url}) --> [${song}](${song.url})`).setColor("White");
        await interaction.followUp({embeds: [embed]})
        queue?.skip()
    }
}