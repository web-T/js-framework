webtFramework = {

    /**
     * method syncronizes app events
     * @param k
     * @param condition
     */
    sync : function(k, condition){

        (function(z, cond){

            var self = arguments.callee;
            var args = arguments;
            try{
                if (eval(cond) == true) {
                    try{
                        z();
                    } catch(e) {
                        console.log(e);
                    }
                } else {
                    setTimeout(function(){self.apply(null,args)},500);

                }
            } catch(e) {
                setTimeout(function(){self.apply(null,args)},500);
            }
        })(k, condition);
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