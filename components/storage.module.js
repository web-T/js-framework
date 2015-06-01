/**
 * web-T::Framework Popup module
 * @author goshi
 */

webtFramework.inject({

    storage : {

        set : function(key, data){

            if (key && typeof(Storage) !== "undefined"){
                localStorage[key] = data;
                return true;
            } else {
                return false;
            }

        },

        get : function(key){

            if (typeof(Storage) !== "undefined" && localStorage[key]){
                return localStorage[key];
            } else {
                return null;
            }

        }

    }

});