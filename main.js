var roleMiner = require('role.miner');
var roleBuilder = require('role.builder');
var roleMelee = require('role.melee');
var unitProduce = require('unit.produce');

module.exports.loop = function () {
    var spawn=Game.spawns['Spawn1'];
    unitProduce.produce(spawn);
    
    for(var name in Game.creeps){
        var unit=Game.creeps[name];
        
        if(unit.spawning==false){
            if(unit.memory.role=='miner'){
                roleMiner.run(unit);
            }
            else if(unit.memory.role=='builder'){
                roleBuilder.run(unit);
            }
            else if(unit.memory.role=='melee'){
                roleMelee.run(unit);
            }
        }
    }
    
}