var stateMachine = require('stateMachine');

var worker = {
    init: function () {
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
        Memory.task.task_mine = 0;
        Memory.task.task_build = 1;
        Memory.task.task_upgrade = 2;
        Memory.task.task_pickup = 3;

        Memory.role.role_worker = 0

        Memory.constant.reusePath = 4;
    },

    run: function (creep) {
        stateMachine.calcWorkerState(creep);

        switch (creep.memory.state) {
            case Memory.workState.state_goToSource:
                creep.moveTo(Game.getObjectById(creep.memory.source), { reusePath: Memory.constant.reusePath });
                break;
            case Memory.workState.state_haverst:
                creep.harvest(Game.getObjectById(creep.memory.source));
                break;
            case Memory.workState.state_withdraw:
                break;
            case Memory.workState.state_transfer:
                creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                Memory.structures[creep.memory.target].expectEnergy -= creep.memory.amount;
                creep.room.memory.expectIncome -= creep.memory.amount;
                break;
            case Memory.workState.state_goToTarget:
                creep.moveTo(Game.getObjectById(creep.memory.target), { reusePath: Memory.constant.reusePath });
                break;
            case Memory.workState.state_build:
                creep.build(Game.getObjectById(creep.memory.target));
                break;
            case Memory.workState.state_upgrade:
                creep.upgradeController(Game.getObjectById(creep.memory.target));
                break;
        }
    }
};

module.exports = worker;