/**
 * web-T::Framework Loader module
 * @author goshi
 */

webtFramework.inject({

    /**
     * loaders collection
     */
    __loaders : [],

    /**
     * universal UI  loader (strobber)
     * @param container
     * @param params
     * @returns {*}
     */
    loader : function(container, params){

        var id = this.__loaders.length;

        var self = this;

        var vids = [];

        $(container).each(function(){

            if ($(this).css('position') == 'static' || !$(this).css('position')){
                $(this).css('position', 'relative');
            }

            var vid = id+'-'+vids.length;
            vids.push(vid);

            var proto = '<span class="b-strobber-cont" id="loader-'+vid+'" style="display: none;'+(typeof params != 'undefined' && typeof params.position != 'undefined' && params.position && params.position == 'static' ? 'position: relative !important;' : '')+'"><span class="strobber-bg"></span><span class="strobber"></span></span>';
            $(this).append(proto);
            setTimeout(function(){$('#loader-'+vid).show(100);}, 100);

        });

        this.__loaders[id] = {

            __cid: id,
            __vids: vids,
            __cont: container,

            destroy: function(callback){

                var called = false;

                for (var i= 0,l=this.__vids.length; i<l; i++){
                    $('#loader-'+this.__vids[i]).hide(100, function(){
                        $(this).remove();
                        if (!called && typeof callback == 'function'){
                            callback();
                            called = true;
                        }
                    });
                }

                self.__loaders[this.__cid] = null;

            }

        };

        return this.__loaders[id];

    }

});