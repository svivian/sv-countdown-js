
svCountdown
=================================================

svCountdown is a jQuery countdown plugin. Usage:

	<div id="countdown"></div>

	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script>
	$(function () {
		$('#countdown').svCountdown({
			year: 2000,
			month: 1,
			day: 1,
			blastOff: 'It happened!',
			untilMessage: 'until something happens'
		});
	});
	</script>
