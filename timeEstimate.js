/***************************************************************
 * @file       timeEstimate.js
 * @brief      This file focuses on estimate time of tasks. However since there are so many possible events that affect the ETA, here only provide raw estimation.
 **************************************************************/
function expMiner(source, time) {
    var minerList = source.room.memory.sourceList[source.id].miner;
    var minerCount = 0;
    for (var miner in minerList) {
        if (minerList[miner].start <= time && time <= minerList[miner].end) {
            minerCount += 1;
        }
    }
    return minerCount;
}

function expMineWait(source, time) {
    var flag = false;
    var recentLeave;
    while (flag == false) {
        var minerList = source.room.memory.sourceList[source.id].miner;
        var minRecentLeave = time;
        for (var miner in minerList) {
            if ((minerList[miner].end >= minRecentLeave && (recentLeave == undefined || minerList[miner].end < recentLeave))) {
                recentLeave = minerList[miner].end;
            }
        }
        if (expMiner(source, recentLeave + 1) >= source.room.memory.sourceList[source.id].maxMiner) {
            minRecentLeave = recentLeave + 1;
            recentLeave=undefined;
        }
        else{
            flag=true;
        }
    }
    return recentLeave+1;
}

var timeEstimate = {
    estimatePathTime: function (creep, path, expCargo) {

        const terrain = new Room.Terrain(creep.room.name);
        var carries = Math.ceil((expCargo + creep.store.getUsedCapacity()) / CARRY_CAPACITY);
        var roadCost = Math.ceil(creep.memory.bodyParts + carries/ 2 * creep.memory.moveParts);
        var plainCost = Math.ceil(creep.memory.bodyParts + carries/ creep.memory.moveParts);
        var swampCost = Math.ceil(5 * (creep.memory.bodyParts + carries)/ creep.memory.moveParts);
        var timeCost = 0;
        for (var node in path) {
            var road = creep.room.lookForAt(LOOK_STRUCTURES, path[node].x, path[node].y);
            if (road != null && road.structureType == STRUCTURE_ROAD) {
                timeCost += roadCost;
            }
            else if (terrain.get(path[node].x, path[node].y) == TERRAIN_MASK_SWAMP) {
                timeCost += swampCost;
            }
            else if (terrain.get(path[node].x, path[node].y) != TERRAIN_MASK_WALL) {
                timeCost += plainCost;
            }
        }
        return timeCost;
    },
    //Calculate the time it takes to mine and transport.
    //Here is still a bug: if a later miner are assigned to mine here and arrived earlier than this one, this miner number will be wrong. 
    //But this is a rare case and won't cause much damage, so don't mind it.
    estimateMineTime: function (creep, source, sourcePath, target, targetPath) {
        var expCargo=0;
        var ETAS = this.estimatePathTime(creep,sourcePath, 0);
        var ETAW =0;
        if (expMiner(source, ETAS) >= source.room.memory.sourceList[source.id].maxMiner) {
            ETAW=expMineWait(source,time+ETAS);
            //console.log('wait'+ETAW);
        }
        var ETAH=0;
        if (source.room.memory.sourceList[source.id].expectEnergy > creep.store.getFreeCapacity()) {
            ETAH = Math.ceil(creep.store.getFreeCapacity() / (2 * creep.memory.workParts));
            expCargo=creep.store.getFreeCapacity();
        }
        else{
            ETAH = Math.ceil(source.room.memory.sourceList[source.id].expectEnergy / (2 * creep.memory.workParts));
            expCargo=source.room.memory.sourceList[source.id].expectEnergy;
        }
        var ETAT=this.estimatePathTime(creep, targetPath, expCargo);
        var totalTime=ETAS+ETAW+ETAH+ETAT;
        return {
            total:totalTime,
            source:ETAS,
            wait:ETAW,
            harvest:ETAH,
            target:ETAT
        };
    }
};

module.exports = timeEstimate;