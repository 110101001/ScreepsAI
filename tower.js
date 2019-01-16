var towerAct={
    run:function(tower){
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax && structure.my)
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