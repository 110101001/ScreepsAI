var unit={
    getUnitSum:function(_room){
        var sum=0;
        for(var unit in Game.creeps){
            if(Game.creeps[unit].my&&Game.creeps[unit].pos.roomName==_room.name){
                sum++;
            }
        }
        return sum;
    },
    
    getRoleSum:function(role){
         var units = _.filter(Game.creeps, (creep) => creep.memory.role == role);
         return units.length;
    }
};

module.exports = unit;