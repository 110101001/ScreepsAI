var production = {
    designWorker: function (room) {
        return {
            part: [WORK, CARRY, MOVE],
            workParts: 1,
            moveParts: 1,
            bodyParts: 3,
            cost:200
        };
    },
    spawnTaskGen: function (room) {
        switch (room.memory.task) {
            case task_idle:

                break;
        }
    }
}

module.exports = production;