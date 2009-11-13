(function (){
    
    function addTask(task){
        current = wave.getState().get("tasks", '{}');
        current = (current && $.json.parse(current)) || {};
        current[new Date()] = task;
        current = $.json.stringify(current);
        wave.getState().submitDelta({"tasks": current});
    }
        
    function updateDom(){
        current = wave.getState().get("tasks", '{a:1}');
        current = (current && $.json.parse(current)) || {};
        $.each(current, function(){
            $("#tasklist").append(
                "<div>" + this.title + "</div>"
            );
        });
    }  

    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#newTaskLink").click(function(){
            addTask({title: $("#newTaskText").val()});
        });
    }
    gadgets.util.registerOnLoadHandler(init);
})();