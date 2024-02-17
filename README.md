SV-Countdown
=================================================

**sv-countdown-js** is a vanilla JavaScript countdown plugin with no dependencies. Pass in an HTML element (such as that returned from `document.querySelector`) that will be used as a wrapper for the countdown, plus an object containing the configuration, and the plugin will set up a table showing days/hours/minutes/seconds until your event.

## Example usage

```html
<div id="countdown"></div>

<script src="/path/to/sv-countdown.js"></script>
<script>
let wrapper = document.querySelector('#countdown');
let countdown = new SV.Countdown(wrapper, {
	year: 2025,
	month: 12,
	day: 25,
	untilMessage: 'Countdown to December 25th 2025',
	endMessage: 'It happened!'
});
</script>
```

## Configuration

The following options can be passed in the second parameter to SV.Countdown:

- `year` (required): the year of the event
- `month` (required): the month of the event
- `day` (required): the day of the event
- `showSeconds` (optional): whether to show the seconds column (default: `true`); if set to false then the time runs once per minute instead
- `untilMessage` (optional): a message, shown as a table caption, that describes what you're counting down to
- `endMessage` (optional): a message to show once the countdown has reached zero
- `tableClass` (optional): an additional class to add to the table element

Note: to make things easier the month provided should be 1-indexed, i.e. January is 1, February is 2 etc. This is in contrast to JS itself which uses 0-indexed months - the plugin takes care of using the right index.

## Styling

A sample stylesheet is provided in `demo/sample.css` which can be used as a starting point. These are the classes that get applied to the table and related elements:

- `.sv-cd-timer` - the table itself
- `.sv-cd-days` - the table cell showing the number of days
- `.sv-cd-hours` - the cell showing hours
- `.sv-cd-mins` - the cell showing minutes
- `.sv-cd-secs` - the cell showing seconds
- `.sv-cd-until` - the `<caption>` element on the table showing the description from `untilMessage`; the `caption-side` property can be used to put this above or below the table
- `.sv-cd-blastoff` - the element that replaces the table and shows the message from `endMessage`
