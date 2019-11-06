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

function creepDeathHandler(creep){
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            switch(Game.creeps[name].memory.role){
                case Memory.role.role_worker:
                    switch(Game.creeps[name].memory.task){
                        case task_mine:
                            switch(Game.creeps[name].memory.state){

                            }
                    }
                break;
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

module.exports.loop = function () {
    memoryInit();
    //=======================================
    {   
        if(Game.time % 300==0){
            for (var roomName in Game.rooms) {
                var room=Game.rooms[roomName];
                for (var sources in room.memory.sourceList){
                    room.memory.sourceList[sources].expectEnergy=Game.getObjectById(sources).energyCapacity-Game.getObjectById(sources).energy+room.memory.sourceList[sources].expectEnergy;
                }
            }
        }
        if (Game.time % 10 == 0) {
            
        }
        if (Game.time % 10 == 1) {
            for (var spawn in Game.spawns) {
                if (Game.spawns[spawn].memory.task == undefined) {
                    Game.spawns[spawn].memory.task = -1;
                    Game.spawns[spawn].memory.state = 0;
                    construction.structureInit(Game.spawns[spawn]);
                }
            }
        }
        if (Game.time % 10 == 2) {
            for (var room in Game.rooms) {
                if (Game.rooms[room].memory.task == undefined) {
                    TS.roomInit(Game.spawns[room]);
                }
            }
        }
        if (Game.time % 10 == 3) {
            for (var room in Game.rooms) {
                construction.constructDesign(Game.rooms[room]);
            }
        }
    }
    //=======================================

    if (Game.time % 5 == 0) {
    }
    console.log('Current Time:' + Game.time);
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