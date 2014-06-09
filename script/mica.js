(function ($) {
    'use strict';

    $.fn.mica = function (o) {
        var d = {
            top: 100,
            overlay: 0.5
        },
            fo = $.extend({}, d, o);

        $("body").append('<div id="overlay"></div>');

        function close_modal(modal_id) {
            $('#overlay').fadeOut(200);
            $(modal_id).css({
                "display" : "none"
            });
        }

        return this.each(function () {
            $(this).click(function (e) {
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
            });
        });
    };

}(jQuery));
