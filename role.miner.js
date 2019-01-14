/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */
var roleMiner={
    run:function(creep){
        if(creep.carry.energy==creep.carryCapacity){
            var base=creep.room.find(FIND_STRUCTURES,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(base){
                if(creep.transfer(base[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(base[0]);
                }
            }
        }
        else{
            var source=creep.room.find(FIND_SOURCES);
            if(source.length){
                if(creep.harvest(source[creep.memory.target])==ERR_NOT_IN_RANGE){
                    if(creep.moveTo(source[creep.memory.target])==ERR_NO_PATH){
                        if((creep.memory.target+1)<source.length){
                            creep.memory.target+=1;
                        }
                    }
                }
            }
        }
    }
};
module.exports = roleMiner;