$(document).ready(function() {

	var $signupForm = $('#signup-form');

	$signupForm.submit(function(ev) {

		ev.preventDefault();

		var params = {
			csrfmiddlewaretoken: $signupForm.find('input[name=csrfmiddlewaretoken]').val(),
			email: $signupForm.find('input[name=email]').val(),
			zipcode: $signupForm.find('input[name=zipcode]').val(),
			response: 'json'
		};

		$.post(
			$signupForm.attr('action'),
			params,
			function() {
				$signupForm.fadeOut(400, function() {
					$('.signup-thanks').fadeIn().css('display', 'inline-block');
				});

			}
		);

		$signupForm.find('button[type=submit]').fadeOut();

	});

	/* carousel */
	$('.carousel').carousel({
		autoAdvance: true,
		nextElem: $('a.carousel-next'),
		previousElem: $('a.carousel-previous')
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
	if (console && console.log) {
		console.log('Loading ' + id + ' from ' + src);
	}
	var e, fe = document.getElementsByTagName('script')[0];
	if (document.getElementById(id)) return;
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
