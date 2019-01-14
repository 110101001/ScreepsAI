/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('construct');
 * mod.thing == 'a thing'; // true
 */
 
const lvlext={1:0,2:5,3:10,4:20,5:30,6:40,7:50,8:60};

var construct={
    getLevel:function(room){
        return room.controller.level;
    },
    road:function(pos1,pos2,err){
        var retv=PathFinder.search(pos1,{pos2,err});
        for(var pts in retv.path){
            pts.room.createConstructionSite(pts,STRUCTURE_ROAD);
        }
    },
    extension:function(_room){
        var ext=_room.find(FIND_STRUCTURES,{
                filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}});
        var extToBuild=lvlext[this.getLevel(_room)]-ext.length;
        for(var position=0;extToBuild!=position;position+=1){
            var pts=_room.getPositionAt(position+15,_room.controller.pos.y+4);
            _room.createConstructionSite(pts,STRUCTURE_EXTENSION);
        }
    }
};

module.exports = construct;