/**
 * web-T::Framework Ajax module
 * @author goshi
 */

webtFramework.inject({ajax : {

    /**
     * make ajax call to backend
     * @param result
     * @param onSuccess
     */
    call : function(result, onSuccess){
        $.ajax({
            url : '/ajax/',
            method : 'POST',
            dataType: 'json',
            data : {
                url : result['url'] ? result['url'] : result['id']
            },
            success : onSuccess

        });
    },

    /**
     * connect events to the forms on the page with flags
     * @param container any jquery selector with forms inside
     * @param params additional parameters, like {beforeSubmit : function, afterSubmit: function, onSuccess: function, 'useLoader' : true|false},
     */
    bindForms : function(container, params){

        var forms = $(container).find('form');

        if (forms && forms.length){

            params = $.extend({
                beforeSubmit : null,
                afterSubmit : null,
                onSuccess : null,
                useLoader : false
            }, params);

            var _always_submit = {};

            forms.each(function(){
                // check for always binded
                if (typeof $(this).data('binded') == 'undefined'){

                    _always_submit[$(this).attr('action')] = false;

                    if (typeof $(this).data('action') == 'undefined' && $(this).attr('action'))
                        $(this).data('action', $(this).attr('action'));

                    $(this).attr('action', '#');

                    var self = this;

                    $(this).unbind('submit').on('submit', function(e){
                        e.preventDefault();

                        //console.log('always_submit: ', _always_submit);

                        if (_always_submit[$(this).attr('action')]){

                            return false;

                        } else {

                            var res = true;

                            if (typeof params.beforeSubmit == 'function'){
                                params.beforeSubmit(this);
                            }

                            // checking for exists validate property
                            if (typeof $(this).data('validate') != 'undefined'){
                                res = eval($(this).data('validate')+'(this)');
                                //console.log('return value after validate: ', res);
                            }

                            if (!res){
                                return false;
                            }

                            if ($(this).data('action')){

                                var loader = null;
                                if (params.useLoader){
                                    loader = webtFramework.loader(this);
                                } else if (typeof $(this).data('useloader') != 'undefined' && parseInt($(this).data('useloader')) == 1){
                                    loader = webtFramework.loader(this);
                                }

                                _always_submit[$(this).data('action')] = true;

                                // because we have jquery bug with submitted button - give it handmaded
                                var btn = $(this).find("input[type=submit]:focus");
                                if (btn){
                                    // add button name dynamicaly
                                    $('<input/>').attr('type', 'hidden').attr('name', $(btn).attr('name')).val('1').appendTo(this);
                                }

                                $.ajax({
                                    url : '/ajax/',
                                    method : 'POST',
                                    dataType: 'json',
                                    data : {
                                        url : $(this).data('action'),
                                        method : 'post',
                                        data : $(this).serialize(),
                                        target : typeof $(this).data('target') != 'undefined' ? $(this).data('target'): null
                                    },
                                    success : function(data){
                                        _always_submit[$(self).data('action')] = false;

                                        if (loader)
                                            loader.destroy();

                                        if (typeof params.onSuccess == 'function'){
                                            params.onSuccess(data);
                                        }

                                        // checking for native form callback
                                        if (typeof $(self).data('onSuccess') != 'undefined' && typeof window[$(self).data('onSuccess')] == 'function'){
                                            window[$(self).data('onSuccess')](data);
                                        }
                                    }
                                });

                                if (typeof params.afterSubmit == 'function'){
                                    params.afterSubmit(this);
                                }


                            }

                        }

                        return false;
                    });

                    $(this).data('binded', 1);
                }
            });

        }
    }

}});