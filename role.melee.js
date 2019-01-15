var roleMelee={
    run:function(creep){
            var enemy=creep.room.find(FIND_HOSTILE_CREEPS);
            if(enemy.length==0){
                var enemy=creep.room.find(FIND_HOSTILE_STRUCTURES,{
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_CONTROLLER);
                    }
                });
            }
            if(enemy.length){
                if(creep.attack(enemy[0])==ERR_NOT_IN_RANGE){
                    creep.moveTo(enemy[0]);
                }
            }
            else{
                creep.moveTo(Game.flags['army']);
            }
    }
        
};
module.exports = roleMelee;