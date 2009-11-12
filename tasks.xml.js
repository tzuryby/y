window.tasklist = window.tasklist || {};
tasklist = window.tasklist;

tasklist.Task = function() { return {'title': '', 'done': false}; };
tasklist.newId = function () { return wave.getState().get('lastTaskId', '1');};

tasklist.Tasklist = function(){ return wave.getState().get('taskList', {});};

tasklist.addNew = function (newTask){ 
    tasklist.TaskList()[newTask.taskId] = newTask;
};

tasklist.Delete = function (taskId) { 
    delete tasklist.TaskList()[taskId];
};

tasklist.RenderList = function(){ 

    $.each(tasklist.GetWaveState, function(k,v){
        var newNode = $(
            "<div class='task'>" 
            + v.title 
            + "</div>"
        );
        $("#taskList").append(newNode);
    });
};


function init() {
  if (wave && wave.isInWaveContainer()) {
    wave.setStateCallback(tasklist.RenderList);
  }
}