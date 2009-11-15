(function (){
    
    var randomchars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split("");
    function randomchar (){return randomchars[Math.round(Math.random() * randomchars.length-1)]; }    
    function fakeuuid(){return [randomchar(), randomchar(), randomchar(), randomchar(), randomchar()].join("");}
    
    function modifyList(modifier, arg){
        tasks = wave.getState().get("tasks", '{}');
        tasks = (tasks && $.json.parse(tasks)) || {};
        tasks = $.json.stringify(modifier(tasks, arg));
        wave.getState().submitDelta({"tasks": tasks});    
    }
    
    function addTask(tasks, task){
        console.log('tasks by far: ', tasks);    
        console.log('new task: ', task);
        tasks[task.id] = task;
        console.log('update tasklist', tasks);
        return tasks;
    }
    
    function toggleDone(tasks, taskId){
        console.log(tasks);
        console.log(taskId);
        tasks[taskId].done = !tasks[taskId].done;
        return tasks;
    }
    
    function domifyList(){
        current = wave.getState().get("tasks", '{a:1}');
        current = (current && $.json.parse(current));
        
        // clean tasks from dom
        $("#tasklist").empty();
        
        // render list items
        $.each(current, function(){
            $("#tasklist").append(
                "<div taskId='" + this.id + "'" +  "class='task" + ((this.done) ? " doneTask' " : "'" ) + ">" + 
                    "<input class='taskCheckBox' type='checkbox'" + 
                        ((this.done) ? " checked='checked' " : "") + " />" +
                    "<input type='text' value='" + 
                        this.title + "' class='taskInput' />" +
                "</div>"
            );
        });
    }
    
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
    }
    
    gadgets.util.registerOnLoadHandler(init);

})();