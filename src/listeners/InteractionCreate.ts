import {CommandInteraction, Client, Interaction } from "discord.js";
import {Commands} from "../Commands";

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
    }catch (e) {
        console.error("An Error occured: "+e)
    }
};