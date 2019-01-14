var roleMiner = require('role.miner');
var roleTrans = require('role.transporter');

module.exports.loop = function () {
    
    for(var name in Game.creeps){
        var unit=Game.creeps[name];
        
        if(unit.spawning==false){
            if(unit.memory.role=='miner'){
                roleMiner.run(unit);
            }
            else if(unit.memory.role=='transporter'){
                roleTrans.run(unit);
            }
        }
    }
    
}