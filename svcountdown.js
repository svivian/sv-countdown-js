/*!
 * svCountdown 0.1
 * Copyright (c) 2010 Scott Vivian
 * Licensed under GPL: http://www.gnu.org/licenses/gpl.html
 */

(function($){
    $.fn.extend({
        svCountdown: function(options) {

			var defaults = {
				year: 2000,
				month: 1,
				day: 1,
				blastOff: "It's here!"
			}
			var options =  $.extend(defaults, options);

            return this.each( function() {
				var $me = $(this);

				var targetDate = new Date( options.year, options.month-1, options.day );
				var oneSec = 1000;		// milliseconds
				var oneMin = 60000;		// oneSec x 60
				var oneHour = 3600000;	// oneMin x 60
				var oneDay = 86400000;	// oneHour x 24
				var daysLeft, hoursLeft, minsLeft, secsLeft;

				var tableHtml =
					'<table class="cd-timer">' +
					'<thead>' +
					'	<tr>' +
					'		<th>Days</th>' +
					'		<th>Hours</th>' +
					'		<th>Mins</th>' +
					'		<th>Secs</th>' +
					'	</tr>' +
					'</thead>' +
					'<tbody>' +
					'	<tr>' +
					'		<td class="cd-days"></td>' +
					'		<td class="cd-hours"></td>' +
					'		<td class="cd-mins"></td>' +
					'		<td class="cd-secs"></td>' +
					'	</tr>' +
					'</tbody>' +
					'</table>';

				$me.append(tableHtml);
				updateTime();


				function updateTime()
				{
					setTimer();

					if ( daysLeft <= 0 && hoursLeft <= 0 && minsLeft <= 0 && secsLeft <= 0 )
					{
						$('table.cd-timer', $me).remove();
						$me.append('<p class="cd-blastoff">' + options.blastOff + '</p>');
					}
					else
					{
						$('.cd-days',  $me).text( daysLeft );
						$('.cd-hours', $me).text( formatTime(hoursLeft) );
						$('.cd-mins',  $me).text( formatTime(minsLeft) );
						$('.cd-secs',  $me).text( formatTime(secsLeft) );

						setTimeout(updateTime, 1000);
					}
				}

				function setTimer()
				{
					var now = new Date();
					var timeLeft_tot = targetDate.getTime() - now.getTime();
// 					alert(targetDate);

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
        }
    });
})(jQuery);
