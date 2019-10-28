/***************************************************************
 * @file       timeEstimate.js
 * @brief      This file focuses on estimate time of tasks. However since there are so many possible events that affect the ETA, here only provide raw estimation.
 **************************************************************/
function expMiner(source,time){
    var minerList = source.room.memory.sourceList[source.id].miner;
    var minerCount=0;
    for(var miner in minerList){
        if(minerList[miner].start<time && time<minerList[miner].end){
            minerCount+=1;
        }
    }
    return minerCount;
}

var timeEstimate={
    EstimatePathTime: function(creep,path,expCargo){
        const terrain = new Room.Terrain(creep.room);
        var carries=ceil((expCargo+creep.store.getUsedCapacity())/CARRY_CAPACITY);
        var roadCost=ceil(creep.memory.bodyParts / 2*creep.memory.moveParts);
        var plainCost=ceil(creep.memory.bodyParts / creep.memory.moveParts);
        var swampCost=ceil(5*creep.memory.bodyParts / creep.memory.moveParts);
        var timeCost=0;
        for(var node in path){
            var road = creep.room.lookForAt(LOOK_STRUCTURE,path[node].x,path[node].y);
            if(road!=null&&road[0].structureType==STRUCTURE_ROAD){
                timeCost+=roadCost;
            }
            else if(terrain.get(path[node].x,path[node].y)==TERRAIN_MASK_SWAMP){
                timeCost+=plainCost;
            }
            else if(terrain.get(path[node].x,path[node].y)==TERRAIN_MASK_PLAIN){
                timeCost+=swampCost;
            }
        }
        return timeCost;
    },
    //Here is still a bug: if a later miner are assigned to mine here and arrived earlier than this one, this miner number will be wrong. But this is a rare case and won't cause much daamge, so don't mind it.
    EstimateMineTime: function(creep,source,sourcePath,target,targetPath){
        var totalTime=0;
        totalTime+=this.EstimatePathTime(creep.sourcePath,0);
        if(expMiner()>=source.room.memory.sourceList[source.id].maxMiner){

        }
        if(source.room.memory.sourceList[source.id].expectEnergy>creep.store.getFreeCapacity()){
            totalTime+=ceil(creep.store.getFreeCapacity()/(2*creep.memory.workParts));
        }
         
    }
};

module.exports=timeEstimate;