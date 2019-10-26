var worker = require('role.worker');
var task = require('task');
var taskSchedule = require('taskSchedule');

function memoryInit() {
    if (Memory.Begin == undefined) {
        Memory.Begin = 0;
        //initTasks
        taskSchedule.init();
        worker.init();
        taskSchedule.roomInit(Game.spawns['Spawn1'].room);
//        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Fun', { memory: { role: Memory.role.role_worker,state: Memory.workState.state_idle } });
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

    }

    for (var name in Game.creeps) {
        var unit = Game.creeps[name];
        if (unit.spawning == false) {
            if (Game.creeps[name].memory.role == Memory.role.role_worker) {
                worker.run(Game.creeps[name]);
            }
        }
    }
}