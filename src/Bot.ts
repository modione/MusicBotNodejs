
import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/InteractionCreate";
import {Player} from "discord-music-player";
import Queue from "./commands/music/Queue";

const token = "OTI3OTYzNzAyNTQ2Nzk2NjU1.GnCNtJ.ELhDLhIGZE-YHmj-smSeZ8DfJFqgBkdE6Qsaew";

console.log("Bot is starting...");

const client = new Client({
    intents: ["Guilds", "GuildVoiceStates"],
});

export const player = new Player(client, {leaveOnEmpty: true});

ready(client)
interactionCreate(client)
Queue(client)

client.login(token)