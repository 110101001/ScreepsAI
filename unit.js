var unit={
    getUnitSum:function(){
        return Game.creeps.length;
    },
    
    getRoleSum:function(role){
         var units = _.filter(Game.creeps, (creep) => creep.memory.role == role);
         return units.length;
    }
};

module.exports = unit;