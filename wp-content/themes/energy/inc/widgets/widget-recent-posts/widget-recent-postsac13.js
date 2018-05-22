// Preload Images Function

jQuery.preloadImages = function () {
    for (var i = 0; i < arguments.length; i++) {
        jQuery("<img />").attr("src", arguments[i]);
    }
};

// Activate Bootstrap Accordion / Collapse

jQuery('.panel-group').each(function () {

    var accordion = jQuery(this);
    var unique_id = accordion.data('unique_id') ? accordion.data('unique_id') : '';
    var image_inner = '#recent-posts__img_col_inner-' + unique_id;
    var accordion_id = '#accordion-' + unique_id;
    var accordion_link = accordion_id + ' .recent-posts__title';

    if (!unique_id.length) {
        unique_id = '';
    }

    jQuery(accordion_id).on('hidden.bs.collapse', function () {
        // do something…
    });

    jQuery(accordion_link).on('click', function (e) {

        if (jQuery(this).parents('.panel').children('.panel-collapse').hasClass('in')) {

            //e.stopPropagation(); // dont close if opened
            e.preventDefault(); // remove the page jump

        } else {

            var getPostData = jQuery(this);
            var postTitle = getPostData.data('post-title') ? getPostData.data('post-title') : '';
            var postLink = getPostData.data('post-link') ? getPostData.data('post-link') : '';

            var postImage = getPostData.data('post-image') ? getPostData.data('post-image') : '';
            var postDay = getPostData.data('post-day') ? getPostData.data('post-day') : '';
            var postMonth = getPostData.data('post-month') ? getPostData.data('post-month') : '';
            var postCommNumber = getPostData.data('post-comm-number') ? getPostData.data('post-comm-number') : '0';
            var postCommLink = getPostData.data('post-comm-link') ? getPostData.data('post-comm-link') : '#';
            var postLikes = getPostData.data('post-likes') ? getPostData.data('post-likes') : '0';
            var postViews = getPostData.data('post-views') ? getPostData.data('post-views') : '0';

            //jQuery(image_inner).css('background-image', 'url(' + postImage + ')');
            jQuery(image_inner + ' .recent-posts__date').removeClass('animated flipInY');
            jQuery(image_inner + ' .recent-posts__img_meta_bottom').removeClass('animated fadeInUp');
            jQuery(image_inner + ' .recent-posts__img_bg').stop().animate({opacity: 0}, 200, function () {
                // Post image
                jQuery(this).css({'background-image': 'url(' + postImage + ')'})
                    .animate({opacity: 1}, {duration: 200});
                // Post Meta
                jQuery(image_inner + ' .recent-posts__title').text(postTitle);
                jQuery(image_inner + ' .recent-posts__title').attr('href', postLink);
                jQuery(image_inner + ' .recent-posts__date').addClass('animated flipInY');
                jQuery(image_inner + ' .recent-posts__img_meta_bottom').addClass('animated fadeInUp');
                jQuery(image_inner + ' .recent-posts__date_day').text(postDay);
                jQuery(image_inner + ' .recent-posts__date_month').text(postMonth);
                jQuery(image_inner + ' .recent-posts__likes_text').text(postLikes);
                jQuery(image_inner + ' .recent-posts__views_text').text(postViews);
                jQuery(image_inner + ' .recent-posts__comments').attr('href', postCommLink);
                jQuery(image_inner + ' .recent-posts__comments_text').text(postCommNumber);

            });

        }

    });

    // Preload Images

    jQuery('.recent-posts__title').each(function () {
        var getPostData = jQuery(this);
        var postImage = getPostData.data('post-image') ? getPostData.data('post-image') : '';
        jQuery.preloadImages(postImage);
    });

});