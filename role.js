const cst = require('const');
var miner = require('role.miner');

var role = {
    run: function (creep) {
        switch (creep.memory.type) {
            case cst.minerType:
                miner.run(creep);
                break;
        }
    }
}

module.exports = role;