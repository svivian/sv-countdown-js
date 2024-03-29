// load namespace
SV = window.SV || {};

SV.Countdown = (function() {

	// constructor
	return function(wrapperElem, userConfig) {

		// private members

		const defaultOptions = {
			year: 2000,
			month: 1,
			day: 1,
			showSeconds: true,
			untilMessage: '',
			endMessage: '',
			tableClass: ''
		};

		const oneSec = 1000; // milliseconds
		const oneMin = 60000; // oneSec x 60
		const oneHour = 3600000; // oneMin x 60
		const oneDay = 86400000; // oneHour x 24

		let config = {};
		let daysElem, hoursElem, minsElem, secsElem;
		let targetDate;
		let daysLeft, hoursLeft, minsLeft, secsLeft;
		let tableClass = 'sv-cd-timer';

		const formatTime = function(time) {
			if (time < 10)
				return '0' + time;

			return time;
		};

		const calcTimeLeft = function() {
			let now = new Date();
			const timeLeftTotal = targetDate.getTime() - now.getTime();

			const timeLeftDays = timeLeftTotal % oneDay;
			daysLeft = ( timeLeftTotal - timeLeftDays ) / oneDay;

			const timeLeftHours = timeLeftDays % oneHour;
			hoursLeft = ( timeLeftDays - timeLeftHours ) / oneHour;

			const timeLeftMins = timeLeftHours % oneMin;
			minsLeft = ( timeLeftHours - timeLeftMins ) / oneMin;

			const timeLeftSecs = timeLeftMins % oneSec;
			secsLeft = ( timeLeftMins - timeLeftSecs ) / oneSec;
		};

		const updateTime = function() {
			calcTimeLeft();

			if (daysLeft <= 0 && hoursLeft <= 0 && minsLeft <= 0 && secsLeft <= 0) {
				wrapperElem.innerHTML = '<p class="sv-cd-blastoff">' + config.endMessage + '</p>';
			} else {
				daysElem.textContent = daysLeft;
				hoursElem.textContent = formatTime(hoursLeft);
				minsElem.textContent = formatTime(minsLeft);
				if (config.showSeconds)
					secsElem.textContent = formatTime(secsLeft);
			}
		};

		const init = function() {
			if (!wrapperElem) {
				throw 'Error: invalid element supplied';
			}

			config = Object.assign({}, defaultOptions, userConfig);
			targetDate = new Date(config.year, config.month - 1, config.day);

			if (config.tableClass.length > 0)
				tableClass += ' ' + config.tableClass;

			let tableHtml = '<table class="' + tableClass + '">';
			if (config.untilMessage.length > 0)
				tableHtml += '<caption class="sv-cd-until">' + config.untilMessage + '</caption>';

			tableHtml +=
				'<thead>' +
					'<tr>' +
						'<th>Days</th>' +
						'<th>Hours</th>' +
						'<th>Mins</th>' +
						(config.showSeconds ? '<th>Secs</th>' : '') +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
						'<td class="sv-cd-days"></td>' +
						'<td class="sv-cd-hours"></td>' +
						'<td class="sv-cd-mins"></td>' +
						(config.showSeconds ? '<td class="sv-cd-secs"></td>' : '') +
					'</tr>' +
				'</tbody>' +
				'</table>';

			wrapperElem.innerHTML = tableHtml;

			daysElem = wrapperElem.querySelector('.sv-cd-days');
			hoursElem = wrapperElem.querySelector('.sv-cd-hours');
			minsElem = wrapperElem.querySelector('.sv-cd-mins');
			secsElem = wrapperElem.querySelector('.sv-cd-secs');

			updateTime();
			setInterval(updateTime, config.showSeconds ? oneSec : oneMin);
		};

		init();

	};

})();
