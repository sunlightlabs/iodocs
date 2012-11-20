(function(){
    $(document).ready(function(){
        var formsaver = new FormSaver({form: 'form#credentials', target: 'section.credentials'});

        if (window.location.hash) {
            var target = window.location.hash.substr(1).split('.'),
                endpoint = null,
                method = null;

            if (target.length >= 1) {
                endpoint = target.shift();
                var sel = 'li.endpoint > h3.title span.name:contains("TEXT")'.replace("TEXT", endpoint);
                $(sel).trigger('click');

                if (target.length >= 1) {
                    method = target.shift();
                    sel = 'li.method > div.title:contains("TEXT")'.replace("TEXT", method);
                    $(sel).trigger('click');
                }
            }
        }
    });
})();
