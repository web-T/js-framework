webtFramework = {

    /**
     * method syncronizes app events
     * @param k
     * @param condition
     */
    sync : function(k, condition){

        (function(){
            try{
                if (eval(condition) == true) {
                    k();
                } else {
                    setTimeout(arguments.callee,10);
                }
            } catch(e) {
                setTimeout(arguments.callee,10);
            }}
            )();
    },

    /**
     * simple inject function
     * @param module
     */
    inject : function(module){

        if (module){

            for (var i in module){

                this[i] = module[i];

            }

        }

    }

}

// make alias
wF = webtFramework;