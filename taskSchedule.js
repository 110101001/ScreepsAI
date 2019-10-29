var task = require('task');
var TE = require('timeEstimate');

function getMaxMiner(source) {
    const terrain = new Room.Terrain(source.room.name);
    var nearBy = new Array({ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 });
    var maxMiner = 0;
    for (var offset in nearBy) {
        if (terrain.get(
            source.pos.x + nearBy[offset].x, source.pos.y + nearBy[offset].y
        ) != TERRAIN_MASK_WALL) {
            maxMiner += 1;
        }
    }
    return maxMiner;
}

function EnergyNeed(room) {
    if (room.energyAvailable < room.memory.estimateCost - room.memory.expectedIncome) {
        return room.memory.estimateCost - room.memory.expectedIncome - room.energyAvailable;
    }
    else {
        return 0;
    }
}

//Estimate the time to fininsh mining and transporting and the income, then give a desire value based on the two values and energy requirment
function CalcMineDesire(creep) {
    var energyRequire = EnergyNeed(creep.room);
    if(energyRequire<=0){
        return {desire:0,task: {}};
    }

    //find source
    var sources = creep.room.find(FIND_SOURCES, {
        filter: (source) => {
            return (source.room.memory.sourceList[source.id].expectEnergy > 0);
        }
    });
    if(sources==undefined){
        return {desire:0,task: {}};
    }
    var bestSource = sources[0];
    var lowestTime;
    var sourcePath;
    var path;
    for(var source in sources){
        var path=creep.pos.findPathTo(sources[source]);
        var time=TE.estimateMineTime(creep,sources[source],path,{},{}).total;
        if(lowestTime == undefined || time < lowestTime){
            lowestTime=time;
            bestSource=sources[source];
            sourcePath=path;
        }
    }


    //find target
    var target = bestSource.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.energyCapacity - structure.energy >= 50);
        }
    });
    if(target==undefined){
        return {desire:0,task: {}};
    }
    
    var miningPoint = new RoomPosition(sourcePath[sourcePath.length-2].x,sourcePath[sourcePath.length-2].y,creep.room.name);
    var targetPath= miningPoint.findPathTo(target);
    var time=TE.estimateMineTime(creep,bestSource,sourcePath,target,targetPath).total;
    return {desire:0,task: {}};
}

var taskSchedule = {
    init: function () {
        Memory.roomTask = {
            task_idle: 0,
            task_defence: 1,
            task_retreat: 2,
            task_army: 3,
        }
        Memory.roomStage = {
            L1: 0,
            L2: 1,
            L3: 2,
            L4: 3,
            L5: 4,
            L6: 5,
            L7: 6,
        }
    },
    roomInit: function (room) {

        room.memory.task = Memory.roomTask.task_idle;
        room.memory.stage = Memory.roomStage.L1;

        room.memory.spawnTaskList = new Set();
        //as for army..., they should be directly controlled by central authority

        room.memory.estimatedCost = 0;
        room.memory.estimatedIncome = 0;

        room.memory.sourceList = {};

        var source = room.find(FIND_SOURCES);
        for (var sourceName in source) {
            console.log(
                source[sourceName].id,
                source[sourceName].pos,
                getMaxMiner(source[sourceName]),
                source[sourceName].energyCapacity
            );
            room.memory.sourceList[source[sourceName].id] = {
                pos: source[sourceName].pos,
                maxMiner: getMaxMiner(source[sourceName]),
                miner: new Array(),
                expectEnergy: source[sourceName].energyCapacity
            };
        }

    },
    constructGen: function (room) {
        //Normal Develop Sequence:
        //RCL1->RCL2->road1->extension5->RCL3->Tower1->road2->extension10->RCL4->extension20->
        switch (room.memory.task) {
            case Memory.roomTask.task_idle:
                switch (room.memory.stage) {
                    case Memory.roomStage.L1://RCL1->RCL2
                        //do nothing but to wait for upgrade
                        break;
                }
                break;
        }

    },
    spawnTaskGen: function (room) {

    },
    workerTaskArrange: function (creep) {
        //Calc desire for every task
        var task;
        var desire;
        var res = CalcMineDesire(creep);
        desire=res.desire;
        task=res.task;

    }
};

module.exports = taskSchedule;