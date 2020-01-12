

var structure = {
    init:function(){
        Memory.structures={};
    },
    initStructure: function(structure){
        Memory.structures[structure]={
            expectedEnergy:0
        };
    },
    expectEnergy: function(structure,amount){
        if(amount!=undefined){
            Memory.structures[structure].expectedEnergy+=amount;
        }
        return Memory.structures[structure].expectedEnergy;
    },
};

module.exports = structure;