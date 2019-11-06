var task = require('taskAssign');
var production = require('production');
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

function findSource(creep) {
    var sources = creep.room.find(FIND_SOURCES, {
        filter: (source) => {
            return (source.room.memory.sourceList[source.id].expectEnergy > 0);
        }
    });

    if (sources == null) {
        return {
            source: undefined,
            path: undefined
        };
    }

    var bestSource = sources[0];
    var lowestTime;
    var sourcePath;
    var path;
    for (var source in sources) {
        var path = creep.pos.findPathTo(sources[source]);
        var timeEs = TE.estimateMineTime(creep, sources[source], path, {}, {});
        var time = timeEs.source + timeEs.wait;
        if (lowestTime == undefined || time < lowestTime) {
            lowestTime = time;
            bestSource = sources[source];
            sourcePath = path;
        }
    }
    return {
        source: bestSource,
        path: sourcePath
    };
}

function findSite(creep) {
    var site = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    return site;
}

function mineAmount(creep, source) {
    var income;
    if (source.room.memory.sourceList[source.id].expectEnergy > creep.store.getFreeCapacity()) {
        income = creep.store.getCapacity();
    }
    else {
        income = source.room.memory.sourceList[source.id].expectEnergy;
    }
    return income;
}
//Estimate the time to fininsh mining and transporting and the income, then give a desire value based on the two values and energy requirment
//Also provide everything to assign a task
function calcMineDesire(creep) {
    var energyRequire = EnergyNeed(creep.room);
    //if (energyRequire <= 0) {
    //    return { desire: 0, task: {} };
    //}

    //find source

    var res = findSource(creep);
    var sourcePath = res.path;
    var bestSource = res.source;
    if (bestSource == undefined) {
        return { desire: 0, task: {} };
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

    var miningPoint = new RoomPosition(sourcePath[sourcePath.length - 1].x, sourcePath[sourcePath.length - 1].y, creep.room.name);
    var targetPath = miningPoint.findPathTo(target);
    var time = TE.estimateMineTime(creep, bestSource, sourcePath, target, targetPath);

    var income = mineAmount(creep, bestSource);

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

function calcUpgradeDesire(creep) {
    var res = findSource(creep);
    var sourcePath = res.path;
    var bestSource = res.source;
    if (bestSource == undefined) {
        return { desire: 0, task: {} };
    }
    var target = creep.room.controller;
    var miningPoint = new RoomPosition(sourcePath[sourcePath.length - 1].x, sourcePath[sourcePath.length - 1].y, creep.room.name);
    var targetPath = miningPoint.findPathTo(target);

    var time = TE.estimateMineTime(creep, bestSource, sourcePath, target, targetPath);

    var amount = mineAmount(creep, bestSource);

    var desire = ((1-(creep.room.controller.ticksToDowngrade / CONTROLLER_DOWNGRADE[creep.room.controller.level])) * 100 + amount) / time.total;
    return {
        desire: desire,
        task: {
            type: Memory.task.task_upgrade,
            source: bestSource,
            target: target,
            timeStart: Game.time + time.source + time.wait,
            timeEnd: Game.time + time.source + time.wait + time.harvest,
            amount: amount
        }
    }
}

function calcBuildDesire(creep) {
    var target = findSite(creep);
    if (target == null) {
        return { desire: 0, task: {} }
    }

    var res = findSource(creep);
    var sourcePath = res.path;
    var bestSource = res.source;
    if (bestSource == undefined) {
        return { desire: 0, task: {} };
    }

    var miningPoint = new RoomPosition(sourcePath[sourcePath.length - 1].x, sourcePath[sourcePath.length - 1].y, creep.room.name);
    var targetPath = miningPoint.findPathTo(target);

    var time = TE.estimateMineTime(creep, bestSource, sourcePath, target, targetPath);

    var amount = mineAmount(creep, bestSource);

    var desire=2*amount/time.total;
    return {
        desire: desire,
        task: {
            type: Memory.task.task_build,
            source: bestSource,
            target: target,
            timeStart: Game.time + time.source + time.wait,
            timeEnd: Game.time + time.source + time.wait + time.harvest,
            amount: amount
        }
    }
}

function calcSpawnWorkerDesire(spawn) {
    var shortage = spawn.room.memory.maxWorkPartsCount - spawn.room.memory.workPartsCount;
    if (shortage <= 0) {
        return {
            desire: 0,
            task: {}
        };
    }
    return {
        desire: shortage,
        task: {
            type: Memory.task.task_spawnWorker,
            name: 'SCP' + Game.time,
            worker: production.designWorker(spawn.room)
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
        };
        Memory.roomStage = {
            L1: 0,
            L2: 1,
            L3: 2,
            L4: 3,
            L5: 4,
            L6: 5,
            L7: 6,
        };
    },
    roomInit: function (room) {

        room.memory.task = Memory.roomTask.task_idle;
        room.memory.stage = Memory.roomStage.L1;

        room.memory.spawnTaskList = {};

        room.memory.expectCost = 0;
        room.memory.expectIncome = 0;

        room.memory.sourceList = {};

        var source = room.find(FIND_SOURCES);
        for (var sourceName in source) {
            room.memory.sourceList[source[sourceName].id] = {
                pos: source[sourceName].pos,
                maxMiner: getMaxMiner(source[sourceName]),
                miner: {},
                expectEnergy: source[sourceName].energyCapacity
            };
        }

        room.memory.workPartsCount = 0;
        room.memory.maxWorkPartsCount = source.length * 5 + 10;

    },
    workerTaskArrange: function (creep) {
        //Calc desire for every task

        var res = calcMineDesire(creep);
        var taskData = res.task;
        var desire = res.desire;

        res = calcUpgradeDesire(creep);
        if (desire < res.desire) {
            var taskData = res.task;
            var desire = res.desire;
        }

        res = calcBuildDesire(creep);
        if (desire < res.desire) {
            var taskData = res.task;
            var desire = res.desire;
        }
        
        if (desire != 0) {
            switch (taskData.type) {
                case Memory.task.task_mine:
                    task.assignTaskMine(creep, taskData);
                    break;
                    case Memory.task.task_build:
                    task.assignTaskBuild(creep,taskData);
                    break;
                case Memory.task.task_upgrade:
                    task.assignTaskUpgrade(creep, taskData);
                    break;
            }
        }
    },
    spawnTaskArrange: function (spawn) {
        var res = calcSpawnWorkerDesire(spawn);
        var taskData = res.task;
        var desire = res.desire;;
        if (desire != 0) {
            task.assignTaskSpawnWorker(spawn, taskData);
        }
    }
};

module.exports = taskSchedule;