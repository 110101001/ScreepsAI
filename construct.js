const lvlext={1:0,2:5,3:10,4:20,5:30,6:40,7:50,8:60};

var construct={
    getLevel:function(room){
        return room.controller.level;
    },
    road:function(pos1,pos2,err){
        var retv=PathFinder.search(pos1,{pos:pos2,range:err});
        for(var pts in retv.path){
            Game.rooms[retv.path[pts].roomName].createConstructionSite(retv.path[pts],STRUCTURE_ROAD);
        }
    },
    autoRoad:function(_room){
        var lvl=this.getLevel(_room);
        if(lvl>=2){
            var sources = _room.find(FIND_SOURCES);
            var spawn =  _room.find(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}});
            for(var index in sources){
                this.road(spawn[0].pos,sources[index].pos,2);
            }
            this.road(spawn[0].pos,_room.controller.pos,2);
        }
    },
    extension:function(_room){
        var extNum=_room.find(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}}).length + 
        _room.find(FIND_CONSTRUCTION_SITES,{filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}}).length
        var extToBuild=CONTROLLER_STRUCTURES['extension'][this.getLevel(_room)]-extNum;
        var spawnPos=_room.find(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}})[0].pos;
        if(extToBuild<1){
            return;
        }
        for(var i=0;i<=6;i++){
            for(var j=0;j<=10;j+=2){
                if(!_room.createConstructionSite(spawnPos.x-10+i,spawnPos.y-5+j+i%2,STRUCTURE_EXTENSION)){
                    extToBuild-=1;
                    if(extToBuild==0){
                        return;
                    }
                }
            }
        }
    },
    autoTower:function(_room){
        var lvl=this.getLevel(_room);
        if(lvl>=3){
            var spawnPos=_room.find(FIND_STRUCTURES,{filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}})[0].pos;
            _room.createConstructionSite(spawnPos.x+10,spawnPos.y,STRUCTURE_TOWER);
             
        }
    }
};

module.exports = construct;