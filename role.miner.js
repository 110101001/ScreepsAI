const cst = require('const');
require('prototype.Creep.move');
/*
    This is miner creep, it will be assigned to a unique source and works until die.
*/
/*
    miner.memory={
        type:cst.minerType
        state, The state machine's current state
        source, The assigned source
    }
*/

var miner = {
    minerCount:0,
    minerMemory: function (source) {
        return {
            type: cst.minerType,
            state: cst.miner.toSource,
            source: source,
        };
    },
    makeName: function () {
        this.minerCount = this.minerCount + 1;
        return 'Foundation Mining Site ' + this.minerCount;
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
                    creep.room.memory.sources[source.id].pos = creep.pos;
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

module.exports = miner;