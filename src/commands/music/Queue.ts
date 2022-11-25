import {Command} from "../../Command";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonComponent,
    ButtonStyle,
    Client,
    CommandInteraction,
    EmbedBuilder, Interaction, Snowflake,
} from "discord.js";
import {player} from "../../Bot";


export const queue: Command = {
    name: "queue",
    description: "Zeigt dir die Warteschlange an",
    options: [],
    run: async (client: Client, interaction: CommandInteraction) => {
        let guildid = interaction.guild!.id;
        const queue = player.getQueue(guildid)
        if (!queue) {
            await interaction.followUp({embeds: [new EmbedBuilder().setColor("Red").setDescription("Es werden keine Songs abgespielt.")]})
            return
        }
        let page = getPages(guildid, true)[0];
        let row = getRow(guildid, 0);
        if (row.components.length > 0) await interaction.followUp({components: [row], embeds: [page]})
        else  await interaction.followUp({embeds: [page]})
    }
}

export default (client: Client) => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isButton()) {
            const menu: ButtonComponent = <ButtonComponent> interaction.component
            if (!menu.customId) return
            const id = menu.customId.substring(0, 4);
            const next_page = +menu.customId.substring(4, 5)
            console.log(id)
            if (id=="ward") {
                const pages = getPages(interaction!.guildId!, next_page==0)
                await interaction.message.edit({embeds: [pages[next_page]]
                , components: [getRow(interaction!.guildId!, next_page)]})
            }
        }
    })
}

function getRow(guildid: Snowflake, current_page: number) {
    const row = new ActionRowBuilder<ButtonBuilder>()
    if (current_page>0) {
        row.addComponents(
            new ButtonBuilder()
            .setCustomId(`ward${current_page-1}`)
            .setEmoji('◀')
            .setStyle(ButtonStyle.Primary),
        )
    }
    if (current_page<(getPages(guildid, true).length-1)) {
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`ward${current_page+1}`)
                .setEmoji("▶")
                .setStyle(ButtonStyle.Primary)
        );
    }
    return row
}

function getPages(guildid: Snowflake, first: boolean) {
    const queue = player.getQueue(guildid)
    const embed = [new EmbedBuilder()]
    const return_string: string[] = [""]
    let page = 0
    queue?.songs.forEach((song, index, songs) =>  {
        if (index==0) {
            embed[0] = new EmbedBuilder().addFields([{
                name: "Gerade Gespielt",
                value: `[${song.name}](${song.url}) (${queue.createProgressBar().times})`
            }])
            return
        }
        const string = `${index}: [${song.name}](${song.url}) (${convertMsToTime(song.milliseconds)})\n`
        let max_msg_size = page == 0 && first ? 1500 : 3000;
        let isLastSong = index==songs.length-1;
        if ((return_string[page] && return_string[page].length >= max_msg_size) || isLastSong) {
            if (isLastSong) return_string[page] += string
            if (page==0&&index!=0) {
                embed[0].addFields([{
                    name: "Queue",
                    value: return_string[page]
                }])
            }else if (index!=0) {
                embed[page].setDescription(return_string[page])
            }
            if (isLastSong) return;
            page++
            embed[page] = new EmbedBuilder()
            return_string[page] += `__Page ${page+1}__`
        }
        return_string[page] += string
    })
    return embed
}

function convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.ceil(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${hours==0?"":hours+":"}${padTo2Digits(minutes)}:${padTo2Digits(
        seconds,
    )}`;
}
function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}
