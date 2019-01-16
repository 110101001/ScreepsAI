var expand={
    canExpand:function(room){ 
        if(room.controller.level>=3 && room.energyAvailable>=650 ){
            /*var nearRooms=Game.map.describeExits(room.name);
            for(var i in nearRooms){
                if(Game.map.isRoomAvailable(nearRooms[i]==true)){
                    if(!Game.rooms[nearRooms[i]].find(FIND_HOSTILE_CREEPS).length && !Game.rooms[nearRooms[i]].my && !Game.rooms[nearRooms[i]].find(FIND_MY_CREEPS,{
                        filter: (myCreep) => {
                            return (myCreep.memory.role=='claimler');
                        }
                    }).length){*/
                        return 1;
                    /*}
                }
            }*/
        }
        return 0;
    },
};

module.exports = expand;