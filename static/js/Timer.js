function makeTimer() {

    var eventTime = new Date("2020-12-26T12:00:00+05:30");			
    eventTime = Date.parse(eventTime) / 1000;

    let now = new Date();
    now = Date.parse(now) / 1000;
    let timeLeft;
    if(eventTime > now){
        $('.timerHeading').text('Event Begins In');
        timeLeft = eventTime - now;
    }
    else{
        var eventTime = new Date("2020-12-26T24:00:00+05:30");	
        eventTime = Date.parse(eventTime) / 1000;
        timeLeft = eventTime - now;
        $('.timerHeading').text('Event Ends In');
    }
    let days = Math.floor(timeLeft / 86400); 
    let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (days < "10") { days = "0" + days; }
    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $("#days").html(days + "<span class='timerSpan'>Days</span>");
    $("#hours").html(hours + "<span class='timerSpan'>Hours</span>");
    $("#minutes").html(minutes + "<span class='timerSpan'>Minutes</span>");
    $("#seconds").html(seconds + "<span class='timerSpan'>Seconds</span>");	
}

setInterval(function() { makeTimer(); }, 1000);