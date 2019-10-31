var construction={
    init:function(){
        Memory.structures={};
    },
    structureInit:function(structure){
        Memory.structures[structure.id].expectEnergy=0;
    },
    spawnInit:function(spawn){
        spawn.memory.task=-1;
    },
    constructGen: function (room) {
        //Normal Develop Sequence:
        //RCL1->RCL2->road1->extension5->RCL3->Tower1->road2->extension10->RCL4->extension20->
        switch (room.memory.task) {
            case Memory.roomTask.task_idle:
                switch (room.memory.stage) {
                    case Memory.roomStage.L1://RCL1->RCL2
                        //do nothing but to wait for upgrade
                        break;
                }
                break;
        }

    }
};

module.exports=construction;