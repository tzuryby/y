(function () {
    
    function _get(){
      return eval("(" + wave.getState().get('fuckmehard', '{}') + ")");
    }
    function _set(){
        wave.getState().submitDelta({'fuckmehard': "{current: Date()}"});
    }
    
    function getGadgetState(){
        return wave.getState().get('fuck', '0');
    }
    
    function getStateInt(){                    
        return parseInt(getGadgetState());
    }
    
    function updateDom(){
        $("#content_div").html(getStateInt());    
        //alert(wave.getState().toString());                                    
    }  

    function init() {
        if (!wave && !wave.isInWaveContainer()) { return; }
        
        $(document).ready(function() {
            wave.setStateCallback(updateDom);
        });
        
        $("#fuck").click(function(){
            alert(wave.getState().toString());
            _set();
            wave.getState().submitDelta({'fuck': getStateInt()+1});
        });
    }

    gadgets.util.registerOnLoadHandler(init);

})();