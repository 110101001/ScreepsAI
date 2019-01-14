var roleMelee={
    run:function(creep){
            var enemy=creep.room.find(FIND_HOSTILE_CREEPS);
            if(enemy.length){
                if(creep.attack(enemy[0])==ERR_NOT_IN_RANGE){
                    creep.moveTo(enemy[0]);
                }
            }
            else{
                var _exit=creep.room.find(FIND_EXIT);
                creep.moveTo(25,25);
            }
    }
        
};
module.exports = roleMelee;