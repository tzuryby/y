//~ var tasklist = window.tasklist = {};

//~ tasklist.newId = function () { 
    //~ lastId = wave.getState().get('lastTaskId', 0);
    //~ return lastId+1;
//~ };

//~ tasklist.Task = function() { return {'title': '', 'done': 0, 'id': tasklist.newId()}; };
//~ tasklist.Tasklist = function(){ return wave.getState().get('taskList', {});};

//~ tasklist.addNew = function (newTask){ 
    //~ alert("addNewCalled");
    //~ list = tasklist.TaskList();
    //~ list[newTask.taskId] = newTask;
    //~ wave.getState().submitDelta({'taskList': list});    
//~ };

//~ tasklist.Delete = function (taskId) { 
    //~ alert("DeleteCalled");
    //~ list = tasklist.TaskList()
    //~ delete tasklist.TaskList()[taskId];
    //~ wave.getState().submitDelta({'taskList': list});
//~ };

//~ tasklist.RenderList = function(){ 
    //~ alert("RenderCalled");
    //~ $.each(tasklist.Tasklist(), function(k,v){
        //~ var newNode = $(
            //~ "<div class='task'>" 
            //~ + v.title 
            //~ + "</div>"
        //~ );
        //~ $("#taskList").append(newNode);
    //~ });
//~ };

//~ function addNewTaskHandler(){    
    //~ var task = tasklist.Task();
    //~ task.title = $("#newTaskTitle").val();
    //~ tasklist.addNew(task);
    //~ alert(".click called");
//~ }
//~ //$("#addNewLink").click(addNewTaskHandler);

//~ function init() {
  //~ if (wave && wave.isInWaveContainer()) {
    //~ wave.setStateCallback(tasklist.RenderList);
  //~ }
  //~ else {
    //~ alert ("wave is not initialized");
  //~ }
//~ }