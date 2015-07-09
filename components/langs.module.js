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

    },

    transPlural: function(what, value){

        if (typeof value == 'undefined' || !value)
            value = 0;

        var mess = this.trans(what);

        // getting days count
        var d_cnt = Math.abs(value) % 100;
        var n1 = d_cnt % 10;
        if (d_cnt > 10 && d_cnt < 20) return typeof mess[5] != 'undefined' ? mess[5] : mess[1];
        if (n1 > 1 && n1 < 5) return mess[2];
        if (n1 == 1)
            return mess[1];
        else
            return typeof mess[5] != 'undefined' ? mess[5] : mess[2];

    }
});
