var roleMiner = require('role.miner');
var roleBuilder = require('role.builder');
var roleMelee = require('role.melee'); 
var roleRange = require('role.range'); 
var towerAct = require('tower');
var construct = require('construct');
var unitProduce = require('unit.produce');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(Game.time%100==0){
        for(var _room in Game.rooms){
            construct.extension(Game.rooms[_room]);
            construct.autoRoad(Game.rooms[_room]);
        }
    }
    
        for(var spawn in Game.spawns){
            unitProduce.produce(Game.spawns[spawn]);
        }
    
        for(var _room in Game.rooms){
            var towers=Game.rooms[_room].find(FIND_STRUCTURES,{
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER;
                    }
                });
            for(var _tower in towers){
                towerAct.run(towers[_tower]);
            }
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
            else if(unit.memory.role=='melee'){
                roleMelee.run(unit);
            }
            else if(unit.memory.role=='range'){
                roleRange.run(unit);
            }
        }
    }
    
}