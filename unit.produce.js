var unit=require('unit');

var roles=new Array(3);

roles[0]='miner';
roles[1]='builder';
roles[2]='melee';

var ratio={'miner':0.9,'builder':0.1,'melee':0.00};
    

var unitProduce={
    roleProduce:function (_role,spawn){
        
        if(_role=='miner'||_role=='builder'){
            spawn.spawnCreep([WORK,CARRY,MOVE],_role+Game.time,{memory:{role:_role,target:0}});
        }
        else if(_role=='melee'){
            spawn.spawnCreep([TOUGH,ATTACK,MOVE],_role+Game.time,{memory:{role:_role}});
        }
    },
    
    produce:function (spawn){
        var sum=unit.getUnitSum();

        for(var index in roles){
            if(unit.getRoleSum(roles[index])/sum<ratio[roles[index]]){
                this.roleProduce(roles[index],spawn);
                return;
            }
        }
        this.roleProduce(roles[0],spawn);
        return;
    }
};


module.exports = unitProduce;