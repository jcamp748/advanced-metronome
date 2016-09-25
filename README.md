# advanced-metronome
This is a programmable metronome inspired by a [basic metronome](https://github.com/cwilso/metronome)
that is written in javascript.  This metronome improves upon its predecessor by providing a nicer looking
UI and the ability to add sections with different tempos and time signatures within the same song.  The UI
uses a modified version of [SegmentDisplay](http://www.3quarks.com/en/SegmentDisplay/) from 3quarks.

# Dependencies
* [bootstrap](https://github.com/twbs/bootstrap for styling) for styling.
* [jquery](https://jquery.com/)

# Usage
To use the metronome on a web page copy what you need from the `index.html` to the `<body>` element
of the appropriate view.  There is `data-metronome` attribute on `<div id="metronome-wrapper>` that
you can use to load a JSON string into. Next copy all the javascript files where they will be served.  
Read the `INSTALL` file for instructions on how to integrate the metronome with a rails application.

