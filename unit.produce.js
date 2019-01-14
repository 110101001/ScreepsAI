var unit=require('unit');

var roles=new Array(2);

roles[0]='miner';
roles[1]='builder';

var ratio={'miner':0.7,'builder':0.3};
    

var unitProduce={
    roleProduce:function (_role,spawn){
        if(_role=='miner'||_role=='builder')
        spawn.spawnCreep([WORK,CARRY,MOVE],_role+Game.time,{memory:{role:_role,target:0}});
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