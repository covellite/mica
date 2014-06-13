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

            $(modal_id)
                .css({
                    "display" : "none"
                });
        }

        return this.each(function () {
            $(this).click(function (e) {

                if ($(this).attr("href").match(/^#.+/)) {
                    var modal_id = $(this).attr("href"),
                        modal_width = $(modal_id).outerWidth();

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

                } else {
                    if ($("#modal").size() == 0) {
                        $('body').append('<div id="modal"></div>');
                    }

                    var modal_id = '#modal';

                    $(modal_id).append('<img src="' + $(this).attr("href") + '" alt="" />');

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

                    $(modal_id)
                        .css({
                            "position": "fixed",
                            "opacity": "0",
                            "z-index": "10000",
                            "top": fo.top + "px",
                            "left": "50%"
                        })
                        .fadeTo(200, 1);

                    e.preventDefault();
                }
            });
        });
    };

}(jQuery));
