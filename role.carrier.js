const cst = require('const');
require('prototype.Creep.move');
/*
    This is carrier creep, it will be assigned to a unique source and carries its miner's output, or assist miner's movement.
*/
/*
    carrier.memory={
        type:cst.carrierType
        state, The state machine's current state
        source, The assigned source
    }
*/

var carrier = {
    carrierCount:0,
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
        var source = Game.getObjectById(creep.memory.source)
        switch (creep.memory.state) {
            case cst.miner.toSource:
                //operation
                creep.moveTo(source);
                //state convert
                if (creep.pos.isNearTo(source)) {
                    creep.room.memory.sources[source.id].state = cst.source.mining;
                    creep.memory.state = cst.miner.mine;
                }
                break;
            case cst.miner.mine:
                //operation
                creep.harvest(source);
                //state convert
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.state = cst.miner.wait;
                }
                break;
            case cst.miner.wait:
                //operation
                //do nothing
                //state convert
                if (creep.store.getFreeCapacity() != 0) {
                    creep.memory.state = cst.miner.mine;
                }
                break;
        }
    }
};

module.exports = carrier;