window.tasklist = window.tasklist || {};
tasklist = window.tasklist;

tasklist.newId = function () { return wave.getState().get('lastTaskId', '1');};

tasklist.Task = function() { return {'title': '', 'done': false, id: tasklist.newId()}; };

tasklist.Tasklist = function(){ return wave.getState().get('taskList', {});};

tasklist.addNew = function (newTask){ 
    list = tasklist.TaskList()
    list[newTask.taskId] = newTask;
    wave.getState().submitDelta({'taskList': list});    
    alert("addNewCalled");
};

tasklist.Delete = function (taskId) { 
    list = tasklist.TaskList()
    delete tasklist.TaskList()[taskId];
    wave.getState().submitDelta({'taskList': list});    
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


$("#addNewLink").click(function(){
    var task = tasklist.newTask();
    task.title = $("#newTaskTitle").val()
    tasklist.addNew(task);
});

function init() {
  if (wave && wave.isInWaveContainer()) {
    wave.setStateCallback(tasklist.RenderList);
  }
}