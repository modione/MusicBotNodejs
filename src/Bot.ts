
import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/InteractionCreate";
import {Player} from "discord-music-player";
import Queue from "./commands/music/Queue";
import { readFileSync } from 'fs';
import * as path from 'path';


const file = readFileSync(path.join(__dirname, "token.txt"), 'utf-8');

const token = file;
console.log(token)

console.log("Bot is starting...");

const client = new Client({
    intents: ["Guilds", "GuildVoiceStates"],
});

export const player = new Player(client, {leaveOnEmpty: true});

ready(client)
interactionCreate(client)
Queue(client)

// @ts-ignore
client.login(token)