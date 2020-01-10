const cst=require('const');

var source={
    init: function(room){
        var sources=room.find(FIND_SOURCES);
        room.memory.sources={};
        for(s in sources){
            room.memory.sources[s]={
                state:cst.source.noMiner,
                carrierCount:0,
                miner:null
            }
        }
    }
    //run: miner and production do the state change thing.
}