var construction = {
    init: function () {
        Memory.structures = {};
    },
    structureInit: function (structure) {
        Memory.structures[structure.id] = {
            expectEnergy: 0
        };
    },
    spawnInit: function (spawn) {
        spawn.memory.task = -1;
    },
    roadDesign0: function (room) {
        var source = room.controller.pos.findClosestByPath(FIND_SOURCES);
        var path = room.controller.pos.findPathTo(source);
        this.roadSitePut(path, room);
    },
    roadSitePut: function (cords, room) {
        for (var i in cords) {
            var pos = new RoomPosition(cords[i].x, cords[i].y, room.name);
            pos.createConstructionSite(STRUCTURE_ROAD);
        }
    },
    constructDesign: function (room) {
        //Normal Develop Sequence:
        //RCL1->RCL2->road1->extension5->RCL3->Tower1->road2->extension10->RCL4->extension20->allRoad
        switch (room.memory.task) {
            case Memory.roomTask.task_idle:
                switch (room.controller.level) {
                    case 1://RCL1->RCL2
                        //do nothing but to wait for upgrade
                        break;
                    case 2://RCL2->road
                        this.roadDesign0(room);
                        break;
                }
                break;
        }

    }
};

module.exports = construction;