import {Client, ActivityType} from "discord.js";
import {Commands} from "../Commands";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        client.application.commands.set(Commands)

        console.log(`${client.user.username} is online`);
        client.user.setPresence({
            activities: [{name: "Musik", type: ActivityType.Playing}],
            status: 'idle'
        })
    });
};