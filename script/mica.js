;(function ($) {
    'use strict';

    $.fn.mica = function (o) {
        var d = {
            top: '',
            modalMarginW: 50,
            modalMarginH: 30,
            modalBorder: 5,
            overlay: 0.8,
            closeButton: null,
            modalContentsId: '#modal',
            imgWrapId: '#modalInner',
            navigation: true
        },
            fo = $.extend({}, d, o),
            modal_img_id,
            modal_id,
            group,
            classArray,
            ww,
            wh,
            mw,
            mh,
            clickElm,
            displaynum,
            thisClass;

        $("body").append('<div id="overlay"></div>');

        function closeModal(id) {
            $('#overlay')
                .fadeOut(200);

            if (id != fo.modalContentsId) {
                $(id)
                    .css({
                        "display" : "none"
                    });
            } else {
                $(id).remove();
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
                    .bind('click', function () {
                        closeModal(modal_id);
                    });

                $(fo.closeButton)
                    .bind('click', function () {
                        closeModal(modal_id);
                    });

                if ($(this).attr("href").match(/^#.+/)) {
                // ID
                    modal_id = $(this).attr("href");
                    mw = $(modal_id).outerWidth();
                    mh = $(modal_id).outerHeight();
                    wh = $(window).height() - fo.modalMarginH * 2;

                    fo.top = (wh - mh) / 2;

                    $(modal_id)
                        .css({
                            "position": "fixed",
                            "opacity": "0",
                            "z-index": "10000",
                            "top": fo.top + fo.modalMarginH + "px",
                            "left": "50%",
                            "margin-left": -(mw / 2) + "px"
                        })
                        .fadeTo(200, 1);

                    e.preventDefault();

                } else {
                // 画像
                    modal_id = fo.modalContentsId;
                    modal_img_id = fo.imgWrapId;
                    group = $(this).attr('class');

                    if ($(modal_id).size() == 0) {
                        $('body').append('<div id="modal"><div id="modalInner"></div></div>');
                    }

                    $(modal_img_id)
                        .html('<img src="' + $(this).attr("href") + '" alt="" />');

                    classArray = group.split(' ');
                    for (var i in classArray) {
                        if (classArray[i].indexOf('mica-') == 0){
                            thisClass = classArray[i];
                            break;
                        }
                    }

                    displaynum = $('.' + thisClass).index($(this));


                    $(modal_img_id).find('img').bind('load', function () {

                        $(this)
                            .css({
                                "width": 'auto',
                                "height": 'auto'
                            });

                        // 表示サイズ計算
                        mw = $(modal_id).find('img').width();
                        mh = $(modal_id).find('img').height();
                        ww = $(window).width() - (fo.modalMarginW + fo.modalBorder) * 2;
                        wh = $(window).height() - (fo.modalMarginH + fo.modalBorder) * 2;

                        if (ww >= mw && wh >= mh) {
                            mw = mw;
                            mh = mh;
                        } else if (ww < mw) {
                            if (wh >= mh) {
                                mh = Math.floor(ww * mh / mw);
                                mw = ww;
                            } else {
                                if (mw / ww >= mh / wh) {
                                    mh = Math.floor(mh / (mw / ww));
                                    mw = ww;
                                } else {
                                    mw = Math.floor(mw / (mh / wh));
                                    mh = wh;
                                }
                            }
                        } else {
                            mw = Math.floor(wh * mw / mh);
                            mh = wh;
                        }

                        $(this)
                            .css({
                                "width": mw + 'px',
                                "height": mh + 'px'
                            });

                        // モーダルスタイル
                        fo.top = (wh - mh) / 2;

                        $(modal_id)
                            .css({
                                "position": "fixed",
                                "opacity": "0",
                                "z-index": "10000",
                                "top": fo.top + fo.modalMarginH + "px",
                                "left": "50%",
                                "border": fo.modalBorder + "px solid #FFF",
                                "margin-left": -((mw + fo.modalBorder * 2)  / 2) + "px"
                            })
                            .fadeTo(200, 1);


                        // PREV・NEXT
                        if (fo.navigation) {
                            $(fo.modalContentsId).find('#prev').remove();
                            $(fo.modalContentsId).find('#next').remove();
                            $(fo.modalContentsId).append('<div id="prev" class="navigation">prev</div><div id="next" class="navigation">next</div>');

                            $("#prev").css({
                                "top": mh / 2 - $("#prev").height() / 2 + 'px'
                            });
                            $("#next").css({
                                "top": mh / 2 - $("#next").height() / 2 + 'px'
                            });

                            $('#prev')
                                .bind('click', function(){
                                    if (displaynum == 0) {
                                        $(modal_img_id).find('img').attr('src', $('.' + thisClass).eq($('.' + thisClass).length - 1).attr('href'));
                                        displaynum = $('.' + thisClass).length - 1;
                                   } else {
                                        $(modal_img_id).find('img').attr('src', $('.' + thisClass).eq(displaynum - 1).attr('href'));
                                        displaynum = displaynum - 1;
                                   }
                                })

                            $('#next')
                                .bind('click', function(){
                                    if (displaynum == $('.' + thisClass).length - 1) {
                                        $(modal_img_id).find('img').attr('src', $('.' + thisClass).eq(0).attr('href'));
                                        displaynum = 0;
                                    } else {
                                        $(modal_img_id).find('img').attr('src', $('.' + thisClass).eq(displaynum + 1).attr('href'));
                                        displaynum = displaynum + 1;
                                    }
                                })
                        }


                    });


                    e.preventDefault();

                }

            });
        });
    };

}(jQuery));
