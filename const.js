const cst = {
    minerType: 0,
    miner: {
        toSource: 0,
        mine: 1,
        wait: 2,
        type: {
            basic: {
                cost: 200,
                parts: [WORK, CARRY, MOVE]
            },
            medium: {
                cost: 500,
                parts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
            },
            advanced: {
                cost: 800,
                parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
            },
            ultra: {
                cost: 1050,
                parts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
            }
        }
    },
    source: {
        hasMiner: 0,
        mining: 1,
        noMiner: 2,
    }
};

module.exports = cst;