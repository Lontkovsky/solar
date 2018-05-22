jQuery(window).load(function ($) {

    jQuery('.fw-testimonials').each(function () {
        
        var id = '#'+(jQuery(this).data('id') ? jQuery(this).data('id') : '');

        jQuery(id).carouFredSel({
            swipe: {
                onTouch: true
            },
            next : id+"-next",
            prev : id+"-prev",
            pagination : id+"-controls",
            responsive: true,
            infinite: false,
            items: 1,
            auto: false,
            scroll: {
                items : 1,
                fx: "crossfade",
                easing: "linear",
                duration: 300
            }
        });

    });

});