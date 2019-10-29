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
    if (room.energyAvailable < room.memory.expectCost - room.memory.expectIncome) {
        return room.memory.expectCost - room.memory.expectIncome - room.energyAvailable;
    }
    else {
        return 0;
    }
}

//Estimate the time to fininsh mining and transporting and the income, then give a desire value based on the two values and energy requirment
//Also provide everything to assign a task
function CalcMineDesire(creep) {
    var energyRequire = EnergyNeed(creep.room);
    //if (energyRequire <= 0) {
    //    return { desire: 0, task: {} };
    //}

    //find source
    var sources = creep.room.find(FIND_SOURCES, {
        filter: (source) => {
            return (source.room.memory.sourceList[source.id].expectEnergy > 0);
        }
    });
    if (sources == undefined) {
        return { desire: 0, task: {} };
    }
    var bestSource = sources[0];
    var lowestTime;
    var sourcePath;
    var path;
    for (var source in sources) {
        var path = creep.pos.findPathTo(sources[source]);
        var time = TE.estimateMineTime(creep, sources[source], path, {}, {}).total;
        if (lowestTime == undefined || time < lowestTime) {
            lowestTime = time;
            bestSource = sources[source];
            sourcePath = path;
        }
    }


    //find target
    var target = bestSource.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.energyCapacity - structure.energy - Memory.structures[structure.id].expectEnergy >= 50);
        }
    });
    if (target == undefined) {
        return { desire: 0, task: {} };
    }

    var miningPoint = new RoomPosition(sourcePath[sourcePath.length - 2].x, sourcePath[sourcePath.length - 2].y, creep.room.name);
    var targetPath = miningPoint.findPathTo(target);
    var time = TE.estimateMineTime(creep, bestSource, sourcePath, target, targetPath);

    var income;
    if (bestSource.room.memory.sourceList[bestSource.id].expectEnergy > creep.store.getFreeCapacity()) {
        income = creep.store.getCapacity();
    }
    else {
        income = bestSource.room.memory.sourceList[bestSource.id].expectEnergy;
    }
    var desire = (income + energyRequire) / time.total;
    return {
        desire: desire,
        task: {
            type: Memory.task.task_mine,
            source: bestSource,
            target: target,
            timeStart: Game.time + time.source + time.wait,
            timeEnd: Game.time + time.source + time.wait + time.harvest,
            amount: income
        }
    };
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

        room.memory.spawnTaskList = {};
        //as for army..., they should be directly controlled by central authority

        room.memory.expectCost = 0;
        room.memory.expectIncome = 0;

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
                miner: {},
                expectEnergy: source[sourceName].energyCapacity
            };
        }

    },
    workerTaskArrange: function (creep) {
        //Calc desire for every task
        var taskData;
        var desire;
        var res = CalcMineDesire(creep);
        desire = res.desire;
        taskData = res.task;
        if (desire != 0) {
            task.assignTaskMine(creep, taskData);
        }
    }
};

module.exports = taskSchedule;