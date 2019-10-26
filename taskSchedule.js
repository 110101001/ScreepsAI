var task=require('task');

function getMaxMiner(source){
    const terrain = new Room.Terrain(room.name);
    var nearBy=new Array((1,1),(1,0),(1,-1),(0,1),(0,-1),(-1,1),(-1,0),(-1,-1));
    var maxMiner=0;
    for(var offset in nearBy){
        if(source.room.memory.terrain.get(
            source.pos.x+nearBy[offset][0],source.pos.y+nearBy[offset][1]
            )!=TERRAIN_MASK_WALL){
                maxMiner+=1;
            }
    }
    return maxMiner;
}

function EnergyNeed(room){
    if(room.energyAvailable<room.memory.estimateCost-room.memory.expectedIncome){
        return room.memory.estimateCost-room.memory.expectedIncome-room.energyAvailable;
    }
    else{
        return 0;
    }
}

function EstimateMineTime(creep,source,target){
    
}

function CalcMineDesire(creep){
    var energyRequire = EnergyNeed(creep.room);
    var source = creep.pos.findClosestByPath(FIND_STRUCTURES,{
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.energyCapacity - structure.energy>=50);
        }
    });
}

var taskSchedule={
    init:function(){
        Memory.roomTask={
            task_idle:0,
            task_defence:1,
            task_retreat:2,
            task_army:3,
        }
        Memory.roomStage={
            L1:0,
            L2:1,
            L3:2,
            L4:3,
            L5:4,
            L6:5,
            L7:6,
        }
    },
    roomInit:function(room){
        room.memory.

        room.memory.task=Memory.roomTask.task_idle;
        room.memory.stage=Memory.roomStage.L1;

        room.memory.spawnTaskList=new Set();
        //as for army..., they should be directly controlled by central authority

        room.memory.estimatedCost=0;
        room.memory.estimatedIncome=0;
        
        room.memory.sourceList=new Set();
        var source=room.find(FIND_SOURCES);
        for(var sourceName in source){
            room.memory.sourceList.add({
                id:source[sourceName].id,
                pos:source[sourceName].pos,
                maxMiner: getMaxMiner(source[sourceName]),
                expectEnergy:source[sourceName].energyCapacity 
            })
        }
            
    },
    constructGen:function(room){ 
        //Normal Develop Sequence:
        //RCL1->RCL2->road1->extension5->RCL3->Tower1->road2->extension10->RCL4->extension20->
        switch(room.memory.task){
            case Memory.roomTask.task_idle:
                switch(room.memory.stage){
                    case Memory.roomStage.L1://RCL1->RCL2
                        //do nothing but to wait for upgrade
                    break;
                }
            break;
        }

    },
    spawnTaskGen:function(room){

    },
    workerTaskArrange:function(creep){
        //Calc desire for every task
        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
        if(EnergeNeed(creep.room)){
            //find a near pair of source and target
            
            for(var sourceName in room.memory.sourceList){
                var nearest
            }
            room.memory.workerTaskList.add(task.addTask(room.memory.estimatedCost-room.memory.estimatedIncome-room.energyAvailable,Memory.task.task_mine,));
        }
    }
};

module.exports=taskSchedule;