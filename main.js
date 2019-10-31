var worker = require('role.worker');
var task = require('task');
var construction = require('construction')
var TS = require('taskSchedule');
var TE = require('timeEstimate');

function memoryInit() {
    if (Memory.Begin == undefined) {
        Memory.Begin = 0;
        //main init
        Memory.constant={};
        Memory.structures={};
        Memory.task={};
        Memory.role={};


        //initTasks
        TS.init();
        worker.init();
        construction.init();
        for(var spawn in Game.spawns){
            TS.roomInit(Game.spawns[spawn].room);
            construction.structureInit(Game.spawns[spawn]);
        }
        //Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Fun', { memory: { role: Memory.role.role_worker,state: Memory.workState.state_idle,bodyParts: 1,moveParts:1,workParts:1,task:-1 } });
//       var source = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
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
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], Game.time, { memory: { role: Memory.role.role_worker,state: Memory.workState.state_idle,bodyParts: 1,moveParts:1,workParts:1,task:-1 } });
    }
    console.log(Game.time);
    for (var name in Game.creeps) {
        var unit = Game.creeps[name];
        if (unit.spawning == false) {
            if (Game.creeps[name].memory.role == Memory.role.role_worker) {
                if(Game.creeps[name].memory.task==-1){
                    TS.workerTaskArrange(Game.creeps[name]);
                }
                worker.run(Game.creeps[name]);
            }
        }
    }
}