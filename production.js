const cst = require('const');
var spawn = require('role.spawn');

var production = {
    run: function (room) {
        var spawns = room.find(FIND_MY_SPAWNS);
        for (var spn in spawns) {
            spawns[spn].memory.mutex=false;
        }
        for (var s in room.memory.sources) {
            if (room.memory.sources[s].state == cst.source.noMiner) {
                for (var spn in spawns) {
                    if (spawns[spn].spawning == null&&spawns[spn].memory.mutex==false) {
                        spawn.spawnMiner(spawns[spn], s);
                        break;
                    }
                }
            }
        }
    }
}

module.exports = production;