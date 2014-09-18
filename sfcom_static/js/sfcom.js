$(document).ready(function() {

	var $signupForm = $('#signup-form');

	$signupForm.submit(function(ev) {

		ev.preventDefault();

		$signupForm.find('button[type=submit]').fadeOut();

		var params = {
			csrfmiddlewaretoken: $signupForm.find('input[name=csrfmiddlewaretoken]').val(),
			email: $signupForm.find('input[name=email]').val(),
			zipcode: $signupForm.find('input[name=zipcode]').val()
		};

		var jqxhr = $.post(
			$signupForm.attr('action'),
			params,
			function(data) {
				$signupForm.fadeOut(400, function() {
					var $thanks = $('.signup-thanks');
					$thanks.find('a').attr('href', data.redirect);
					$thanks.fadeIn().css('display', 'inline-block');
				});
			}
		);
		jqxhr.fail(function(data) {
			window.alert('Email: ' + data.responseText);
			$signupForm.find('button[type=submit]').fadeIn();
		});

	});


	/*
	 * fix old pull quotes
	 */

	$('article .pull_right').each(function(index, elem) {
		var $elem = $(elem);
		$elem
			.after(
				$('<div>')
					.addClass('pullquote')
					.append($('<p>').append($elem.html())))
			.remove();
	});

});

var loadasync = function(id, src) {
	if (window.console && window.console.log) {
		window.console.log('Loading ' + id + ' from ' + src);
	}
	var e, fe = document.getElementsByTagName('script')[0];
	if (document.getElementById(id)) {
		return;
	}
	e = document.createElement('script');
	e.id = id;
	e.src = src;
	e.async = true;
	fe.parentNode.insertBefore(e, fe);
};

var getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
