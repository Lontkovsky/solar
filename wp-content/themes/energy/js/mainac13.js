(function($){
    "use strict";

    var $allVideos = jQuery(".entry-content iframe, .video-wrapper iframe, .post__media_wide .container iframe, .post__media iframe, .post__media object, .post__media embed");

    function energy_get_all_videos() {
        $allVideos.each(function () {
            jQuery(this).attr('data-aspectratio', this.height / this.width).removeAttr('height').removeAttr('width');
        });
    }

    function energy_resize_all_videos() {
        $allVideos.each(function () {
            var $el = jQuery(this);
            var newWidth = jQuery(this).parent().width();
            $el.width(newWidth).height((newWidth * $el.attr('data-aspectratio')).toFixed());
        });
    }

    jQuery(document).ready(function($) {

        // Preloader
        $('#status').fadeOut();
        $('#preloader').delay(100).fadeOut(100);

        // Fit video frames to document width
        energy_get_all_videos();
        energy_resize_all_videos();

        /*** Navigation in responsive layouts
         --------------------------------------------------- ****/
        var $menu = $('.main-nav > ul').first(),
            optionsList = '<option value="" selected> - - Main Navigation - - </option>';

        if( $menu.length ) {
            $menu.find('li').each(function () {
                var $this = $(this),
                    $anchor = $this.children('a'),
                    depth = $this.parents('ul').length - 1,
                    indent = '';

                if (depth) {
                    while (depth > 0) {
                        indent += ' &nbsp; ';
                        depth--;
                    }
                }

                optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
            }).end().parent().parent().parent().parent().parent().find('.nav-button').append('<select class="mobile-menu">' + optionsList + '</select><div class="mobile-menu-title"><i class="fa fa-bars"></i></div>');
        } else {
            $('.nav-button').append("Please create menu");
        }

        $('.mobile-menu').on('change', function () {
            window.location = $(this).val();
        });

        // PrettyPhoto
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'dark_square',
            social_tools: false
        });

        // Sticky Top Menu
        if ($().sticky) {
            if ($('body').hasClass('admin-bar')) {
                $('.header-sticky').sticky({topSpacing: 32});
                //sticky-update
                $('.header-sticky').on('sticky-start', function () {
                    $('.header-sticky-height').css('height', $('.header-sticky').outerHeight());
                });
                $('.header-sticky').on('sticky-end', function () {
                    $('.header-sticky-height').css('height', 'auto');
                });
            } else {
                $('.header-sticky').sticky({topSpacing: 0});
                //sticky-update
                $('.header-sticky').on('sticky-start', function () {
                    $('.header-sticky-height').css('height', $('.header-sticky').outerHeight());
                });
                $('.header-sticky').on('sticky-end', function () {
                    $('.header-sticky-height').css('height', 'auto');
                });
            }
        }

        // Menu search
        $('.header-button__search').on('click', function () {
            $('body').toggleClass('search-box--opened');
            $('.search-box__icon').toggleClass('active');
            $('#search-box__input').toggleClass('fadein');
        });
        $('.body-overlay').on('click', function () {
            $('body').removeClass('search-box--opened');
            $('.search-box__icon').removeClass('active');
            $('#search-box__input').removeClass('fadein');
        });
        $('.search-box__close').on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('search-box--opened');
            $('.search-box__icon').toggleClass('active');
            $('#search-box__input').toggleClass('fadein');
        });

        // Submit Comment form
        $('a.comment-submit').click(function (event) {
            event.preventDefault();
            $(this).closest('form').submit();
        });

        // Scroll totop button
        var toTop = $('#to-top');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                toTop.css({bottom: '0'});
            } else {
                toTop.css({bottom: '-100px'});
            }
        });
        toTop.click(function () {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });

        // Post controls
        $('.pctrl-social-btn').click(function () {
            $('.post-controls').toggleClass('active');
        });

        // Unyson Sliders
        if ($().nivoSlider) {
            $('.nivoSlider').each(function () {
                var slider = $(this);
                var autoplay = slider.data('autoplay') ? slider.data('autoplay') : false;
                slider.nivoSlider({
                    effect: 'random',
                    manualAdvance: autoplay,
                });
            });
        }

        // Bootstrap select
        if ($().selectpicker) {

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
                $('.widget select').selectpicker('mobile');
                $('.orderby').selectpicker('mobile');
                $('#pa_color').selectpicker('mobile');
                $('.mptt-navigation-select').selectpicker('mobile');
                $('.field-select select').selectpicker('mobile');
            }
            else {
                $('.widget select').selectpicker({
                    dropupAuto: true,
                    container: 'body',
                    width: '100%',
                    size: 8
                });
                $('.orderby').selectpicker({
                    dropupAuto: true,
                    container: 'body',
                    width: '100%',
                    size: 8
                });
                $('#pa_color').selectpicker({
                    dropupAuto: true,
                    container: 'body',
                    width: '100%',
                    size: 8
                });
                $('.mptt-navigation-select').selectpicker({
                    dropupAuto: true,
                    container: 'body',
                    width: '100%',
                    size: 8
                });
                $('.field-select select').selectpicker({
                    dropupAuto: true,
                    container: 'body',
                    width: '100%',
                    size: 8
                });
            }

        }

        // Date Time Picker
        jQuery('[id ^= id-date]').each(function(){
            var datePicker = jQuery(this);
            datePicker.datetimepicker({
                pickDate: datePicker.data('pick-date'),
                pickTime: datePicker.data('pick-time'),
                useSeconds: false,
                language: datePicker.data('language'),
                debug: false,
            });
        });

        //hidding menu elements that do not fit in menu width
        window.menuHideExtraElements = function() {
            var wrapperWidth = jQuery('.main-nav > ul').width();
            var summaryWidth = 25;
            var $liElements = jQuery('.main-nav > ul > li');
            $liElements.each(function(index) {
                summaryWidth += jQuery(this).outerWidth(true);
                if(summaryWidth > wrapperWidth) {
                    $liElements.removeClass('md-hidden');
                    var $newLi = jQuery('<li id="more-li"><a><i class="fa fa-ellipsis-h"></i></a><ul class="sub-menu"></ul></li>');
                    jQuery($liElements[index]).before($newLi);
                    var $extraLiElements = $liElements.filter(':gt('+(index-1)+')');
                    $extraLiElements.clone().appendTo($newLi.find('ul'));
                    $extraLiElements.addClass('md-hidden');
                    return false;
                }
            });
        }
        menuHideExtraElements();

        // better variant:  temp solution (light version)
        // call resize handler to build menu right
        $(window).resize(function() {
	        jQuery('.main-nav > ul > li').removeClass('md-hidden');
            $('#more-li').remove();
            menuHideExtraElements();
        });

    });

    jQuery(window).load(function () {

        // Disable Empty Links (pre-prepared blank links)
        $("[href='#0']").click(function(event){
            event.preventDefault();
        });

        // Sticky Sidebar
        var stickyParentRow = $(".post-container > .row > .col-sm-8"),
            stickySidebar = $(".sidebar-sticky");

        function detachSidebar() {
            if( 768 > $(window).width() ) {
                stickySidebar.trigger("sticky_kit:detach");
            }
        }

        if( stickyParentRow.length ) {
            stickySidebar.stick_in_parent({
                offset_top: 0,
                parent: ".content-area",
                spacer: false
            }).on("sticky_kit:bottom", function () {
                $(this).parent().css("position", "static")
            }).on("sticky_kit:unbottom", function () {
                $(this).parent().css("position", "relative")
            });
            detachSidebar();
        }

        //Placeholder cleaning
        var $ph = $('input[type="search"], input[type="text"], input[type="url"], input[type="number"], input[type="email"], textarea');
        $ph.each(function() {
            var value = $(this).val();
            $(this).focus(function() {
                if ($(this).val() === value) {
                    $(this).val('');
                }
            });
            $(this).blur(function() {
                if ($(this).val() === '') {
                    $(this).val(value);
                }
            });
        });

        $('.owl-gallery').owlCarousel({
            rtl:true,
            margin:0,
            items:1,
            loop:true,
            nav:true,
            autoHeight : true,
            navText: [
                "<i class='fa fa-caret-left'></i>", // icon-left-open-big
                "<i class='fa fa-caret-right'></i>" // icon-right-open-big
            ],
            responsiveClass:true,
            responsiveBaseElement:".footer",
            responsive:{
                0:{
                    dots:false
                },
                955:{
                    dots:true
                }
            }
        });

        // correct class for 'Breadcrumbs' wrapper when Post Title has more then one line
        if ( $('body.single-post .entry-header-wrapper .page-title').height() > 60 ) {
            $('body.single-post .entry-header-wrapper header.entry-header .js-br-wrapper').addClass('long-title');
        }
        /* displaying is enabled with js, for more smooth appearance */
        $('body.single-post .entry-header-wrapper .breadcrumbs').css('display', 'block');
    });

    jQuery(window).resize(function($) {

        // Fit video frames to document width
        energy_resize_all_videos();

    });

    // hide placeholders on focus
    $(function () {
        $('input,textarea').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    });

})(jQuery);

/**
 * Unyson Mega Menu
 */
jQuery(function ($) {

    function hoverIn() {
        var a = $(this);
        var nav = a.closest('.menu');
        var mega = a.find('.mega-menu');
        var offset = rightSide(nav) - leftSide(a);
        mega.width(Math.min(rightSide(nav), columns(mega)*325));
        mega.css('left', Math.min(0, offset - mega.width()));
    }

    function hoverOut() {}

    function columns(mega) {
        var columns = 0;
        mega.children('.mega-menu-row').each(function () {
            columns = Math.max(columns, $(this).children('.mega-menu-col').length);
        });
        return columns;
    }

    function leftSide(elem) {
        return elem.offset().left - 15;
    }

    function rightSide(elem) {
        return elem.offset().left + elem.width();
    }

    $('.menu-strip .menu-item-has-mega-menu').hover(hoverIn, hoverOut);

});