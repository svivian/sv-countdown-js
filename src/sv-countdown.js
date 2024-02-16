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

		const oneSec = 1000; // milliseconds
		const oneMin = 60000; // oneSec x 60
		const oneHour = 3600000; // oneMin x 60
		const oneDay = 86400000; // oneHour x 24

		let config = {};
		let wrapper, daysElem, hoursElem, minsElem, secsElem;
		let targetDate;
		let daysLeft, hoursLeft, minsLeft, secsLeft;
		let useTableClass = 'sv-cd-timer';

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
				wrapper.innerHTML = '<p class="sv-cd-blastoff">' + config.endMessage + '</p>';
			} else {
				daysElem.textContent = daysLeft;
				hoursElem.textContent = formatTime(hoursLeft);
				minsElem.textContent = formatTime(minsLeft);
				secsElem.textContent = formatTime(secsLeft);
			}
		};

		const init = function() {
			wrapper = document.querySelector(selector);
			if (!wrapper) {
				console.error('Error: wrapper element not found');
				return;
			}

			config = Object.assign({}, defaultOptions, userConfig);
			targetDate = new Date(config.year, config.month - 1, config.day);

			if (config.tableClass.length > 0)
				useTableClass += ' ' + config.tableClass;

			let tableHtml = '<table class="' + useTableClass + '">';
			if (config.untilMessage.length > 0)
				tableHtml += '<caption class="sv-cd-until">' + config.untilMessage + '</caption>';

			tableHtml +=
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

			wrapper.innerHTML = tableHtml;

			daysElem = wrapper.querySelector('.sv-cd-days');
			hoursElem = wrapper.querySelector('.sv-cd-hours');
			minsElem = wrapper.querySelector('.sv-cd-mins');
			secsElem = wrapper.querySelector('.sv-cd-secs');

			updateTime();
			setInterval(updateTime, oneSec);
		};

		init();

	};

})();
