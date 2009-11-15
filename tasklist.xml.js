(function (){
    
    var randomchars = 'abcdefghijklmnopqrstuvwxyz1234567890'.split("");
    function randomchar (){return randomchars[Math.round(Math.random() * images.length-1)]; }    
    function fakeuuid(){return [randomchar(), randomchar(), randomchar(), randomchar(), randomchar()].join("");}
    
    function addTask(task){
        current = wave.getState().get("tasks", '{}');
        current = (current && $.json.parse(current)) || {};
        current[task.id] = task;
        current = $.json.stringify(current);
        wave.getState().submitDelta({"tasks": current});
    }
    
    function toggleDone(taskId){
        current = wave.getState().get("tasks", '{}');
        current = (current && $.json.parse(current)) || {};
        current[taskid].done = !current[taskid].done;
        current = $.json.stringify(current);
        wave.getState().submitDelta({"tasks": current});
    }
    
    function domifyList(){
        current = wave.getState().get("tasks", '{a:1}');
        current = (current && $.json.parse(current));
        
        // clean tasks from dom
        $("#tasklist").empty();
        
        // render list items
        $.each(current, function(){
            $("#tasklist").append(
                "<div class='task' taskId='" + this.id + "'" + ((this.done) ? " class='doneTask' " : "" ) + ">" + 
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
            addTask(task);
        });
        
        $(".taskCheckBox").live("click", function(){
            var taskId = $(this).parent().attr("taskId");
            alert("taskId:" + taskId);
            toggleDone(taskId);
        });
    }
    
    gadgets.util.registerOnLoadHandler(init);

})();