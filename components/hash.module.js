/**
 * web-T::Framework Hash module
 * @author goshi
 */

webtFramework.inject({hash : {

    /**
     * hash events (for dispatching)
     */
    _events : {},

    /**
     * dispatchers interval
     */
    _dispatcher : null,

    /**
     * storage for parsed hash
     */
    _hash : {},

    /**
     * setup new hash
     * @param hash
     */
        set : function(hash){
        document.location.hash = hash;
    },

    /**
     * get hash
     */
    get : function(){
        return document.location.hash;
    },


    /**
     * detect if key exists in hash
     * @param key string
     * @return {Boolean}
     */
    exists : function(key){
        if (typeof key != 'undefined' && key){
            var h = webtFramework.hash.parse();
            if (key in h){
                return true;
            }
        }
        return false;
    },

    /**
     * set events for dispatching
     * @param evt string
     * @param func function
     */
    setEvent: function(evt, func){
        webtFramework.hash._events[evt] = func;
    },

    /**
     * remove event from dispatching
     * @param evt
     */
    removeEvent: function(evt){
        webtFramework.hash._events[evt] = null;
    },

    /**
     * method parse location hash and prepare key => value pairs
     * @return {Object}
     */
    parse : function(){
        var result = {};
        var url = document.location.hash;

        if (url != ''){

            var parameters = url.slice(url.indexOf('#') + 1).split('&');

            if (parameters.length > 0){
                for(var i = 0;  i < parameters.length; i++) {
                    //console.log(parameters[i].indexOf('='));
                    if (parameters[i].indexOf('=') !== -1){
                        var parameter = [parameters[i].slice(0, parameters[i].indexOf('=')), parameters[i].slice(parameters[i].indexOf('=')+1), parameters[i].length];
                        result[parameter[0]] = parameter[1];
                    } else {
                        result[parameters[i]] = null;
                    }

                }

                // saving in protected property for future use
                // parsing full url
                var domain;
                var re = new RegExp('^http:\/\/([^\/]+)', 'g');
                if (result['url'] && (domain = result['url'].match(re))){
                    result['domain'] = domain[0];
                    result['url'] = result['url'].slice(result['domain'].length, result['url'].length);
                }

            }

        }
        this._hash = result;

        return result;
    },

    /**
     * cleanup location hash
     */
    clear : function (){

        if (document.location.hash)
            document.location.hash = 'none'; //window.location = window.location.href.replace( /#.*/, "");

    },

    /**
     * method dispatch hash change and bind events on
     */
    dispatch : function(){
        var prevHash = '';
        var checkHash = function(){
            //console.log(document.location.hash, prevHash, webtFramework.hash._events[prevHash]);
            var h = document.location.hash.replace(/^#(.*)/i, '$1');
            if (h != prevHash){
                //console.log('New hash:', h);
                prevHash = h;
                var hash;

                if (typeof webtFramework.hash._events[prevHash] == 'function'){
                    hash = webtFramework.hash.parse();
                    webtFramework.hash._events[prevHash](hash);
                } else if (typeof webtFramework.hash._events['__default__'] == 'function'){
                    hash = webtFramework.hash.parse();
                    webtFramework.hash._events['__default__'](hash);
                }

            }
        };

        webtFramework.hash._dispatcher = setInterval(function(){checkHash();}, 500);
    }
}});