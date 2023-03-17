/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$dimension = $('#dimension'),
		$dimfooter = $('#dimfooter'),
		$main = $('#main'),
		$main_dimarticles = $main.children('dimarticle');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// nava.
		var $nava = $dimension.children('nava'),
			$nava_li = $nava.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nava_li.length % 2 == 0) {

				$nava.addClass('use-middle');
				$nava_li.eq( ($nava_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $dimarticle = $main_dimarticles.filter('#' + id);

				// No such dimarticle? Bail.
					if ($dimarticle.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-dimarticle-visible');

							// Deactivate all dimarticles (just in case one's already active).
								$main_dimarticles.removeClass('active');

							// Hide dimension, dimfooter.
								$dimension.hide();
								$dimfooter.hide();

							// Show main, dimarticle.
								$main.show();
								$dimarticle.show();

							// Activate dimarticle.
								$dimarticle.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// dimarticle already visible? Just swap dimarticles.
					if ($body.hasClass('is-dimarticle-visible')) {

						// Deactivate current dimarticle.
							var $currentdimarticle = $main_dimarticles.filter('.active');

							$currentdimarticle.removeClass('active');

						// Show dimarticle.
							setTimeout(function() {

								// Hide current dimarticle.
									$currentdimarticle.hide();

								// Show dimarticle.
									$dimarticle.show();

								// Activate dimarticle.
									setTimeout(function() {

										$dimarticle.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-dimarticle-visible');

						// Show dimarticle.
							setTimeout(function() {

								// Hide dimension, dimfooter.
									$dimension.hide();
									$dimfooter.hide();

								// Show main, dimarticle.
									$main.show();
									$dimarticle.show();

								// Activate dimarticle.
									setTimeout(function() {

										$dimarticle.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $dimarticle = $main_dimarticles.filter('.active');

				// dimarticle not visible? Bail.
					if (!$body.hasClass('is-dimarticle-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate dimarticle.
								$dimarticle.removeClass('active');

							// Hide dimarticle, main.
								$dimarticle.hide();
								$main.hide();

							// Show dimfooter, dimension.
								$dimfooter.show();
								$dimension.show();

							// Unmark as visible.
								$body.removeClass('is-dimarticle-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate dimarticle.
					$dimarticle.removeClass('active');

				// Hide dimarticle.
					setTimeout(function() {

						// Hide dimarticle, main.
							$dimarticle.hide();
							$main.hide();

						// Show dimfooter, dimension.
							$dimfooter.show();
							$dimension.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-dimarticle-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// dimarticles.
			$main_dimarticles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				// Prevent clicks from inside dimarticle from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// dimarticle visible? Hide.
					if ($body.hasClass('is-dimarticle-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// dimarticle visible? Hide.
							if ($body.hasClass('is-dimarticle-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching dimarticle.
					else if ($main_dimarticles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show dimarticle.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, dimarticles.
				$main.hide();
				$main_dimarticles.hide();

			// Initial dimarticle.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

})(jQuery);