/**
 * web-T::Framework Cookies Module
 * @author goshi
 */

webtFramework.inject({cookie : {

    set : function(name, value, expires, path, domain, secure) {
        document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    },

    get : function (name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(";", offset);
                if (end == -1) {
                    end = cookie.length;
                }
                setStr = unescape(cookie.substring(offset, end));
            }
        }
        return(setStr);
    },

    remove : function(name) {
        var d = new Date();
        d = d.setTime(d.getTime() + -1*1000);
        if (d && d.toUTCString) {
            d = d.toUTCString();
        }

        webtFramework.cookie.set(name, "", d, '/');
    }

}});
