var roleClaimler={
    run:function(creep){
        if(creep.room.my&&!creep.memory.target){
            var nearRooms=Game.map.describeExits(creep.room.name);
            for(var i in nearRooms){
                if(!nearRooms[i].find(FIND_HOSTILE_CREEPS).length){
                    creep.memory.target=nearRooms[i].id;
                }
            }
        }
        else{
            if(creep.claimController(Game.getObjectById(creep.memory.target))==ERR_NOT_IN_RANGE){
                moveTo(Game.getObjectById(creep.memory.target));
            }
        }
    }
        
};
module.exports = roleClaimler;