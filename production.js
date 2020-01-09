miner=require('role.miner');
cst=require('const');

function selectType(types,room){
    var maxEnergy=room.energyCapacityAvailable;
    var bestType;
    for(type in types){
        if(bestType==undefined||bestType.cost<types[type].cost){
            bestType=types[type];
        }
    }
    return bestType.parts;
}

var production = {
    spawnMiner: function(spawn,sourceId){
        var body=selectType(cst.miner.type);
        var name=miner.makeName();
        return spawn.spawnCreep(body, name,{memory:miner.minerMemory(sourceId)})
    }
};

module.exports = production;