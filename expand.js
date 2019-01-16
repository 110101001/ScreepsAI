var expand={
    canExpand:function(room){
        if(room.controller.level>=3 && room.energyAvailable>=600){
            var nearRooms=Game.map.describeExits(creep.room.name);
            for(var i in nearRooms){
                if(!nearRooms[i].find(FIND_HOSTILE_CREEPS).length && !nearRooms[i].my && !nearRooms[i].find(FIND_MY_CREEPS,{
                    filter: (myCreep) => {
                        return (myCreep.memory.role=='claimler');
                    }
                }).length){
                    return 1;
                }
            }
        }
        return 0;
    },
};

module.exports = expand;