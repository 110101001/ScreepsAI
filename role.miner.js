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
        var source=creep.room.find(FIND_SOURCES);
        if(source.length){
            if(creep.harvest(source[0])==ERR_NOT_IN_RANGE){
                creep.moveTo(source[0]);
                creep.say('Moving to source!');
            }
        }
    }
};
module.exports = roleMiner;