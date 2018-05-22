// owl carousel - Recent Projects carousel

if (jQuery().owlCarousel) {
    jQuery('.owl-carousel').each(function () {

        var $carousel = jQuery(this);
        var show_navigation = $carousel.data('show_navigation') ? $carousel.data('show_navigation') : false;
        var show_dots = $carousel.data('show_dots') ? $carousel.data('show_dots') : false;
        var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay') : false;
        var unique_id = $carousel.data('unique_id') ? $carousel.data('unique_id') : '';
        var slider_class = '.owl-recent-projects-carousel',
            unique_slider_class = slider_class + unique_id;

        if (!unique_id.length) {
            unique_id = '';
        }

        var loop = true;
        if (jQuery(unique_slider_class).children().length == 1) {
            loop = false;
            autoplay = false;
        }

        var rtl = false;
        if (jQuery('body').hasClass('rtl')) {
            rtl = true;
        }

        jQuery(unique_slider_class).owlCarousel({
            rtl: rtl,
            mouseDrag: true,
            dots: show_dots,
            loop: loop,
            margin: 10,
            autoplay: autoplay,
            nav: show_navigation,
            navText: [
                "<span class='rpj-carousel__icon flaticon-arrows-1'></span> Prev",
                "Next <span class='rpj-carousel__icon flaticon-arrows'></span>"
            ],
            responsiveClass: true,
            responsiveBaseElement: unique_slider_class,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                630: {
                    items: 3
                },
                740: {
                    items: 4
                },
                970: {
                    items: 5
                },
                1170: {
                    items: 8
                }
            }
        });

    });
}