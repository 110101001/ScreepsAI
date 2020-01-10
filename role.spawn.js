var miner = require('role.miner');
const cst = require('const');

function selectType(types, room) {
    var maxEnergy = room.energyCapacityAvailable;
    var bestType;
    for (var type in types) {
        if (maxEnergy >= types[type].cost&&(bestType == undefined || bestType.cost < types[type].cost)) {
            bestType = types[type];
        }
    }
    return bestType.parts;
}

var spawn = {
    init: function(spawn){
        spawn.memory={
            mutex:false
        };
    },
    spawnMiner: function (spawn, sourceId) {

        var body = selectType(cst.miner.type,spawn.room);
        var source = Game.getObjectById(sourceId);
        if (source.room.memory.sources[sourceId].name == null) {
            source.room.memory.sources[sourceId].name = miner.makeName();
        }
        var res = spawn.spawnCreep(body, source.room.memory.sources[sourceId].name, { memory: miner.minerMemory(sourceId) });
        if (res == OK) {
            source.room.memory.sources[sourceId].state = cst.source.hasMiner;
            spawn.memory.mutex=true;
        }
        return res;
    }
};

module.exports = spawn;