(function (){
    if (! window.console ) {
        window.console = {log: function(){}};
    }
    
    //~ function __get__(k){
        //~ return eval('(' + wave.getState().get(k) + ')');
    //~ }
    
    var randomchars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split("");
    function randomchar (){return randomchars[Math.round(Math.random() * randomchars.length-1)]; }   
    // generate randomized 4 bytes string. *not* to be use in real world app.
    function fakeuuid(){return [randomchar(), randomchar(), randomchar(), randomchar()].join("");}
    
    // shorthand to the wave's state. getter and setter as one.
    // passing a string - means get value of keys
    // passing an object - means submit delta
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
        //~ var tasks = __get__("tasks");
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
        
        // render DOM elements
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
        
        var msg = $state("notify");
        msg = (msg && $.json.parse(msg)) || {};
        if (msg){
            $("#notificator").html(msg).show();
            setTimeout(function(){
                $("#notificator").hide(); 
                $state({"notify": ''});
            }, 3000);
        }
    }
    
    // push this message into the notify wave's state
    // will be displaied at the callback (domifyList)
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