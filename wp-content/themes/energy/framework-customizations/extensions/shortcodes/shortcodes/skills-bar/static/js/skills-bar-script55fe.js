// Skills Progress Bar

jQuery(function () {

    jQuery('.progress-bar').each(function () {

        var progress_bar = jQuery(this);
        var unique_id = progress_bar.attr('data-unique-id') ? progress_bar.attr('data-unique-id') : '';
        var progress_bar_class = '.progress-bar';
        var progress_bar_unique = progress_bar_class + unique_id;
        var progress_bar_level = progress_bar.attr('data-level') ? progress_bar.attr('data-level') : '';
        var progress_bar_width = progress_bar_level + '%';

        if (!unique_id.length) {
            unique_id = '';
        }

        jQuery(progress_bar_unique).animate({width: progress_bar_width}, 2000);

    });

});