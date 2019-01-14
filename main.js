var roleMiner = require('role.miner');
var roleBuilder = require('role.builder');
var roleMelee = require('role.melee');
var construct = require('construct');
var unitProduce = require('unit.produce');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var _room=Game.rooms['sim'];
    construct.extension(_room);
    
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