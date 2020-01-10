var source = require('source');
var spawn = require('role.spawn');

var init = {
    isInit:function() {//Is this the first tick?
        if (Memory.init == true) {
            return false;
        }
        Memory.init = false;
        for (var spawns in Game.spawns) {
            Memory.init = true;
            return true;
        }
        return false;
    },
    
    init:function() {
        //global init
        //init room
        for (var spawns in Game.spawns) {
            source.init(Game.spawns[spawns].room);
            spawn.init(Game.spawns[spawns]);
        }
    }
}

module.exports = init;