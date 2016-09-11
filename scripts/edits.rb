require 'fileutils'

tempfile = File.open("file.tmp", 'w')
File.open("../js/metronome.js", 'r') do |f|
  f.each_line do |line|
    if line =~ /timerWorker = new Worker\("\/js\/metronomeworker.js"\);/
      tempfile << '  timerWorker = new Worker("/javascripts/advanced-metronome/js/metronomeworker.js\");'
    elsif line =~ /function saveData\(\) {/
      tempfile << line
      code = <<-eos
    var request = new XMLHttpRequest();
    //request.onload = callback;
    var url = \$("#metronome-form").data("url");
    request.open("PATCH", url);
    request.setRequestHeader("Content-Type", "application/json");
    var csrfToken = \$('[name=csrf-token]').attr('content');
    request.setRequestHeader("X-CSRF-Token", csrfToken);
    var myData = { "song": { "metronome": metronomeData }};
    request.send(JSON.stringify(myData));
      eos
      tempfile << code
    else
      tempfile << line
    end
  end
end
tempfile.close

FileUtils.cp("../js/metronome.js", "../js/metronome.js.bak")
FileUtils.mv("file.tmp", "../js/metronome.js")
