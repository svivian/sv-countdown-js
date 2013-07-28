/* svCountdown 0.2 - jQuery plugin */
(function($){
	$.fn.svCountdown = function(options) {

		var defaults = {
			year: 2000,
			month: 1,
			day: 1,
			blastOff: "It's here!",
			untilMessage: '',
			addTableClass: ''
		}
		options = $.extend(defaults, options);

		return this.each(function () {
			var $me = $(this);

			var targetDate = new Date( options.year, options.month-1, options.day );
			var oneSec  = 1000;     // milliseconds
			var oneMin  = 60000;    // oneSec x 60
			var oneHour = 3600000;  // oneMin x 60
			var oneDay  = 86400000; // oneHour x 24
			var daysLeft, hoursLeft, minsLeft, secsLeft;

			var tableClass = 'svcd-timer';
			if ( options.addTableClass.length > 0 )
				tableClass += ' ' + options.addTableClass;

			var tableHtml =
				'<table class="' + tableClass + '">' +
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
						'<td class="svcd-days"></td>' +
						'<td class="svcd-hours"></td>' +
						'<td class="svcd-mins"></td>' +
						'<td class="svcd-secs"></td>' +
					'</tr>' +
				'</tbody>' +
				'</table>';

			if ( options.untilMessage.length > 0 )
				tableHtml += '<p class="svcd-until">' + options.untilMessage + '</p>';

			$me.append(tableHtml);
			updateTime();


			function updateTime()
			{
				setTimer();

				if ( daysLeft <= 0 && hoursLeft <= 0 && minsLeft <= 0 && secsLeft <= 0 )
				{
					$('table.svcd-timer', $me).remove();
					$me.append('<p class="svcd-blastoff">' + options.blastOff + '</p>');
				}
				else
				{
					$('.svcd-days',  $me).text( daysLeft );
					$('.svcd-hours', $me).text( formatTime(hoursLeft) );
					$('.svcd-mins',  $me).text( formatTime(minsLeft) );
					$('.svcd-secs',  $me).text( formatTime(secsLeft) );

					setTimeout(updateTime, 1000);
				}
			}

			function setTimer()
			{
				var now = new Date();
				var timeLeft_tot = targetDate.getTime() - now.getTime();

				var timeLeft_days = timeLeft_tot % oneDay;
				daysLeft = ( timeLeft_tot - timeLeft_days ) / oneDay;

				var timeLeft_hours = timeLeft_days % oneHour;
				hoursLeft = ( timeLeft_days - timeLeft_hours ) / oneHour;

				var timeLeft_mins = timeLeft_hours % oneMin;
				minsLeft = ( timeLeft_hours - timeLeft_mins ) / oneMin;

				var timeLeft_secs = timeLeft_mins % oneSec;
				secsLeft = ( timeLeft_mins - timeLeft_secs ) / oneSec;
			}

			function formatTime( time )
			{
				if ( time < 10 )
					return '0' + time;
				return time;
			}

		});
	};
})(jQuery);
