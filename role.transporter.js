/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.transporter');
 * mod.thing == 'a thing'; // true
 */
var roleTransporter={
    run:function(creep){
        if(creep.carry.energy==creep.carryCapacity){
            creep.say('Transport');
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
            creep.say('Pickup');
            var resource=creep.room.find(FIND_DROPPED_RESOURCES);
            if(resource){
                if(creep.pickup(resource[0])==ERR_NOT_IN_RANGE){
                    creep.moveTo(resource[0]);
                }
            }
        }
    }
};
module.exports = roleTransporter;