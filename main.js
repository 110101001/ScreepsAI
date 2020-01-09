
/*Three layer structure: 
Strategy Layer:room&mining site expansion, war

Plan Layer:construction planning, task arrangment

Unit Layer:execute orders, control units
role*.js production.js
*/
function isInit(){//Is this the first tick?
    if(Memory.init==true){
        return false;
    }
    Memory.init=false;
    for(spawns in Gamepad.spawn){
        Memory.init=true;
        return true;
    }
    return false;
}

function init(){
    //do nothing now
}

module.exports.loop = function () {
    if(isInit()){
        init();
    }
    if(Memory.init==true){
        //main loop
    }
}