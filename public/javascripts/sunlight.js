(function(){
    $(document).ready(function(){
        var formsaver = new FormSaver({form: 'form#credentials', target: 'section.credentials', 'ignore': ['password', 'pw', 'pass', 'apiName']});

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

        if (window.history) {
/*            $('li.method > div.title').click(function(){
                var endpoint = $(this).parents('li.endpoint').find('span.name').first().text();
                var method_name = $('span.name', this).text();
                var new_state = [endpoint, method_name];
                var new_hash = '#' + new_state.join('.');
                var new_title = new_state.join(': ');
                var new_url = window.location.href.replace(/#.*$/, '') + new_hash;
                history.pushState(new_state, new_title, new_url);
                console.log(new_state, new_title, new_url);
            });

            window.addEventListener("popstate", function(event){
//                $('.expanded').removeClass('expanded');
		//this is getting called on page load, negating the default open endpoint state
                if (event.state) {
                    var endpoint = null,
                        method_name = null;
                    if (event.state.length > 0)
                        endpoint = event.state[0];
                    if (event.state.length > 1)
                        method_name = event.state[1];

                    console.log('Restoring state for', endpoint, method_name);
                    if (endpoint) {
                        var sel_tmpl = 'li.endpoint > h3.title span.name[text="ENDPOINT"]';
                        var endpoint_sel = sel_tmpl.replace('ENDPOINT', endpoint);
                        $(endpoint_sel).trigger('click');
                    }

                    if (method_name) {
                        var sel_tmpl = 'li.method > div.title[text="METHOD"]';
                        var method_sel = sel_tmpl.replace('METHOD', method_name);
                        $(method_sel).trigger('click');
                        console.log(method_sel, $(method_sel).toArray());
                        $(method_sel)[0].scrollIntoView(true);
                    }
                }
            });*/
        }
    });
})();
