/**
 * web-T::Framework Languages module
 * @author goshi
 */

webtFramework.inject({

    trans : function(what){

        if (!what)
            return null;

        var w = what.split('.'), found = false;

        if (window['ph']){

            var level = window['ph'];
            for (var i in w){
                if (typeof level[w[i]] != 'undefined' && level[w[i]] !== null){
                    level = level[w[i]];
                } else {
                    return what;
                }
            }

            return level;

        }

        return what;

    }
});
