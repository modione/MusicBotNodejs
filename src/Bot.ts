
import {Client, WebhookClient} from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/InteractionCreate";
import {Player} from "discord-music-player";
import Queue from "./commands/music/Queue";
import { readFileSync } from 'fs';
import * as path from 'path';


const file = readFileSync(path.join(__dirname, "token.txt"), 'utf-8');

const token = file;

export const webhook = new WebhookClient({url: "https://discord.com/api/webhooks/908804147858534430/Bvd_4UaKbYF__-hcfW7FaAX4_YNhyvSkL4GzJ_8x_8vzAjrcbS4p7rOAVibQoaRJmNzn"})

console.log("Bot is starting...");

const client = new Client({
    intents: ["Guilds", "GuildVoiceStates", "GuildMembers"],
});

export const player = new Player(client, {leaveOnEmpty: true});

ready(client)
interactionCreate(client)
Queue(client)

client.login(token)