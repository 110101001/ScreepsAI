source=require('source');
/*Three layer structure: 
Strategy Layer:room&mining site expansion, war

Plan Layer:construction planning, task arrangment
production.js
Unit Layer:execute orders, control units
role*.js
*/
function isInit(){//Is this the first tick?
    if(Memory.init==true){
        return false;
    }
    Memory.init=false;
    for(spawns in Game.spawn){
        Memory.init=true;
        return true;
    }
    return false;
}

function init(){
    //global init
    //init room
    for(spawns in Game.spawn){
        source.init(Game.spawn[spawns].room);
    }
}

module.exports.loop = function () {
    if(isInit()){
        init();
    }
    if(Memory.init==true){
        //main loop
    }
}