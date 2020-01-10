var production = require('production');
var init = require('init');
var role = require('role');
/*Three layer structure: 
Strategy Layer:room&mining site expansion, war

Plan Layer:construction planning, task arrangment
production.js
Unit Layer:execute orders, control units
role*.js
*/


module.exports.loop = function () {
    if (init.isInit()) {
        init.init();
    }
    if (Memory.init == true) {
        //main loop
        //strategy layer

        //plan layer 
        for (var r in Game.rooms) {
            production.run(Game.rooms[r]);
        }
        //unit layer
        for (var c in Game.creeps) {
            role.run(Game.creeps[c]);
        }

    }
}