import {Command} from "../../Command";
import {Client, CommandInteraction, EmbedBuilder} from "discord.js";
import {player} from "../../Bot";

export const stop: Command = {
    name: "stop",
    description: "Stoppt den Player",
    options: [],
    run: async (client: Client, interaction: CommandInteraction) => {
        const queue = player.getQueue(interaction!.guild!.id)
        if (!queue) {
            await interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Es wird gerade kein Song gespielt")]})
            return
        }
        await queue?.clearQueue()
        // Sag tschüsss
        await queue.play("https://youtu.be/kd-G7H7-k28")
        await queue.skip()
        await interaction.followUp({embeds: [new EmbedBuilder().setColor("White").setDescription("Der Player wurde gestoppt.")]})
    }
}