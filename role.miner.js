var roleMiner={
    run:function(creep){
        var source=creep.room.find(FIND_SOURCES);
        if(creep.carry.energy>0){
            if(creep.carry.energy!=creep.carryCapacity && !creep.harvest(source[creep.memory.target])){
                return;
            }
            if(!creep.memory.sendToId){
                creep.memory.failTry=0;
                var base=creep.room.find(FIND_STRUCTURES,{
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });

                if(base.length){
                    creep.memory.sendToId=base[0].id;
                }
            }
            if(creep.memory.sendToId){
                var sendTo=Game.getObjectById(creep.memory.sendToId);
                if(creep.transfer(sendTo,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(sendTo);
                    
                }
                else if(creep.transfer(sendTo,RESOURCE_ENERGY)==ERR_FULL){
                    creep.memory.failTry+=1;
                    if(creep.memory.failTry>=20){
                        creep.memory.role='builder';
                        creep.memory.failTry=0;
                    }
                }
            }
        }
        else{
            creep.memory.sendTo=0;
            if(source.length){
                if(creep.harvest(source[creep.memory.target])==ERR_NOT_IN_RANGE){
                    if(creep.moveTo(source[creep.memory.target])==ERR_NO_PATH){
                        if((creep.memory.target+1)<source.length){
                            creep.memory.target+=1;
                        }
                    }
                }
            }
        }
    }
};
module.exports = roleMiner;