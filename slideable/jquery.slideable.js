/**
 * Slideable plugin for jQuery
 *
 * http://github.com/denis/jquery-plugins
 *
 * @author Denis Barushev <barushev@gmail.com>
 * @since 28.10.2008
 */
(function ($) {
    $.fn.slideable = function (settings) {
        settings = $.extend({
            debug: false,
            vertical: false,
            stepSize: false
        }, settings);

        function debug() {
            if (settings.debug) {
                console.log.apply(this, arguments);
            }
        }

        return this.each(
            function () {
                var $this = $(this);

                // Set size of the step
                if (!settings.stepSize) {
                    if (settings.vertical) {
                        settings.stepSize = $this.find('li').height();
                    } else {
                        settings.stepSize = $this.find('li').width();
                    }
                }

                debug('Step size: ', settings.stepSize);

                function slide() {
                    if (settings.vertical) {
                        elWindowUl.animate({ marginTop: ulOffset });
                    } else {
                        elWindowUl.animate({ marginLeft: ulOffset });
                    }

                    checkBackForward();
                    debug('Ul offset: ', ulOffset);
                }

                function slideBack() {
                    if (!elBack.hasClass('disabled')) {
                        ulOffset += settings.stepSize;
                        slide();
                    }
                }

                function slideForward() {
                    if (!elForward.hasClass('disabled')) {
                        ulOffset -= settings.stepSize;
                        slide();
                    }
                }

                function checkBackForward() {
                    if (ulOffset == 0) {
                        elBack.addClass('disabled back_disabled');
                    } else {
                        elBack.removeClass('disabled back_disabled');
                    }

                    if (settings.vertical) {
                        var canSlideForward = (ulOffset - elWindow.height() + elWindowUl.height()) > settings.stepSize;
                    } else {
                        var canSlideForward = (ulOffset - elWindow.width() + elWindowUl.width()) > settings.stepSize;
                    }

                    if (canSlideForward) {
                        elForward.removeClass('disabled forward_disabled');
                    } else {
                        elForward.addClass('disabled forward_disabled');
                    }
                }

                var elWindow   = $this.find('.window');
                var elWindowUl = $this.find('.window ul');

                var elBack    = $this.find('.back');
                var elForward = $this.find('.forward');

                if (settings.vertical) {
                    var ulOffset = parseInt(elWindowUl.css('margin-top'));
                } else {
                    var ulOffset = parseInt(elWindowUl.css('margin-left'));
                }

                // Handle click on .back
                elBack.bind('click', slideBack);

                // Handle click on .forward
                elForward.bind('click', slideForward);

                checkBackForward();
            }
        );
    };
})(jQuery);
