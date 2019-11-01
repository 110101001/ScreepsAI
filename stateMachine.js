
function IsEmptyCargo(creep) {
    if (creep.store.getUsedCapacity() == 0) {
        return true;
    }
    else {
        return false;
    }
}
function IsFewCargo(creep) {
    if (creep.store.getUsedCapacity() < creep.store.getFreeCapacity()) {
        return true;
    }
    else {
        return false;
    }
}
function IsManyCargo(creep) {
    if (creep.store.getUsedCapacity() >= creep.store.getFreeCapacity()) {
        return true;
    }
    else {
        return false;
    }
}
function IsFullCargo(creep) {
    if (creep.store.getFreeCapacity() == 0) {
        return true;
    }
    else {
        return false;
    }
}
function IsCarryEnergyOnly(creep) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == creep.store.getUsedCapacity()) {
        return true;
    }
    else {
        return false;
    }
}
function IsNearToSource(creep) {
    if (creep.pos.isNearTo(Game.getObjectById(creep.memory.source))) {
        return true;
    }
    else {
        return false;
    }
}
function IsNearToTarget(creep) {
    if (creep.pos.isNearTo(Game.getObjectById(creep.memory.target))) {
        return true;
    }
    else {
        return false;
    }
}
function IsTargetFull(creep) {
    if (Game.getObjectById(creep.memory.target).store.getFreeCapacity() == 0) {
        return true;
    }
    else {
        return false;
    }
}
function IsSourceEmpty(creep) {
    if (Game.getObjectById(creep.memory.source).store.getUsedCapacity() = 0) {
        return true;
    }
    else {
        return false;
    }
}
function IsEnergySourceEmpty(creep) {
    if (Game.getObjectById(creep.memory.source).energy == 0) {
        return true;
    }
    else {
        return false;
    }
}
function isSourceInvalid(creep) {
    if (Game.getObjectById(creep.memory.source) == null) {
        return true;
    }
    else {
        return false;
    }
}
function IsTargetControllerMaxLevel(creep) {
    if (Game.getObjectById(creep.memory.target).level == 8) {
        return true;
    }
    else {
        return false;
    }
}
function IsTargetControllerDecayTimeHigh(creep) {
    if (Game.getObjectById(creep.memory.target).ticksToDowngrade > 1000) {
        return true;
    }
    else {
        return false;
    }
}
function isTargetInvalid(creep) {
    if (Game.getObjectById(creep.memory.target) == null) {
        return true;
    }
    else {
        return false;
    }
}
function IsNoTask(creep) {
    if (creep.memory.task == -1) {
        return true;
    }
    else {
        return false;
    }
}
function IsMine(creep) {
    if (creep.memory.task == Memory.task.task_mine) {
        return true;
    }
    else {
        return false;
    }
}
function IsBuild(creep) {
    if (creep.memory.task == Memory.task.task_build) {
        return true;
    }
    else {
        return false;
    }
}
function IsUpgrade(creep) {
    if (creep.memory.task == Memory.task.task_upgrade) {
        return true;
    }
    else {
        return false;
    }
}
function IsPickup(creep) {
    if (creep.memory.task == Memory.task.task_pickup) {
        return true;
    }
    else {
        return false;
    }
}

function IsSpawnWorker(spawn) {
    if (spawn.memory.task == Memory.task.task_spawnWorker) {
        return true;
    }
    else {
        return false;
    }
}

function canSpawn(spawn) {
    if (spawn.room.energyAvailable >= spawn.memory.cost) {
        return true;
    }
    else {
        return false;
    }
}

function IsSpawning(spawn) {
    return spawn.spawning;
}

var stateMachine = {
    calcWorkerState: function (creep) {
        switch (creep.memory.state) {
            case Memory.workState.state_idle:
                if (!IsNoTask(creep)) {
                    if (IsManyCargo(creep) && IsCarryEnergyOnly(creep)) {
                        creep.memory.state = Memory.workState.state_goToTarget;
                    }
                    else {
                        creep.memory.state = Memory.workState.state_goToSource;
                    }
                }
                break;
            case Memory.workState.state_goToSource:
                if (IsNearToSource(creep)) {
                    creep.memory.sourcePath = undefined;
                    if (IsMine(creep)) {
                        creep.memory.state = Memory.workState.state_haverst;
                    }
                    else if (IsPickup(creep)) {
                        creep.memory.state = Memory.workState.state_pickup;
                    }
                    else if (Game.getObjectById(creep.memory.source).structureType == undefined) {
                        creep.memory.state = Memory.workState.state_haverst;
                    }
                    else {
                        creep.memory.state = Memory.workState.state_withdraw;
                    }
                }
                break;
            case Memory.workState.state_haverst:
                if (IsFullCargo(creep) || IsEnergySourceEmpty(creep)) {
                    delete creep.room.memory.sourceList[creep.memory.source].miner[creep.id];
                    creep.memory.state = Memory.workState.state_goToTarget;
                }
                break;
            case Memory.workState.state_withdraw:
                if (IsFullCargo(creep) || IsSourceEmpty(creep)) {
                    creep.memory.state = Memory.workState.state_goToTarget;
                }
                break;
            case Memory.workState.state_transfer:
                if (IsEmptyCargo(creep) || IsTargetFull(creep)) {
                    creep.memory.state = Memory.workState.state_idle;
                    creep.memory.task=-1;
                }
                break;
            case Memory.workState.state_goToTarget:
                if (IsNearToTarget(creep)) {
                    creep.memory.targetPath = undefined;
                    if (IsMine(creep) || IsPickup(creep)) {
                        creep.memory.state = Memory.workState.state_transfer;
                    }
                    else if (IsBuild(creep)) {
                        creep.memory.state = Memory.workState.state_build;
                    }
                    else if (IsUpgrade(creep)) {
                        creep.memory.state = Memory.workState.state_upgrade;
                    }
                }
                break;
            case Memory.workState.state_build:
                if (IsEmptyCargo(creep) || isTargetInvalid(creep)) {
                    creep.memory.state = Memory.workState.state_idle;
                }
                break;
            case Memory.workState.state_upgrade:
                if (IsEmptyCargo(creep) || (IsTargetControllerMaxLevel(creep) && IsTargetControllerDecayTimeHigh(creep))) {
                    creep.memory.state = Memory.workState.state_idle;
                }
                break;
            case Memory.workState.state_pickup:
                if (IsFullCargo(creep) || isSourceInvalid(creep)) {
                    creep.memory.state = Memory.workState.state_goToTarget;
                }
                break;
        }
    },
    calcSpawnState: function (spawn) {
        switch (spawn.memory.state) {
            case Memory.spawnState.state_idle:
                if (!IsNoTask(spawn)) {
                    if (IsSpawnWorker(spawn)) {
                        if (canSpawn(spawn)) {
                            console.log(spawn.memory.unit.body,
                                spawn.memory.unit.name,
                                { memory: spawn.memory.unit.memory });
                            spawn.spawnCreep(spawn.memory.unit.body,
                                spawn.memory.unit.name,
                                { memory: spawn.memory.unit.memory }
                            );
                            spawn.room.memory.expectCost -= spawn.memory.cost;
                            spawn.room.memory.workPartsCount +=spawn.memory.unit.memory.workParts;
                            spawn.memory.state = Memory.spawnState.state_spawn;
                        }
                        else {
                            spawn.memory.state = Memory.spawnState.state_waitResource;
                        }
                    }
                }
                break;
            case Memory.spawnState.state_waitResource:
                if (IsSpawnWorker(spawn)) {
                    if (canSpawn(spawn)) {
                        spawn.spawnCreep(spawn.memory.unit.body,
                            spawn.memory.unit.name,
                            { memory: spawn.memory.unit.memory }
                        );
                        spawn.room.memory.expectCost -= spawn.memory.cost;
                        spawn.room.memory.workPartsCount +=spawn.memory.unit.memory.workParts;
                        spawn.memory.state = Memory.spawnState.state_spawn;
                    }
                }
                break;
            case Memory.spawnState.state_spawn:
                if (!IsSpawning(spawn)) {
                    spawn.memory.state = Memory.spawnState.state_idle;
                    spawn.memory.task=-1;
                }
                break;
            case Memory.spawnState.state_renew:
                if (IsNoTask(spawn)) {
                    spawn.memory.state = Memory.spawnState.state_idle
                    spawn.memory.task=-1;
                }
                break;
            case Memory.spawnState.state_recycle:
                if (IsNoTask(spawn)) {
                    spawn.memory.state = Memory.spawnState.state_idle
                    spawn.memory.task=-1;
                }
                break;
        }
    }
};

module.exports = stateMachine;