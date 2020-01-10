cst = require('const');
require('role.miner');

var role = {
    run: function (creep) {
        switch (creep.type) {
            case cst.minerType:
                miner.run(creep);
                break;
        }
    }
}