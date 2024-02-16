// load namespace
SV = window.SV || {};

SV.Countdown = (function() {

	// constructor
	return function(selector, userConfig) {

		// private members

		const defaultOptions = {
			year: 2000,
			month: 1,
			day: 1,
			untilMessage: '',
			endMessage: '',
			tableClass: ''
		};

		var config = {};
		var wrapper;
		var targetDate;
		var daysLeft, hoursLeft, minsLeft, secsLeft;
		var useTableClass = 'sv-cd-timer';

		// public api
		var methods = {};

		// private methods

		var formatTime = function(time) {
			if (time < 10)
				return '0' + time;

			return time;
		};

		var setTimer = function() {
			var oneSec  = 1000;     // milliseconds
			var oneMin  = 60000;    // oneSec x 60
			var oneHour = 3600000;  // oneMin x 60
			var oneDay  = 86400000; // oneHour x 24

			var now = new Date();
			var timeLeftTotal = targetDate.getTime() - now.getTime();

			var timeLeftDays = timeLeftTotal % oneDay;
			daysLeft = ( timeLeftTotal - timeLeftDays ) / oneDay;

			var timeLeftHours = timeLeftDays % oneHour;
			hoursLeft = ( timeLeftDays - timeLeftHours ) / oneHour;

			var timeLeftMins = timeLeftHours % oneMin;
			minsLeft = ( timeLeftHours - timeLeftMins ) / oneMin;

			var timeLeftSecs = timeLeftMins % oneSec;
			secsLeft = ( timeLeftMins - timeLeftSecs ) / oneSec;
		};

		var updateTime = function() {
			setTimer();

			if (daysLeft <= 0 && hoursLeft <= 0 && minsLeft <= 0 && secsLeft <= 0) {
				wrapper.innerHTML = '<p class="sv-cd-blastoff">' + options.endMessage + '</p>';
			} else {
				wrapper.querySelector('.sv-cd-days').innerText = daysLeft;
				wrapper.querySelector('.sv-cd-hours').innerText = formatTime(hoursLeft);
				wrapper.querySelector('.sv-cd-mins').innerText = formatTime(minsLeft);
				wrapper.querySelector('.sv-cd-secs').innerText = formatTime(secsLeft);

				setTimeout(updateTime, 1000);
			}
		};

		var init = function() {
			wrapper = document.querySelector(selector);
			if (!wrapper)
				return;

			config = Object.assign({}, defaultOptions, userConfig);

			targetDate = new Date(config.year, config.month - 1, config.day);

			if (config.tableClass.length > 0)
				useTableClass += ' ' + config.tableClass;

			var tableHtml =
				'<table class="' + useTableClass + '">' +
				'<thead>' +
					'<tr>' +
						'<th>Days</th>' +
						'<th>Hours</th>' +
						'<th>Mins</th>' +
						'<th>Secs</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
						'<td class="sv-cd-days"></td>' +
						'<td class="sv-cd-hours"></td>' +
						'<td class="sv-cd-mins"></td>' +
						'<td class="sv-cd-secs"></td>' +
					'</tr>' +
				'</tbody>' +
				'</table>';

			if (config.untilMessage.length > 0)
				tableHtml += '<p class="sv-cd-until">' + config.untilMessage + '</p>';

			wrapper.innerHTML = tableHtml;
			updateTime();

		};

		init();

	};

})();
