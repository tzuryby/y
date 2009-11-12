tasklist = window.tasklist = {};
tasklist.newId = function () { return wave.getState().get('lastTaskId', '1');};

tasklist.Task = function() { return {'title': '', 'done': false, id: tasklist.newId()}; };

tasklist.Tasklist = function(){ return wave.getState().get('taskList', {});};

tasklist.addNew = function (newTask){ 
    alert("addNewCalled");
    list = tasklist.TaskList()
    list[newTask.taskId] = newTask;
    wave.getState().submitDelta({'taskList': list});    
};

tasklist.Delete = function (taskId) { 
    alert("DeleteCalled");
    list = tasklist.TaskList()
    delete tasklist.TaskList()[taskId];
    wave.getState().submitDelta({'taskList': list});    
};

tasklist.RenderList = function(){ 
    alert("RenderCalled");
    $.each(tasklist.Tasklist(), function(k,v){
        var newNode = $(
            "<div class='task'>" 
            + v.title 
            + "</div>"
        );
        $("#taskList").append(newNode);
    });
};

function addNewTaskHandler(){
    alert(".click called");
    var task = tasklist.newTask();
    task.title = $("#newTaskTitle").val();
    tasklist.addNew(task);
}
//$("#addNewLink").click(addNewTaskHandler);

function init() {
  if (wave && wave.isInWaveContainer()) {
    wave.setStateCallback(tasklist.RenderList);
  }
  else {
    alert ("wave is not initialized");
  }
}