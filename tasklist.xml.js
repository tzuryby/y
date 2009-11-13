(function () {
    
    function getGadgetState(){
        return wave.getState().get('fuck', '[{title:""}]');
    }
    
    function updateDom(){
        var tasks = $.json.parse(getGadgetState());
        tasks.each(function(){
            $("#tasklist").append("<div class='listItem'>" + this.title + "</div>");
        });
    }
    
    function updateState(){
        tasks = [];
        $("div.listItem").each(function(){
            tasks.append({title: this.html());
        });
        wave.getState().submitDelta({'fuck': $.json.stringify(tasks)});
    }
    
    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#newTaskButton").click(function(){
            alert("sdAF");
            tasks = [];
            $("div.listItem").each(function(){
                tasks.append({title: this.html()});
            });
            tasks.append({title: $("#newTaskTitle").val()});
            wave.getState().submitDelta({'fuck': $.json.stringify(tasks)});
        });
    }

    gadgets.util.registerOnLoadHandler(init);

})();