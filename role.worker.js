var stateMachine = require('stateMachine');

var worker = {
    init:function() {
        Memory.workState = {
            state_idle: 0,
            state_goToSource: 1,
            state_haverst: 2,
            state_withdraw: 3,
            state_transfer: 4,
            state_goToTarget: 5,
            state_build: 6,
            state_upgrade: 7,
            state_pickup: 8,
        };
        Memory.task = {
            task_mine: 0,
            task_build: 1,
            task_upgrade: 2,
            task_pickup: 3,
        };
        Memory.role = {
            role_worker: 0
        };
    },

    run: function (creep) {
        stateMachine.calcWorkerState(creep);
        switch (creep.memory.state) {
            case Memory.workState.state_idle:
                creep.memory.task=-1;
                break;
            case Memory.workState.state_goToSource:
                creep.moveTo(Game.getObjectById(creep.memory.source).pos);
                break;
            case Memory.workState.state_haverst:
                creep.harvest(Game.getObjectById(creep.memory.source));
                break;
            case Memory.workState.state_withdraw:
                break;
            case Memory.workState.state_transfer:
                creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                break;
            case Memory.workState.state_goToTarget:
                creep.moveTo(Game.getObjectById(creep.memory.target).pos);
                break;
            case Memory.workState.state_build:
                break;
        }
    }
};

module.exports = worker;