(function (){
    if (!wave){
        wave = {}
        wave.getState = function() {
            return {
                get : function () { 
                    return {
                    1: {done:false, title: "do this"},
                    2: {done:false, title: "do that"}
                    }
                },
                
                submitDelta: function(){}
            };
        };
        
    }
    
    function addTask(task){
        current = wave.getState().get("tasks", '{}');
        current = (current && $.json.parse(current)) || {};
        current[new Date()] = task;
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
            addTask({title: $("#newTaskText").val()});
        });
        
        $(".taskCheckBox").live("click", function(){
            var taskId = $(this.parent).attr("taskId");
            wave.log("taskId:" + taskId);
            toggleDone(taskId);
        });
    }
    
    gadgets.util.registerOnLoadHandler(init);

})();