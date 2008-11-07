/**
 * @author Denis Barushev <barushev@gmail.com>
 * @since 25.09.2008
 */
(function ($) {
    $.fn.ajaxable = function (settings) {
        settings = $.extend({
            success: function (html) {},
            error: function (error) {}
        }, settings);

        return this.each(
            function () {
                var $this = $(this);

                $this.submit(
                    function () {
                        $.post(
                            $this.attr('action'),
                            $this.serializeArray(),
                            function (result) {
                                // Remove all errors
                                $('.error', $this).removeClass('error');

                                if (result.errors) {
                                    for (i in result.errors) {
                                        settings.error(result.errors[i]);
                                    }
                                } else {
                                    settings.success(result);
                                    $this[0].reset();
                                }
                            },
                            'json'
                        );
                        return false;
                    }
                );
            }
        );
    };
})(jQuery);
