(function () {
    
    function getGadgetState(){
        return wave.getState().get('fuck', '[{title:""}]');
    }
    
    function updateDom(){
        //~ var tasks = $.json.parse(getGadgetState());
        //~ $.each(tasks, function(){
            //~ $("#tasklist").append("<div class='listItem'>" + this.title + "</div>");
        //~ });
    }
    
    function updateState(){
        //~ tasks = [];
        //~ $("div.listItem").each(function(){
            //~ tasks.append({title: this.html());
        //~ });
        //~ wave.getState().submitDelta({'fuck': $.json.stringify(tasks)});
    }
    
    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#fuck").click(function(){
            alert("DSfSDFDFSDF");
        });     
    }

    gadgets.util.registerOnLoadHandler(init);

})();