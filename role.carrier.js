const cst = require('const');
var structure = require('structure');
require('prototype.Creep.move');
/*
    This is carrier creep, it will be assigned to a unique source and carries its miner's output, or assist miner's movement.
*/
/*
    carrier.memory={
        type:cst.carrierType
        state, The state machine's current state
        source, The assigned source
        target, The transport destination
        amount, The estimate amount of goods
    }
*/
function findTarget(creep) {
    var target = bestSource.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => {
            return (s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_SPAWN) &&
                (s.energyCapacity - s.energy - structure.expectEnergy(s.id) >= 50);
        }
    });
    if (target.length == 0) {
        //find creeps
    }
    else {
        var amount=target[0].energyCapacity - target[0].energy - structure.expectEnergy(target[0].id);
        if(amount > creep.store.getUsedCapacity()){
            amount=creep.store.getUsedCapacity();
        }
        return {
            target: target[0].id,
            amount: amount
        };
    }
}

var carrier = {
    carrierCount: 0,
    carrierMemory: function (source) {
        return {
            type: cst.carrierType,
            state: cst.carrier.toMiner,
            source: source,
        };
    },
    makeName: function () {
        this.carrierCount = this.carrierCount + 1;
        return 'Foundation Tranportation Unit ' + this.carrierCount;
    },
    run: function (creep) {
        require('prototype.Creep.move').moveCache.clear();
        var source = Game.getObjectById(creep.memory.source);
        var miner = Game.creeps[source.room.memory.sources[creep.memory.source].name];
        switch (creep.memory.state) {
            case cst.carrier.toMiner:
                //operation
                creep.moveTo(miner);
                //state convert
                if (creep.pos.isNearTo(miner)) {
                    creep.memory.state = cst.carrier.pull;
                }
                break;
            case cst.carrier.toPos:
                //operation
                creep.moveTo(source.room.memory.sources[source.id].pos);
                //state convert
                if (creep.pos.isNearTo(source.room.memory.sources[source.id].pos)) {
                    creep.memory.state = cst.carrier.fetch;
                }
                break;
            case cst.carrier.fetch:
                //operation
                creep.withdraw();
                //state convert
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.state = cst.carrier.toTarget;
                    var res = findTarget(creep);
                    creep.memory.target = res.target;
                    creep.memory.amount = res.amount;
                    structure.expectEnergy(creep.memory.target, amount);
                }
                break;
            case cst.carrier.toTarget:
                var target=Game.getObjectById(creep.memory.target);
                creep.moveTo(target);
                //state convert
                if (creep.pos.isNearTo(target)) {
                    creep.memory.state = cst.carrier.export;
                }
                break;
            case cst.carrier.export:
                var target=Game.getObjectById(creep.memory.target);
                creep.transfer(target,RESOURCE_ENERGY,creep.memory.amount);
                if(creep.store.getUsedCapacity()!=0){
                    var res = findTarget(creep);
                    creep.memory.target = res.target;
                    creep.memory.amount = res.amount;
                    structure.expectEnergy(creep.memory.target, amount);
                }
                else{
                    creep.memory.state = cst.carrier.toPos;
                }
                break;
        }
    }
};

module.exports = carrier;