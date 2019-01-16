var unit=require('unit');
var expand=require('expand');
var roles=new Array(5);

roles[0]='miner';
roles[1]='builder';
roles[2]='claimler';
roles[3]='melee';
roles[4]='range';

var armyRoles=new Array(2);

armyRoles[0]='melee';
armyRoles[1]='range';

var ratio={'miner':0.75,'builder':0.25,'claimler':0.0,'melee':0.00,'range':0.00};//maintain a small guard before fully developed

var armyRatio={'melee':0.5,'range':0.5};//here is the real army
    

var unitProduce={
    roleProduce:function (_role,spawn){
        if(_role=='miner'||_role=='builder'){
            if(spawn.room.energyCapacityAvailable<450||unit.getUnitSum(spawn.room)<5){
                spawn.spawnCreep([WORK,CARRY,MOVE],'Foundation Unit'+Game.time,{memory:{role:_role,target:0}});
            }
            else if(spawn.room.energyCapacityAvailable<650){
                spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],'Foundation Unit'+Game.time,{memory:{role:_role,target:0}});
            }
            else if(spawn.room.energyCapacityAvailable<850){
                spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],'Foundation Unit'+Game.time,{memory:{role:_role,target:0}});
            }
        }
        else if(_role=='melee'){
            if(spawn.room.energyCapacityAvailable<450){
                spawn.spawnCreep([TOUGH,ATTACK,MOVE],_role+Game.time,{memory:{role:_role}});
            }
            else if(spawn.room.energyCapacityAvailable<850){
                spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE],_role+Game.time,{memory:{role:_role}});
            }
            else if(spawn.room.energyCapacityAvailable<1250){
                spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE],_role+Game.time,{memory:{role:_role}});
            }
        }
        else if(_role=='range'){
            if(spawn.room.energyCapacityAvailable<450){
                spawn.spawnCreep([RANGED_ATTACK,MOVE],_role+Game.time,{memory:{role:_role}});
            }
            else if(spawn.room.energyCapacityAvailable<850){
                spawn.spawnCreep([RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE],_role+Game.time,{memory:{role:_role}});
            }
            else if(spawn.room.energyCapacityAvailable<1250){
                spawn.spawnCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE],_role+Game.time,{memory:{role:_role}});
            }
        }
        else if(_role=='claimler'){
            spawn.spawnCreep([CLAIM,MOVE],_role+Game.time,{memory:{role:_role}});
        }
    },
    
    produce:function (spawn){
        if(Game.time%100==0){
            if(expand.canExpand(spawn.room)){
                this.roleProduce('claimler',spawn);
                return;
            }
        }
        var sum=unit.getRoleSum('miner')+unit.getRoleSum('builder');
        if(unit.getRoleSum('miner')<5*spawn.room.find(FIND_SOURCES).length || unit.getRoleSum('builder')<2*spawn.room.find(FIND_SOURCES).length){//before fully developed
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
            if(armySum>8) return;
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