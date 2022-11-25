import { Command } from "./Command";
import {play} from "./commands/music/Play";
import {skip} from "./commands/music/Skip";
import {stop} from "./commands/music/Stop";
import {loop} from "./commands/music/Loop";

export const Commands: Command[] = [play, skip, stop, loop];