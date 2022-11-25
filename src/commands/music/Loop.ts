import {Command} from "../../Command";
import {
    Client,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandIntegerOption,
    SlashCommandStringOption
} from "discord.js";
import {player} from "../../Bot";
import {RepeatMode} from "discord-music-player";

export const loop: Command = {
    name: "loop",
    description: "Wiederholt den Song",
    options: [
        new SlashCommandStringOption()
        .setName("loop_modus")
        .setDescription("Steuert den wiederhol Modi")
        .addChoices({name: "Song", value: "s"}, {name: "Queue", value: "q"}, {name: "Aus", value: "d"})
        .setRequired(true)
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const queue = player.getQueue(interaction.guild!.id)
        if (!queue) {
            await interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Es wird gerade kein Song gespielt")]})
            return
        }
        let modus: RepeatMode
        switch (interaction.options.get("loop_modus")?.value) {
            case "s":
                modus = RepeatMode.SONG
                break
            case "q":
                modus = RepeatMode.QUEUE
                break
            case "d":
                modus = RepeatMode.DISABLED
        }
        // @ts-ignore
        queue?.setRepeatMode(modus)
        let element = RepeatMode[modus!];
        let repeat = element.charAt(0)+element.slice(1).toLowerCase();
        const embed = new EmbedBuilder().setDescription(`Wiederholungs Modus zu ${repeat} geändert`).setColor("White")
        await interaction.followUp({embeds: [embed]})
    }
}