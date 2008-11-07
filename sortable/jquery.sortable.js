/**
 * @author Denis Barushev <barushev@gmail.com>
 * @since 08.10.2008
 */
(function ($) {
    $.fn.sortable = function (settings) {
        settings = $.extend({
            debug: false
        }, settings);

        /**
         * Apply main action for each finded element
         */
        return this.each(
            function () {
                var $this = $(this);

                // Attach sorting to click on td that has 'sort' class in table head
                $this.find('thead td.sort').click(
                    function () {
                        // Index of the sortable column
                        var index = $this.find("thead td").index(this);

                        var sortableData = [];

                        // Extract sortable data and references to rows
                        $this.find("tbody tr").each(
                            function () {
                                sortableData[sortableData.length] = [$(this).find("td").eq(index).text(), this];
                            }
                        );

                        sortableData.sort();

                        $this.find("thead td").not(this).removeClass('asc desc');

                        if ($(this).hasClass('desc')) {
                            $(this).removeClass('desc').addClass('asc');
                            sortableData.reverse();
                        } else {
                            $(this).removeClass('asc').addClass('desc');
                        }

                        // Append sorted rows to table body
                        $.each(sortableData, function () {
                            $this.find("tbody").append(this[1]);
                        });
                    }
                );
            }
        );
    };
})(jQuery);
