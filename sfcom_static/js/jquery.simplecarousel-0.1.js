;(function($) {

    $.fn.carousel = function(options) {

        var opts = options || {};
        opts.fadeSpeed = opts.fadeSpeed || 500;
        opts.autoAdvance = opts.autoAdvance || true;
        opts.currentSlide = 0;

        var next = function() {
            opts.currentSlide += 1;
            if (opts.currentSlide >= opts.slides.length) {
                opts.currentSlide = 0;
            }
            transition();
        };

        var previous = function() {
            opts.currentSlide -= 1;
            if (opts.currentSlide < 0) {
                opts.currentSlide = opts.slides.length - 1;
            }
            transition();
        };

        var transition = function() {

            var slide = opts.slides[opts.currentSlide];

            var container = $('.carouselContent');
            container.fadeOut(opts.fadeSpeed, function() {

                var title = container.find('h3 a');
                title.attr('href', slide.link);
                title.text(slide.title);

                container.find('.slide-text').html(slide.content);

                var moreLink = container.find('a.specialMore');
                moreLink.attr('href', slide.link);
                moreLink.text(slide.link_text);

                container.fadeIn();

            });

            var img = $('#carouselImage img');
            img.fadeOut(opts.fadeSpeed, function() {
                img.attr('src', slide.graphic);
                img.fadeIn();
            });

        };

        /* preload images */
        for (var i = 0; i < opts.slides.length; i++) {
            var slide = opts.slides[i];
            var img = new Image();
            img.src = slide.graphic;
        }

        return this.each(function() {

            var elem = $(this);
            var userIntervention = false;

            var nextElem = opts.nextElem || elem.find('a.carousel-next');
            nextElem.click(function(ev) {
                next(elem);
                userIntervention = true;
                ev.preventDefault();
            });

            var previousElem = opts.previousElem || elem.find('a.carousel-previous');
            previousElem.click(function(ev) {
                previous(elem);
                userIntervention = true;
                ev.preventDefault();
            });

            if (opts.autoAdvance) {
                var autoAdvance = function() {
                    if (userIntervention) {
                        return;
                    }
                    next(elem);
                    setTimeout(autoAdvance, 10000);
                };
                setTimeout(autoAdvance, 10000);
            }

        });
    };

})(jQuery);
