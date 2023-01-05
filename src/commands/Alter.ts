import {Command} from "../Command";


export const alter: Command = {
    name: "alter",
    description: "Zeigt den ältesten und den neusten User an",
    options: [],
    run: async (client, interaction) => {
        const guild = interaction.guild!;
        await guild.members.fetch();
        const members = guild.members.cache;
        console.log(members);
        const oldest = members.sort((a, b) => a.user.createdTimestamp).last();
        const newest = members.sort((a, b) => b.user.createdTimestamp).first();
        await interaction.followUp(`Der älteste User ist ${oldest}  und der neuste User ist ${newest}`);
    }
}