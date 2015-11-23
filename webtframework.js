webtFramework = {

    /**
     * method syncronizes app events
     * @param k
     * @param condition
     */
    sync : function(k, condition){

        try{
            if (eval(condition) == true) {
                try{
                    k();
                } catch(e) {
                    console.log(e);
                }
            } else {
                setTimeout(arguments.callee,10);
            }
        } catch(e) {
            setTimeout(arguments.callee,10);
        }
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