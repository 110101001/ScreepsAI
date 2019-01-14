var roleMiner = require('role.miner');
var roleBuilder = require('role.builder');
var unitProduce = require('unit.produce');

const unitCost=200;

module.exports.loop = function () {
    var spawn=Game.spawns['Spawn1'];
    if(spawn.energy>unitCost){
       unitProduce.produce(spawn);
    }
    
    for(var name in Game.creeps){
        var unit=Game.creeps[name];
        
        if(unit.spawning==false){
            if(unit.memory.role=='miner'){
                roleMiner.run(unit);
            }
            else if(unit.memory.role=='builder'){
                roleBuilder.run(unit);
            }
        }
    }
    
}