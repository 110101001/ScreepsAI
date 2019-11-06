var stateMachine = require('stateMachine');

var spawn = {
    init: function () {
        Memory.spawnState = {
            state_idle: 0,
            state_waitResource: 1,
            state_spawn: 2,
            state_renew: 3,
            state_recycle: 4,
        };
        Memory.task.task_spawnWorker = 0;

    },
    run: function (spawn) {
        stateMachine.calcSpawnState(spawn);
        switch (spawn.memory.state) {
            case Memory.spawnState.state_idle:
                
            break;
        }
    }
};

module.exports = spawn;