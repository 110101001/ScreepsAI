
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
function IsCarryEnergyOnly(creep){
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == creep.store.getUsedCapacity()) {
        return true;
    }
    else {
        return false;
    }
}
function IsNearToSource(creep) {
    if (creep.pos.isNearTo(Game.getObjectById(creep.memory.sourceID))) {
        return true;
    }
    else {
        return false;
    }
}
function IsNearToTarget(creep) {
    if (creep.pos.isNearTo(Game.getObjectById(creep.memory.targetID))) {
        return true;
    }
    else {
        return false;
    }
}
function IsTargetFull(creep) {
    if (Game.getObjectById(creep.memory.targetID).store.getFreeCapacity() == 0) {
        return true;
    }
    else {
        return false;
    }
}
function IsSourceEmpty(creep) {
    if (Game.getObjectById(creep.memory.sourceID).store.getUsedCapacity() = 0) {
        return true;
    }
    else {
        return false;
    }
}
function IsEnergySourceEmpty(creep) {
    if (Game.getObjectById(creep.memory.sourceID).energy = 0) {
        return true;
    }
    else {
        return false;
    }
}
function isSourceInvalid(creep){
    if(Game.getObjectById(creep.memory.sourceID)==null){
        return true;
    }
    else{
        return false;
    }
}
function IsTargetControllerMaxLevel(creep) {
    if (Game.getObjectById(creep.memory.targetID).level == 8) {
        return true;
    }
    else {
        return false;
    }
}
function IsTargetControllerDecayTimeHigh(creep) {
    if (Game.getObjectById(creep.memory.targetID).ticksToDowngrade > 1000) {
        return true;
    }
    else {
        return false;
    }
}
function isTargetInvalid(creep){
    if(Game.getObjectById(creep.memory.targetID)==null){
        return true;
    }
    else{
        return false;
    }
}
function IsNoTask(creep) {
    if (creep.task == -1) {
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


var stateMachine = {
    calcWorkerState: function (creep) {
        switch (creep.state) {
            case Memory.workState.state_idle:
                if (!IsNoTask(creep)) {
                    if (IsManyCargo(creep)&&IsCarryEnergyOnly(creep)) {
                        creep.state = Memory.workState.state_goToSource;
                    }
                    else {
                        creep.state = Memory.workState.state_goToTarget;
                    }
                }
                break;
            case Memory.workState.state_goToSource:
                if(IsNearToSource(creep)){
                    if(IsMine(creep)){
                        creep.state=Memory.workState.state_haverst;
                    }
                    else if(IsPickup(creep)){
                        creep.state=Memory.workState.state_pickup;
                    }
                    else if(Game.getObjectById(creep.memory.sourceID).structureType==undefined){
                        creep.state=Memory.workState.state_haverst;
                    }
                    else{
                        creep.state=Memory.workState.state_withdraw;
                    }
                }
                break;
            case Memory.workState.state_haverst:
                if(IsFullCargo(creep)||IsEnergySourceEmpty(creep)){
                    creep.state=Memory.workState.state_goToTarget;
                }
                break;
            case Memory.workState.state_withdraw:
                    if(IsFullCargo(creep)||IsSourceEmpty(creep)){
                        creep.state=Memory.workState.state_goToTarget;
                    }
                break;
            case Memory.workState.state_transfer:
                    if(IsEmptyCargo(creep)||IsTargetFull(creep)){
                        creep.state=Memory.workState.state_idle;
                    }
                break;
            case Memory.workState.state_goToTarget:
                    if(IsNearToTarget(creep)){
                        if(IsMine(creep)||IsPickup(creep)){
                            creep.state=Memory.workState.state_transfer;
                        }
                        else if(IsBuild(creep)){
                            creep.state=Memory.workState.state_build;
                        }
                        else if(IsUpgrade(creep)){
                            creep.state=Memory.workState.state_upgrade;
                        }
                    }
                break;
            case Memory.workState.state_build:
                    if(IsEmptyCargo(creep)||isTargetInvalid(creep)){
                        creep.state=Memory.workState.state_idle;
                    }
                break;
            case Memory.workState.state_upgrade:
                    if(IsEmptyCargo(creep)||(IsTargetControllerMaxLevel(creep)&&IsTargetControllerDecayTimeHigh(creep))){
                        creep.state=Memory.workState.state_idle;
                    }
                break;
            case Memory.workState.state_pickup:
                    if(IsFullCargo(creep)||isSourceInvalid(creep)){
                        creep.state=Memory.workState.state_goToTarget;
                    }
                break;
        }
    }
};

module.exports = stateMachine;