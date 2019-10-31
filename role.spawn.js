var spawn={
    init:function(){
        Memory.spawnState = {
            state_idle: 0,
            state_waitingResource: 1,
            state_spawning: 2,
            state_renew: 3,
            state_recycle: 4,
        };
        Memory.task.task_spawnWorker=0;
    },
    run:function(){

    }
}

module.exports=spawn;