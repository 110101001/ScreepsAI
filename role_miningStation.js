require("unit");

var MiningStation = {
    count: 0,
    state: {
        reset: 0,
        toSource: 1,
        toSpawn: 2,
        mine: 3,
    },
    init: function (creep, source_id) {
        
        creep.memory.source_id = source_id;
        creep.memory.state = this.state.reset;
        if(undefined == source_id){
            creep.memory.enable = false;
        }
        else{
            creep.memory.enable = true;
        }
    },
    run: function (creep) {
        //State shift
        switch (creep.memory.state) {
            case this.state.reset:
                if (true == creep.memory.enable && creep.) {
                    creep.memory.state = cst.miner.mine;
                }
                break;
            case this.state.toSource:
                if(creep.pos.isNearTo(source)){
                    creep.memory.state = this.state.mine;
                }
            break;
        }
        //Action
        switch (creep.memory.state) {
            case this.state.reset:
                //operation
                creep.moveTo(source);
                //state convert
                if (creep.pos.isNearTo(source)) {
                    creep.room.memory.sources[source.id].state = cst.source.mining;
                    creep.room.memory.sources[source.id].pos = creep.pos;
                    creep.memory.state = cst.miner.mine;
                }
                break;
            case this.state.toSource:
                //operation
                creep.harvest(source);
                //state convert
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.state = cst.miner.wait;
                }
                break;
            case this.state.toSpawn:
                //operation
                //do nothing
                //state convert
                if (creep.store.getFreeCapacity() != 0) {
                    creep.memory.state = cst.miner.mine;
                }
                break;
        }
    },
    makeName: function () {
        this.count = this.count + 1;
        return 'Foundation Mining Site ' + this.count;
    },
};

module.exports = MiningStation;