production = require('production');
role = require('role');
/*Three layer structure: 
Strategy Layer:room&mining site expansion, war

Plan Layer:construction planning, task arrangment
production.js
Unit Layer:execute orders, control units
role*.js
*/
function isInit() {//Is this the first tick?
    if (Memory.init == true) {
        return false;
    }
    Memory.init = false;
    for (spawns in Game.spawn) {
        Memory.init = true;
        return true;
    }
    return false;
}

function init() {
    //global init
    //init room
    for (spawns in Game.spawns) {
        source.init(Game.spawns[spawns].room);
    }
}

module.exports.loop = function () {
    if (isInit()) {
        init();
    }
    if (Memory.init == true) {
        //main loop
        //strategy layer

        //plan layer 
        for (r in Game.rooms) {
            production.run(Game.rooms[r]);
        }
        //unit layer
        for (c in Game.creeps) {
            role.run(c);
        }
    }
}