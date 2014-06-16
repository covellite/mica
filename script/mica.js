;(function ($) {
    'use strict';

    $.fn.mica = function (o) {
        var d = {
            top: '',
            modalMarginW: 50,  // モーダル左右マージン
            modalMarginH: 30,  // モーダル上下マージン
            modalBorder: 5,    // モーダルボーダー
            overlay: 0.8,      // 透過率
            closeButton: null,　// 閉じるボタン要素
            modalWrapID: '#modal',      // モーダル囲みID
            imgWrapID: '#modalInner',   // モーダル内画像配置要素ID
            prevID: '#prev',            // PREVボタンID
            nextID: '#next',            // NEXTボタンID
            navigationClass: '.navigation',  // ナビゲーションclass
            overlayID: '#overlay',      // オーバーレイID
            navigation: true,           // ナビゲーションの有無
            groupPrefix: 'mica-'        // グループclass用接頭辞
        },
            fo = $.extend({}, d, o),
            groupClass,
            groupClassArray,
            displayNum,
            ww,
            wh,
            mw,
            mh;

        $('body').append('<div id="' + fo.overlayID.replace('#', '') + '"></div>');

        function closeModal(id) {
            $(fo.overlayID)
                .fadeOut(200);

            if (id != fo.modalWrapID) {
                $(id).hide();
            } else {
                $(id).remove();
            }
        }

        return this.each(function () {

            $(this).click(function (e) {

                if ($(this).attr('href').match(/^#.+/)) {
                // ID
                    fo.imgWrapID = $(this).attr('href');
                    mw = $(fo.imgWrapID).outerWidth();
                    mh = $(fo.imgWrapID).outerHeight();
                    wh = $(window).height() - fo.modalMarginH * 2;

                    fo.top = (wh - mh) / 2;

                    $(fo.imgWrapID)
                        .css({
                            'position': 'fixed',
                            'opacity': '0',
                            'z-index': '10000',
                            'top': fo.top + fo.modalMarginH + 'px',
                            'left': '50%',
                            'margin-left': -(mw / 2) + 'px'
                        })
                        .fadeTo(200, 1);

                    e.preventDefault();

                } else {
                // 画像

                    if ($(fo.modalWrapID).size() == 0) {
                        $('body').append('<div id="' + fo.modalWrapID.replace('#', '') + '"><div id="' + fo.imgWrapID.replace('#', '') + '"></div></div>');
                    }

                    $(fo.imgWrapID)
                        .html('<img src="' + $(this).attr('href') + '" alt="" />');

                    groupClassArray = $(this).attr('class').split(' ');

                    for (var i in groupClassArray) {
                        if (groupClassArray[i].indexOf(fo.groupPrefix) == 0) {
                            groupClass = groupClassArray[i];
                            break;
                        }
                    }

                    displayNum = $('.' + groupClass).index($(this));

                    $(fo.modalWrapID).find('img').bind('load', function () {

                        $(this)
                            .css({
                                'width': 'auto',
                                'height': 'auto'
                            });

                        // 表示サイズ計算
                        mw = $(fo.imgWrapID).find('img').width();
                        mh = $(fo.imgWrapID).find('img').height();
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
                                'width': mw + 'px',
                                'height': mh + 'px'
                            });

                        // モーダルスタイル
                        fo.top = (wh - mh) / 2;

                        $(fo.modalWrapID)
                            .css({
                                'position': 'fixed',
                                'opacity': '0',
                                'z-index': '10000',
                                'top': fo.top + fo.modalMarginH + 'px',
                                'left': '50%',
                                'border': fo.modalBorder + 'px solid #FFF',
                                'margin-left': -((mw + fo.modalBorder * 2)  / 2) + 'px'
                            })
                            .fadeTo(200, 1);


                        // PREV・NEXT
                        if (fo.navigation) {
                            $(fo.modalWrapID).find(fo.prevID).remove();
                            $(fo.modalWrapID).find(fo.nextID).remove();
                            $(fo.modalWrapID).append('<div id="' + fo.prevID.replace('#', '') + '" class="' + fo.navigationClass.replace('.', '') + '">prev</div><div id="' + fo.nextID.replace('#', '') + '" class="' + fo.navigationClass.replace('.', '') + '">next</div>');

                            $(fo.prevID).css({
                                'top': mh / 2 - $(fo.prevID).height() / 2 + 'px'
                            });
                            $(fo.nextID).css({
                                'top': mh / 2 - $(fo.nextID).height() / 2 + 'px'
                            });

                            $(fo.prevID)
                                .bind('click', function(){
                                    if (displayNum == 0) {
                                        $(fo.modalWrapID).find('img').attr('src', $('.' + groupClass).eq($('.' + groupClass).length - 1).attr('href'));
                                        displayNum = $('.' + groupClass).length - 1;
                                   } else {
                                        $(fo.modalWrapID).find('img').attr('src', $('.' + groupClass).eq(displayNum - 1).attr('href'));
                                        displayNum = displayNum - 1;
                                   }
                                })

                            $(fo.nextID)
                                .bind('click', function(){
                                    if (displayNum == $('.' + groupClass).length - 1) {
                                        $(fo.modalWrapID).find('img').attr('src', $('.' + groupClass).eq(0).attr('href'));
                                        displayNum = 0;
                                    } else {
                                        $(fo.modalWrapID).find('img').attr('src', $('.' + groupClass).eq(displayNum + 1).attr('href'));
                                        displayNum = displayNum + 1;
                                    }
                                })
                        }


                    });

                    e.preventDefault();

                }

                $(fo.overlayID)
                    .css({
                        'display': 'block',
                        'opacity': '0'
                    })
                    .fadeTo(200, fo.overlay)
                    .bind('click', function () {
                        closeModal(fo.modalWrapID);
                    });

                $(fo.closeButton)
                    .bind('click', function () {
                        closeModal(fo.modalWrapID);
                    });

            });
        });
    };

}(jQuery));
