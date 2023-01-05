import {CommandInteraction, Client, Interaction, EmbedBuilder, Colors} from "discord.js";
import {Commands} from "../Commands";
import {webhook} from "../Bot";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        await interaction.followUp({content: "An error has occurred"});
        return;
    }

    await interaction.deferReply();
    console.log(`Command "${interaction.commandName}" played on ${interaction!.guild!.name} by ${interaction.user.tag}`)
    try {
        slashCommand.run(client, interaction)
        await webhook.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Slash Command")
                    .setColor("Green")
                    .addFields(
                        {
                            name: "Command",
                            value: interaction.commandName,
                            inline: true
                        },
                        {
                            name: "User",
                            value: interaction.user.tag,
                            inline: true
                        },
                        {
                            name: "Server",
                            value: interaction.guild!.name,
                            inline: true
                        },
                        {
                            name: "Parameters",
                            value: interaction.options.data.length!=0 ? interaction.options.data.map(o => `${o.name}: ${o.value}`).join("\n") : "None",
                        }
                    )
            ]
        })
    }catch (e) {
        console.error("An Error occured: "+e)
        await interaction.followUp({embeds: [new EmbedBuilder().setDescription("An error occured!").setColor(Colors.Red)]})
    }
};