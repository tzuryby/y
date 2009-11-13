(function (){

    var waveState = {
        getValue : function (k, v){
            return wave.getState().get(k, v);
        },
        
        setValue: function (k, v){
            wave.getState().submitDelta(k, v);
        }
    };
    
    var taskManager = {
    
        get: function (){
            return $.json.parse(waveState.getValue('E'));
        },
        set: function (tasks){
            alert(tasks);
            tasks = $.json.stringify(tasks);
            alert(tasks);
            waveState.setValue('E', tasks);
        },
        add: function (task){
            tasks = taskManager.get();
            alert($.json.stringify(tasks));
            tasks[task.id] = task;
            taskManager.set(tasks);
        },
        remove: function(k){
            tasks = taskManager.get();
            delete tasks[k];
            taskManager.set(tasks);        
        },
        toggle: function (id){
            tasks = taskManager.get();
            tasks[k].done = ! tasks[k].done;
            taskManager.set(tasks);         
        }
    }
        
    function updateDom(){
        tasks = taskManager.get();
        $.each(tasks, function(){
            $("#tasklist").append(
                "<div class='task'>" + this.title + "</div>"
            );
        });
    }  

    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#newTaskLink").click(function(){
            taskManager.add({title: $("#newTaskText").val(), id: new Date()});
        });
    }
    gadgets.util.registerOnLoadHandler(init);
})();