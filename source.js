const cst=require('const');

var source={
    init: function(room){
        var sources=room.find(FIND_SOURCES);
        room.memory.sources={};
        for(var s in sources){
            room.memory.sources[sources[s].id]={
                state:cst.source.noMiner,
                carrierCount:0,
                name:null
            };
        }
    }
    //run: miner and production do the state change thing.
}

module.exports = source;