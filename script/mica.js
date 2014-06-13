(function ($) {
    'use strict';

    $.fn.mica = function (o) {
        var d = {
            top: 100,
            overlay: 0.7,
            closeButton: null
        },
            fo = $.extend({}, d, o);

        $("body").append('<div id="overlay"></div>');

        function close_modal(modal_id) {
            $('#overlay')
                .fadeOut(200);

            if (modal_id != '#modal') {
                $(modal_id)
                    .css({
                        "display" : "none"
                    });
            } else {
                $(modal_id).remove();
            }
        }

        return this.each(function () {
            $(this).click(function (e) {

                $('#overlay')
                    .css({
                        "display": "block",
                        "opacity": "0"
                    })
                    .fadeTo(200, fo.overlay)
                    .click(function () {
                        close_modal(modal_id);
                    });

                $(fo.closeButton)
                    .click(function () {
                        close_modal(modal_id);
                    });

                // ID
                if ($(this).attr("href").match(/^#.+/)) {
                    var modal_id = $(this).attr("href"),
                        modal_width = $(modal_id).outerWidth();

                    $(modal_id)
                        .css({
                            "display": "block",
                            "position": "fixed",
                            "opacity": "0",
                            "z-index": "10000",
                            "top": fo.top + "px",
                            "left": "50%",
                            "margin-left": -(modal_width / 2) + "px"
                        })
                        .fadeTo(200, 1);

                    e.preventDefault();

                    // 画像
                } else {

                    if ($("#modal").size() == 0) {
                        $('body').append('<div id="modal"></div>');
                    }

                    var modal_id = '#modal';
                    $(modal_id)
                        .html('')
                        .html('<img src="' + $(this).attr("href") + '" alt="" />');

                    $(modal_id).find('img').bind('load', function(){

                        var mw = $(modal_id).find('img').width();

                        $(modal_id)
                            .css({
                                "position": "fixed",
                                "opacity": "0",
                                "z-index": "10000",
                                "top": fo.top + "px",
                                "left": "50%",
                                "margin-left": -(mw / 2) + "px"
                            })
                            .fadeTo(200, 1);

                    });
                    e.preventDefault();

                }

            });
        });
    };

}(jQuery));
