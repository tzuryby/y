(function () {
    
    
    function getGadgetState(){
        return wave.getState().get('fuck', '0');
    }
    
    function getStateInt(){                    
        return parseInt(getGadgetState());
    }
    
    function updateDom(){
        $("#content_div").html(getStateInt());
    }  

    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#fuck").click(function(){
            wave.getState().submitDelta({'fuck': getStateInt()+1});
            alert($.json.toSource());
        });
    }

    gadgets.util.registerOnLoadHandler(init);

})();