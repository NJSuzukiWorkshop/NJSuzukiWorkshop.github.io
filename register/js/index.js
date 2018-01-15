const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date("July 7, 2018 00:00:00").getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById("days").innerHTML = Math.floor(distance / (day)),
      document.getElementById("hours").innerHTML = Math.floor((distance % (day)) / (hour)),
      document.getElementById("minutes").innerHTML = Math.floor((distance % (hour)) / (minute)),
      document.getElementById("seconds").innerHTML = Math.floor((distance % (minute)) / second);

      if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "0",
          document.getElementById("hours").innerHTML = "0",
          document.getElementById("minutes").innerHTML = "0",
          document.getElementById("seconds").innerHTML = "0",
          document.getElementById("countdown-title").innerHTML = "The Workshop is Over";
      }

    }, second)