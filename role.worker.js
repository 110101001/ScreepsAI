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
        var lastState = creep.memory.state;
        stateMachine.calcWorkerState(creep);
        if (lastState != creep.memory.state) {//stateCompleteHandler
            switch (lastState) {
                case Memory.workState.state_goToSource:
                    creep.memory.sourcePath = undefined;
                    break;
                case Memory.workState.state_haverst:
                    delete creep.room.memory.sourceList[creep.memory.source].miner[creep.id];
                    break;
                case Memory.workState.state_transfer:
                    if (Game.getObjectById(creep.memory.target).energy == Game.getObjectById(creep.memory.target).energyCapacity) {
                        Memory.structures[creep.memory.target].expectEnergy = 0;
                    }
                    else {
                        Memory.structures[creep.memory.target].expectEnergy -= creep.memory.amount;
                    }
                    creep.room.memory.expectIncome -= creep.memory.amount;
                    break;
                case Memory.workState.state_goToTarget:
                    creep.memory.targetPath = undefined;
                    break;
                case Memory.workState.state_build:
            }
        }

        switch (creep.memory.state) {
            case Memory.workState.state_idle:
                creep.memory.task = -1;
                break;
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
                break;
            case Memory.workState.state_goToTarget:
                creep.moveTo(Game.getObjectById(creep.memory.target), { reusePath: Memory.constant.reusePath });
                break;
            case Memory.workState.state_build:
                break;
        }
    }
};

module.exports = worker;