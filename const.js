const cst = {
    minerType: 0,
    carrierType: 1,
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
    carrier: {
        toMiner: 0,
        toPos: 1,
        toTarget: 2,
        pull: 3,
        fetch:4,
        export:5,
        type: {
            basic: {
                cost: 100,
                parts: [CARRY, MOVE]
            },
            medium: {
                cost: 300,
                parts: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
            },
            advanced: {
                cost: 500,
                parts: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            ultra: {
                cost: 1000,
                parts: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
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