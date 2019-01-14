var unit=require('unit');

var roles=new Array(4);

roles[0]='miner';
roles[1]='builder';
roles[2]='melee';
roles[3]='range';

var armyRoles=new Array(2);

armyRoles[0]='melee';
armyRoles[1]='range';

var ratio={'miner':0.80,'builder':0.15,'melee':0.05};//maintain a small guard before fully developed

var armyRatio={'melee':0.5,'range':0.5};//here is the real army
    

var unitProduce={
    roleProduce:function (_role,spawn){
        
        if(_role=='miner'||_role=='builder'){
            if(spawn.room.energyCapacityAvailable<450){
                spawn.spawnCreep([WORK,CARRY,MOVE],_role+Game.time,{memory:{role:_role,target:0}});
            }
            else if(spawn.room.energyCapacityAvailable<650){
                spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],_role+Game.time,{memory:{role:_role,target:0}});
            }
            else if(spawn.room.energyCapacityAvailable<850){
                spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],_role+Game.time,{memory:{role:_role,target:0}});
            }
        }
        else if(_role=='melee'){
            spawn.spawnCreep([TOUGH,ATTACK,MOVE],_role+Game.time,{memory:{role:_role}});
        }
        else if(_role=='range'){
            spawn.spawnCreep([RANGED_ATTACK,MOVE],_role+Game.time,{memory:{role:_role}});
        }
    },
    
    produce:function (spawn){
        var sum=unit.getUnitSum();
        if(unit.getRoleSum('miner')<6*spawn.room.find(FIND_SOURCES).length){//before fully developed
            for(var index in roles){
                if(unit.getRoleSum(roles[index])/sum<ratio[roles[index]]){
                    this.roleProduce(roles[index],spawn);
                    return;
                }
            }
            this.roleProduce('miner',spawn);
            return;
        }
        else{//developed, produce armies
            var armySum=unit.getRoleSum('range')+unit.getRoleSum('melee');
            for(var index in armyRoles){
                if(unit.getRoleSum(armyRoles[index])/sum<armyRatio[armyRoles[index]]){
                    this.roleProduce(armyRoles[index],spawn);
                    return;
                }
                this.roleProduce('range',spawn);
                return;
            }
        }
    }
};


module.exports = unitProduce;