
sv-countdown
=================================================

sv-countdown is a vanilla JavaScript countdown plugin with no dependencies. Pass in a CSS selector for a wrapping element, the date and message, and the plugin will set up a table showing days/hours/minutes/seconds until your event. Example:

	<div id="countdown"></div>

	<script src="/path/to/sv-countdown.js"></script>
	<script>
	var countdown = new SV.Countdown('#countdown', {
		year: 2025,
		month: 11,
		day: 16,
		untilMessage: 'Countdown to November 16th 2025',
		endMessage: 'It happened!'
	});
	</script>

Note: to make things easier the month provided should be 1-indexed, i.e. January is 1, February is 2 etc. This is in contrast to JS itself which uses 0-indexed months - the plugin takes care of using the right index.
