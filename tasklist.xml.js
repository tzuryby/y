(function (){
    if (! window.console ) {
        window.console = {log: function(){}};
    }
    var randomchars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split("");
    function randomchar (){return randomchars[Math.round(Math.random() * randomchars.length-1)]; }   
    // generate randomized 5 bytes string. *not* to be use in real world app.
    function fakeuuid(){return [randomchar(), randomchar(), randomchar(), randomchar(), randomchar()].join("");}
    
    function modifyList(modifier, arg){
        var tasks = wave.getState().get("tasks", '{}');
        tasks = (tasks && $.json.parse(tasks)) || {};
        tasks = modifier(tasks, arg);
        tasks = $.json.stringify(tasks);
        wave.getState().submitDelta({"tasks": tasks});
    }
    
    function addTask(tasks, task){
        tasks[task.id] = task;
        return tasks;
    }
    
    function delTask(tasks, taskId){
        delete tasks[taskId];
        return tasks;    
    }
    
    function toggleDone(tasks, taskId){
        tasks[taskId].done = !tasks[taskId].done;
        return tasks;
    }
    
    // make the list way into the DOM
    function domifyList(){
        current = wave.getState().get("tasks", '{a:1}');
        current = (current && $.json.parse(current));
        
        // clean tasks from dom
        $("#tasklist").empty();
        
        // render list items
        $.each(current, function(){
            $("#tasklist").append(
                "<div taskId='" + this.id + "'" +  
                    "class='task" + ((this.done) ? " doneTask' " : "'" ) + ">" + 
                    "<input class='taskCheckBox' type='checkbox'" + 
                        ((this.done) ? " checked='checked' " : "") + " />" +
                    "<input type='text' value='" + 
                        this.title + "' class='taskInput' />" +
                    "<a class='deleteTask' href='#'>" +
                    "<img src='http://github.com/tzuryby/y/blob/master/static/media/del.png' /></a>" + 
                        
                "</div>"
            );
        });
    }
    
    // 
    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(domifyList);
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
        
        $(".taskCheckBox").live("change", function(){
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