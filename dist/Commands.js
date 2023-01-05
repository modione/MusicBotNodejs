"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const Play_1 = require("./commands/music/Play");
const Skip_1 = require("./commands/music/Skip");
const Stop_1 = require("./commands/music/Stop");
const Loop_1 = require("./commands/music/Loop");
const Alter_1 = require("./commands/Alter");
exports.Commands = [Play_1.play, Skip_1.skip, Stop_1.stop, Loop_1.loop, Alter_1.alter];
