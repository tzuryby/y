(function (){
    if (! window.console ) {
        window.console = {log: function(){}};
    }
    var randomchars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split("");
    function randomchar (){return randomchars[Math.round(Math.random() * randomchars.length-1)]; }   
    // generate randomized 5 bytes string. *not* to be use in real world app.
    function fakeuuid(){return [randomchar(), randomchar(), randomchar(), randomchar(), randomchar()].join("");}
    
    // Object.prototype.values = function (){var arr = [];for (i in this) arr.push(this[i]); return arr;}
    // Object.prototype.keys = function (){var arr = [];for (i in this) arr.push(i); return arr;}
    
    function $state(arg){
        argtype = typeof arg;
        switch (argtype){
            // get
            case "string":
                return wave.getState().get(arg, '{}');
            //set
            case "object":
                wave.getState().submitDelta(arg);
        }
    }
    
    function modifyList(modifier, arg){
        var tasks = $state("tasks");
        tasks = (tasks && $.json.parse(tasks)) || {};
        tasks = modifier(tasks, arg);
        tasks = $.json.stringify(tasks);
        $state({"tasks": tasks});
    }
    
    function addTask(tasks, task){
        tasks[task.id] = task;
        notify("add/update task: " + task.title);
        return tasks;
    }
    
    function delTask(tasks, taskId){
        delete tasks[taskId];
        notify("task#" + taskId + " deleted");
        return tasks;    
    }
    
    function toggleDone(tasks, taskId){
        tasks[taskId].done = !tasks[taskId].done;
        var msg = (tasks[taskId].done) ?  
            "you are finally done with that " + tasks[taskId].title + " thing." :
            tasks[taskId].title + " is not done yet";
        notify(msg);
        return tasks;
    }
    
    // make the list way into the DOM
    function domifyList(){
        current = $state("tasks");
        current = (current && $.json.parse(current));
        
        // clean tasks from dom
        $("#tasklist").empty();
        $.each(current, function(){
                $("#tasklist").append(
                    "<div taskId='" + this.id + "'" +  
                        "class='task" + ((this.done) ? " doneTask' " : "'" ) + ">" + 
                        "<input class='taskCheckBox' type='checkbox'" + 
                            ((this.done) ? " checked='checked' " : "") + " />" +
                        "<input type='text' value='" + 
                            this.title + "' class='taskInput' />" +
                        "<a class='deleteTask' href='#'>" +
                        "<img src='http://github.com/tzuryby/y/raw/master/static/media/del.png'" +
                        " alt='delete task' title='delete task' /></a>" +                         
                    "</div>"
                );   
        });              
        
        //~ // iter through the wave's tasks and update DOM accordinglly.
        //~ $.each(current, function(){
            //~ // check if tasks exists and if it differ from the wave's copy //            
            //~ // if not exists in the DOM, add items
            //~ var domTask = $("#tasklist").children("div[taskId=" + this.id + "]");
            
            //~ // task exists
            //~ if (domTask.length){
                //~ domTask = $(domTask[0]);                
                //~ // check if task share same atrributes, leave it.
                //~ var domTitle = domTask.children("input.taskInput").val(),
                    //~ domDone = domTask.children("input:checkbox").val();
                    
                //~ if (domTitle === this.title && (!!domDone == !!this.done)) {
                    //~ // same shit, leave it
                    //~ console.log("ignore task#" + this.id);
                //~ }
                
                //~ else {
                    //~ console.log("update task#" + this.id);
                    //~ domTask.children("input.taskInput").val(this.title);
                    //~ if (this.done){
                        //~ domTask.children("input:checkbox").attr("checked", "checked");
                    //~ }
                    //~ else {
                        //~ domTask.children("input:checkbox").removeAttr("checked");
                    //~ }
                //~ }
            //~ }
            //~ else{
                //~ // wave's task not in DOM yet, add it.
                //~ console.log("adding task#" + this.id);
                //~ $("#tasklist").append(
                    //~ "<div taskId='" + this.id + "'" +  
                        //~ "class='task" + ((this.done) ? " doneTask' " : "'" ) + ">" + 
                        //~ "<input class='taskCheckBox' type='checkbox'" + 
                            //~ ((this.done) ? " checked='checked' " : "") + " />" +
                        //~ "<input type='text' value='" + 
                            //~ this.title + "' class='taskInput' />" +
                        //~ "<a class='deleteTask' href='#'>" +
                        //~ "<img src='http://github.com/tzuryby/y/raw/master/static/media/del.png'" +
                        //~ " alt='delete task' title='delete task' /></a>" +                         
                    //~ "</div>"
                //~ );       
            //~ }
        //~ });
        
            
        //~ // at last, check if there are DOM tasks which exists in DOM only.
        //~ var delList = [];
        //~ $("#tasklist").children("div.task").each(function(){
            //~ var id = $(this).attr("taskId");
            //~ if (!current[id]){
                //~ delList.push(id);
            //~ }
        //~ });
        
        //~ for (i in delList){
            //~ console.log("deleting task#" + this.id);
            //~ /// remove this id from DOM
            //~ $("div[taskId=" + delList[i] + "]").remove();
        //~ }
        
        var msg = $state("notify");
        if (msg){
            $("#notificator").html(msg).slideDown("slow");
            setTimeout(function(){$("#notificator").slideUp("slow");}, 5000);        
        }
    }
    
    function notify(msg){
        $state({"notify": msg});
    }
    
    // 
    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(domifyList);
            $("#notificator").hide();
        });
        
        $("#newTaskLink").click(function(){
            task = {
                title: $("#newTaskText").val(), 
                id: fakeuuid()
            };
            modifyList(addTask,task);
        });
        
        $(".taskCheckBox").live("click", function(){
            var parent = $(this).parent();
            parent.toggleClass('doneTask');
            var taskId = parent.attr("taskId");
            modifyList(toggleDone,taskId);
        });
        
        $(".deleteTask").live("click", function(){
            var parent = $(this).parent();
            var taskId = parent.attr("taskId");
            modifyList(delTask,taskId);        
        });
        
        $(".taskInput").live("change", function(){
            var parent = $(this).parent();
            var taskId = parent.attr("taskId"),
                title = $(this).val(),
                done = parent.children("input:checkbox").attr("checked");
            var task = {title: title, id: taskId, done: done};
            modifyList(addTask,task);
        
        });
        
    }
    
    gadgets.util.registerOnLoadHandler(init);

})();