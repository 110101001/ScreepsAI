var task={
    addTask: function(importance,taskType,sourceID,targetID){
        var newTask={
            taskType:taskType,
            sourceID:sourceID,
            targetID:targetID,
        }
        return newTask;
    },
    assignTask: function(creep,task){
        creep.memory.task=task.taskType;
        creep.memory.source=task.sourceID;
        creep.memory.target=task.targetID;
    }
}

module.exports=task;