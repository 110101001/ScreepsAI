miner = require('role.miner');
cst = require('const');

function selectType(types, room) {
    var maxEnergy = room.energyCapacityAvailable;
    var bestType;
    for (type in types) {
        if (bestType == undefined || bestType.cost < types[type].cost) {
            bestType = types[type];
        }
    }
    return bestType.parts;
}

var spawn = {
    spawnMiner: function (spawn, sourceId) {
        var body = selectType(cst.miner.type);
        var source = getObjectById(sourceId);
        if (source.room.memory.sources[sourceId].name == null) {
            source.room.memory.sources[sourceId].name = miner.makeName();
        }

        var res = spawn.spawnCreep(body, source.room.memory.sources[sourceId].name, { memory: miner.minerMemory(sourceId) });
        if (res == OK) {
            source.room.memory.sources[sourceId].state = cst.hasMiner;
            source.room.memory.sources[sourceId].miner = name;
        }
        return res;
    }
};

module.exports = spawn;