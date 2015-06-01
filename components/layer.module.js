/**
 * web-T::Framework Layer module
 * @author goshi
 */

webtFramework.inject({

    __layer : null,

    /**
     * generate new layer object
     * @param source
     * @param mixed wi property of the width of container, or if it is object - then it is complex CSS styles to apply to container
     * @param mixed he
     * @param callbacks
     * @returns {null}
     */
    layer : function(source, wi, he, callbacks){

        var proto;

        var styles = '';

        if (wi && typeof wi != 'object'){

            if (/^\d+$/.test(wi))
                styles += 'width: '+wi+'px;';
            else
                styles += 'width: '+wi+';';
        }

        if (he){
            if (/^\d+$/.test(he))
                styles += 'height: '+he+'px;';
            else
                styles += 'height: '+he+';';
        }

        var id = Math.round(Math.random()*10000);

        if (typeof source.url != 'undefined')
            proto = '<div class="webt-layer-cont" id="webtLayer'+id+'" style="display: none;"><div class="webt-layer-bg"></div><div class="webt-layer" style="'+styles+'"><iframe frameborder="0" width="'+wi+'" height="'+he+'" src="'+source.url+'"></iframe><span class="webt-layer-close"></span></div></div>';
        else if (typeof source.html != 'undefined' && source.html)
            proto = '<div class="webt-layer-cont" id="webtLayer'+id+'" style="display: none;"><div class="webt-layer-bg"></div><div class="webt-layer" style="'+styles+'"><div class="webt-layer-inner" >'+source.html+'</div><span class="webt-layer-close"></span></div></div>';
        else
            proto = '<div class="webt-layer-cont" id="webtLayer'+id+'" style="display: none;"><div class="webt-layer-bg"></div><div class="webt-layer" style="'+styles+'"><div class="webt-layer-inner" ></div><span class="webt-layer-close"></span></div></div>';

        if (this.__layer){
            this.__layer.destroy();
        }

        var self = this;

        // function resizes and repositions the layer container
        var resizeLayer = function(){

            var l = $('#webtLayer'+id+' .webt-layer');

            l.css('margin-left', 0-l.width()/2);

            if (l.height() > $(window).height()){
                l.css('margin-top', $(window).scrollTop());
            } else {
                l.css('margin-top', $(window).scrollTop() + ($(window).height() - l.height())/2);
            }

        }


        this.__layer = {

            __source: source,

            getContent : function(){

                return $('#webtLayer'+id+' .webt-layer-inner');

            },

            getContainer : function(){

                return $('#webtLayer'+id);

            },

            setContent: function(content){

                this.getContent().html(content);
                resizeLayer();

            },

            destroy: function(callback){

                $('#webtLayer'+id).hide(100, function(){
                    $(this).remove();
                    if (typeof callback == 'function'){
                        callback();
                    } else if (typeof callbacks == 'object' && callbacks && typeof callbacks.destroy == 'function'){
                        callbacks.destroy();
                    }
                });

                self.__layer = null;

            }
        };

        $('body').append(proto);

        // check for special jquery styles
        if (wi && typeof wi == 'object'){
            $('#webtLayer'+id+' .webt-layer').css(wi);
        }

        if (typeof source.jquery != 'undefined'){
            $(source.jquery).appendTo('.webt-layer-inner');
        }

        $('div.webt-layer-bg, span.webt-layer-close').unbind('click').click(function(){
            self.__layer.destroy();
        });

        setTimeout(function(){

            // reposition window
            var cont = $('#webtLayer'+id);
            cont.css('opacity', 0).show(0);

            // bind resize event
            $(window).unbind('resize', resizeLayer).bind('resize', resizeLayer).trigger('resize');

            cont.animate({'opacity' : 1}, 200);

        }, 100);

        return this.__layer;

    }

});