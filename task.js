

var task = {
    assignTaskMine: function (creep, taskData) {
        creep.memory.task = taskData.type;
        creep.memory.source = taskData.source.id;
        creep.memory.target = taskData.target.id;
        creep.memory.amount = taskData.amount;

        creep.room.memory.expectIncome += taskData.amount;

        creep.room.memory.sourceList[taskData.source.id].expectEnergy -= taskData.amount;
        creep.room.memory.sourceList[taskData.source.id].miner[creep.id] = { start: taskData.timeStart, end: taskData.timeEnd };

        Memory.structures[taskData.target.id].expectEnergy += taskData.amount;
    },
    assignTaskSpawnWorker: function (spawn, taskData) {
        spawn.memory.task = taskData.type;
        spawn.memory.unit = {
            body: taskData.worker.part,
            memory: {
                role: Memory.role.role_worker,
                state: Memory.workState.state_idle,
                bodyParts: taskData.worker.bodyParts,
                moveParts: taskData.worker.moveParts,
                workParts: taskData.worker.workParts,
                task: -1
            }
        };
    }
}

module.exports = task;