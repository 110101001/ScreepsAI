const cst=require('const');
require('prototype.Creep.move')
/*
    This is miner creep, it will be assigned to a unique source and works until die.
*/
/*
    miner.memory={
        state, The state machine's current state
        source, The assigned source
    }
*/

var miner = {
    minerMemory: function(source){
        return {
            state:cst.miner.toSource,
            source:source,
        };
    },
    run: function (creep) {
        require('prototype.Creep.move').moveCache.clear();
        var source=getObjectById(creep.memory.source)
        switch(creep.memory.state){
            case cst.miner.toSource:
                //operation
                creep.moveTo(source);
                //state convert
                if(creep.isNearTo(source)){
                    creep.memory.state=cst.miner.mine;
                }
                break;
            case cst.miner.mine:
                //operation
                creep.harvest(source);
                //state convert
                if(creep.getFreeCapacity()==0){
                    creep.memory.state=cst.miner.wait;
                }
            break;
            case cst.miner.mine:
                //operation
                //do nothing
                //state convert
                if(creep.getFreeCapacity()!=0){
                    creep.memory.state=cst.miner.mine;
                }
            break;
        }
    }
};

module.exports = miner;