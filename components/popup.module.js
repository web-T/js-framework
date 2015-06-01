/**
 * web-T::Framework Popup module
 * @author goshi
 */

webtFramework.inject({

    _popup : [],
    _popup_tout : [],

    /**
     * universal info/error UI popup
     * @param css_class
     * @param text
     * @param parent
     * @param autohide
     * @returns {{hidePopup: hidePopup}}
     */
    popup : function(css_class, text, parent, autohide){

        if (typeof autohide == 'undefined')
            autohide = true;

        var id = this._popup.length;
        this._popup[id] = $('<div class="subPopup" style="display: none"><div id="webtpopup-'+id+'-content" class="content"></div><div class="tb"></div></div>');
        $('body').append(this._popup[id]);

        var self = this;

        var setClass = function(id, css_class){
            if (typeof self._popup[id] != 'undefined' && self._popup[id]){
                self._popup[id].addClass(css_class);
            }
        };

        var setContent = function(id, content){
            if (typeof self._popup[id] != 'undefined' && self._popup[id]){
                self._popup[id].find('.content').html(content);
            }
        };

        setClass(id, css_class);
        setContent(id, text);

        // detect position of the element
        if (typeof parent != 'undefined' && parent){
            var pos = $(parent).offset();
            if (pos){
                this._popup[id].css('left', pos.left);
                this._popup[id].css('top', pos.top + $(parent).outerHeight() + 7);

            }
        }

        this._popup[id].show(100);

        var hidePopup = function(pid, callback){

            if (typeof self._popup[pid] != 'undefined' && self._popup[pid]){
                if (self._popup_tout[pid]){
                    clearTimeout(self._popup_tout[pid]);
                    self._popup_tout[pid] = null;
                }
                self._popup[pid].hide(200, function(){
                    $(self._popup[pid]).remove();
                    self._popup[pid] = null;
                    if (typeof callback == 'function'){
                        callback();
                    }
                });
            }

        };

        if (autohide){
            this._popup_tout[id] = setTimeout(function(){
                hidePopup(id);
            }, 8000);
        }

        return {

            __pid : id,

            getId : function(){
                return this.__pid;
            },

            setClass: function(css_class){
                setClass(this.__pid, css_class);
            },

            setContent: function(content){
                setContent(this.__pid, content);
            },

            destroy : function(callback){

                hidePopup(this.__pid, callback);

            }

        }
    },

});