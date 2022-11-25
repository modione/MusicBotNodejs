"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("../Bot");
Bot_1.player
    .on('channelEmpty', (queue) => console.log(`Everyone left the Voice Channel, queue ended.`))
    .on('songAdd', (queue, song) => console.log(`Song ${song} was added to the queue.`))
    .on('playlistAdd', (queue, playlist) => {
    console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`);
})
    .on('queueDestroyed', (queue) => console.log(`The queue was destroyed.`))
    .on('queueEnd', (queue) => console.log(`The queue has ended.`))
    .on('songChanged', (queue, newSong, oldSong) => console.log(`${newSong} is now playing.`))
    .on('songFirst', (queue, song) => console.log(`Started playing ${song}.`))
    .on('clientDisconnect', (queue) => console.log(`I was kicked from the Voice Channel, queue ended.`))
    .on('clientUndeafen', (queue) => console.log(`I got undefeanded.`))
    .on('error', (error, queue) => {
    console.log(`Error: ${error} in ${queue.guild.name}`);
});
