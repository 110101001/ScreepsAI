var unit={
    getUnitSum:function(){
        var sum=0;
        for(var unit in Game.creeps){
            sum++;
        }
        return sum;
    },
    
    getRoleSum:function(role){
         var units = _.filter(Game.creeps, (creep) => creep.memory.role == role);
         return units.length;
    }
};

module.exports = unit;