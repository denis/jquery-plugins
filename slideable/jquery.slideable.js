/**
 * @author Denis Barushev <barushev@gmail.com>
 * @since 28.10.2008
 */
(function ($) {
    $.fn.slideable = function (settings) {
        settings = $.extend({
            itemWidth: 100
        }, settings);

        return this.each(
            function () {
                var $this = $(this);

                $this.find('.back').click(
                    function () {
                        $this.find('.window ul').animate({ marginLeft: -107 });
                    }
                );

                $this.find('.forward').click(
                    function () {
                        $this.find('.window ul').animate({ marginLeft: 0 });
                    }
                );
            }
        );
    };
})(jQuery);