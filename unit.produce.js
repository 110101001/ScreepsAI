var unit=require('unit');

var roles={'miner','builder'};
var ratio={'miner':0.5,'builder':0.5};
    

var unitProduce={
    roleProduce0:function (_role,spawn){
        if(role=='miner'||role=='builder')
        spawn.spawnCreep([WORK,CARRY,MOVE],_role+Game.time,{memory:{role:_role}});
    },
    
    produce:function (spawn){
        var sum=unit.getUnitSum();
        for(var role in roles){
            if(unit.getRoleSum(role)/sum<ratio[role]){
                this.roleProduce0(role,spawn);
                return;
            }
        }
    }
};


module.exports = unitProduce;