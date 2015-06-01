webtFramework = {

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