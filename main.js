var roleWorker = require('role.worker');
var roleSpawn = require('role.spawn');
var construction = require('construction')
var task = require('taskAssign')
var TS = require('taskSchedule');
var TE = require('timeEstimate');

function memoryInit() {
    if (Memory.Begin == undefined) {
        Memory.Begin = 0;
        //main init
        Memory.constant = {};
        Memory.structures = {};
        Memory.task = {};
        Memory.role = {};


        //initTasks
        TS.init();
        roleWorker.init();
        roleSpawn.init();
        construction.init();
        for (var spawn in Game.spawns) {
            TS.roomInit(Game.spawns[spawn].room);
            construction.structureInit(Game.spawns[spawn]);
        }
    }
}

module.exports.loop = function () {
    memoryInit();
    if (Game.time % 10 == 0) {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    if (Game.time % 5 == 0) {
    }
    for (var name in Game.creeps) {
        var unit = Game.creeps[name];
        if (unit.spawning == false) {
            if (Game.creeps[name].memory.role == Memory.role.role_worker) {
                if (Game.creeps[name].memory.task == -1) {
                    TS.workerTaskArrange(Game.creeps[name]);
                }
                roleWorker.run(Game.creeps[name]);
            }
        }
    }

    for (var name in Game.spawns) {
        var unit = Game.spawns[name];
        if (Game.spawns[name].memory.task == -1) {
            TS.spawnTaskArrange(Game.spawns[name]);
        }
        roleSpawn.run(Game.spawns[name]);
    }
}