var roleClaimler={
    run:function(creep){
        if(creep.room.my){
            creep.moveTo(Game.flags['exp']);
        }
        /*if(creep.room.my&&!creep.memory.target){
            var nearRooms=Game.map.describeExits(creep.room.name);
            for(var i in nearRooms){
                if(!nearRooms[i].find(FIND_HOSTILE_CREEPS).length && !nearRooms[i].my && !nearRooms[i].find(FIND_MY_CREEPS,{
                    filter: (myCreep) => {
                        return (myCreep.memory.role==claimler);
                    }
                }).length){
                    creep.memory.target=nearRooms[i].id;
                    return;
                }
            }
        }*/
        else{
            creep.memory.target=creep.room.controller.id;
            if(creep.claimController(Game.getObjectById(creep.memory.target))==ERR_NOT_IN_RANGE){
                moveTo(Game.getObjectById(creep.memory.target));
            }
        }
    }
        
};
module.exports = roleClaimler;