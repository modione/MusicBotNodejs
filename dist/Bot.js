"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.player = exports.webhook = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const ready_1 = tslib_1.__importDefault(require("./listeners/ready"));
const InteractionCreate_1 = tslib_1.__importDefault(require("./listeners/InteractionCreate"));
const discord_music_player_1 = require("discord-music-player");
const Queue_1 = tslib_1.__importDefault(require("./commands/music/Queue"));
const fs_1 = require("fs");
const path = tslib_1.__importStar(require("path"));
const file = (0, fs_1.readFileSync)(path.join(__dirname, "token.txt"), 'utf-8');
const token = file;
exports.webhook = new discord_js_1.WebhookClient({ url: "https://discord.com/api/webhooks/908804147858534430/Bvd_4UaKbYF__-hcfW7FaAX4_YNhyvSkL4GzJ_8x_8vzAjrcbS4p7rOAVibQoaRJmNzn" });
console.log("Bot is starting...");
const client = new discord_js_1.Client({
    intents: ["Guilds", "GuildVoiceStates", "GuildMembers"],
});
exports.player = new discord_music_player_1.Player(client, { leaveOnEmpty: true });
(0, ready_1.default)(client);
(0, InteractionCreate_1.default)(client);
(0, Queue_1.default)(client);
client.login(token);
