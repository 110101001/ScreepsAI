var roleBuilder = {

    run: function(creep) {
        if(!creep.room.controller.my){
            for(const i in Game.spawns){
                creep.moveTo(Game.spawns[i]);
                return;
            }
        }
	    if(creep.memory.building && creep.carry.energy < 5) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        creep.memory.failTry=0;
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length&&creep.room.controller.ticksToDowngrade>3000) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
               if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                } 
            }
	    }
	    else {
	        var base=creep.room.find(FIND_STRUCTURES,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy > creep.carryCapacity;
                }
            });
	        if(base.length){
                if(creep.withdraw(base[0],RESOURCE_ENERGY,creep.carryCapacity-creep.carry.energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(base[0]);
                }
                else if(creep.withdraw(base[0],RESOURCE_ENERGY,creep.carryCapacity-creep.carry.energy) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.moveTo(base[0]);
                    creep.memory.failTry+=1;
                }
	       }
	       else{
	          creep.memory.failTry+=1; 
	       }
	       if(creep.memory.failTry>=5){
                        creep.memory.role='miner';
                        creep.memory.target=0;
                        creep.memory.failTry=0;
            }
	    }
	}
};

module.exports = roleBuilder;