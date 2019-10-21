var task={
    addTask: function(taskType,sourceID,targetID){
        var newTask={
            taskType:taskType,
            sourceID:sourceID,
            targetID:targetID,
        }
        return newTask;
    },
    assignTask: function(creep,task){
        creep.memory.task=task.taskType;
        creep.memory.sourceID=task.sourceID;
        creep.memory.targetID=task.targetID;
    }
}

module.exports=task;