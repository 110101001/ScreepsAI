const cst = require('const');
const spawn = require('role.spawn');

var production = {
    run: function (room) {
        for (s in room.memory.sources) {
            if (room.memory.sources[s].state == cst.source.noMiner) {
                var spawns = room.find(FIND_MY_SPAWNS);
                for (spn in spawns) {
                    if (spawns[spn].spawning == null) {
                        spawn.spawnMiner(spawns[spn], s);
                        break;
                    }
                }
            }
        }
    }
}