(function (){
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
            var foo = [1,2,3,4],
                bar = {a:1, b:2};
                
            var baz = {a: foo, b: bar};
            
            alert($.json.parse($.json.stringify({a:[1,2,3,4]})).a);            
        });
    }
    gadgets.util.registerOnLoadHandler(init);
})();