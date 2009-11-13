(function (){
    function getGadgetState(){
        return wave.getState().get('fuck', '0');
    }
    
    function getStateInt(){                    
        return parseInt(getGadgetState());
    }
    
    function updateDom(){
        $("#content_div").html(getStateInt());
        var newState = wave.getState().get('fuck-you', '{}');
        $("#fuck-div").html(newState);
    }  

    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#fuck").click(function(){
            wave.getState().submitDelta({'fuck': getStateInt()+1});          
        });
        
        $("#fuckyou").click(function(){
            var newState = wave.getState().get('fuck-you', '{}');
            newState = $.json.parse(newState);
            newState.a = "1";
            newState = $.json.stringify(newState);
            wave.getState().submitDelta({'fuck-you': newState});
            
        });
    }
    gadgets.util.registerOnLoadHandler(init);
})();