var towerAct={
    run:function(tower){
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax && (structure.structureType == STRUCTURE_EXTENSION||structure.structureType == STRUCTURE_ROAD))
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{
            filter: (_creep) => _creep.hits < structure.hitsMax
        });
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
       
};

module.exports = towerAct;