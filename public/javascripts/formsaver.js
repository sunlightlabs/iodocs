(function(){

var supports_html5_storage = function () {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

FormSaver = function (optmap) {
    if (this.constructor !== FormSaver) {
        return new FormSaver(options);
    }

    var options = optmap || {};
    var default_to = function(k,v){ options[k] = options[k] || v; };
    default_to('form', null);
    default_to('target', null);
    default_to('ignore', ['password', 'pw', 'pass']);

    if (options['form'] == null)
        throw 'FormSaver constructor requires a "form" value.';
    if (options['target'] == null)
        throw 'FormSaver constructor requires a "target" value.';

    var $form = $(options['form']);
    var $target = $(options['target']);
    var storage_key = '__formsaver::' + options['form'];

    var attach_toggle = function () {
        var $container = $('<div id="__formsaver_container"></div>');
        $container.appendTo($target);

        var $toggle = $('<input type="checkbox" name="__formsaver_toggle">');
        $toggle.appendTo($container);

        var $label = $('<label for="__formsaver_toggle">Save fields?</label>');
        $label.appendTo($container);
    };

    var save_fields = function () {
        var fields_to_save = {};

        $('select, textarea, input', $form).each(function(ix, field){
            var $field = $(field);
            var field_name = $field.attr('name');
            if (field_name !== '__formsaver_toggle') {
                if (options['ignore'].indexOf(field_name) === -1) {
                    var value = ($field.attr('type') == 'checkbox') ? $field.is(':checked') : $field.val();
                    fields_to_save[field_name] = value;
                }
            }
        });

        var fields_json = JSON.stringify(fields_to_save);
        localStorage[storage_key] = fields_json;
    };

    var populate_form_fields = function () {
        var stored_fields = {};
        var stored_json = localStorage[storage_key];
        if (stored_json != null) {
            try {
                stored_fields = JSON.parse(stored_json);
            } catch (e) {
                console.log('error decoding', stored_json, e);
            }
        }
        for (var name in stored_fields) {
            if (stored_fields.hasOwnProperty(name)) {
                if (options['ignore'].indexOf(name) === -1) {
                    var field_selector = '*[name="NAME"]'.replace('NAME', name);
                    $(field_selector, $form).val(stored_fields[name]);
                    $('input[name="__formsaver_toggle"]', $form).prop('checked', true);
                }
            }
        }
    };

    var forget = function () {
        localStorage.removeItem(storage_key);
    };

    attach_toggle();
    populate_form_fields(options['form'], $form);

    $form.submit(function(){
        forget();
    });

    $(window).unload(function(){
        var should_save = $('input[name="__formsaver_toggle"]', $form).prop('checked');
        if (should_save === true) {
            save_fields();
        } else {
            forget();
        }
    });

    this.storageKey = function(){ return storage_key; };
    this.forget = function(){ forget(); };
};

})();
