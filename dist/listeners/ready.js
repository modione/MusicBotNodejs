"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = require("../Commands");
exports.default = (client) => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        client.application.commands.set(Commands_1.Commands);
        console.log(`${client.user.username} is online`);
        client.user.setPresence({
            activities: [{ name: "Musik", type: discord_js_1.ActivityType.Playing }],
            status: 'idle'
        });
    });
};
