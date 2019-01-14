/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.melee');
 * mod.thing == 'a thing'; // true
 */
var roleMelee={
    run:function(creep){
            var enemy=creep.room.find(FIND_HOSTILE_CREEPS);
            if(enemy){
                if(creep.attack(enemy[0])==ERR_NOT_IN_RANGE){
                    creep.moveTo(enemy[0]);
                }
            }
    }
        
};
module.exports = roleMelee;