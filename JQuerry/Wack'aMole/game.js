$(document).ready(function () {
    var counter = 0;
    var points = 0;

    $("img").hide();
    $("#winMessage").hide();

    $("#play").click(function() {
        $("#play").prop('disabled', true);

        var myInt = setInterval(function(){
            if (counter % 2 == 0) {
                var top = 0;
                while (top < 90) {
                    top = Math.random() * window.outerHeight;
                }
    
                $("img").css({"left": Math.random() * window.outerWidth, "top": top});
                $("img").show();
            } else {
                $("img").hide();
            }
            counter += 1;
          }, 2000);

          $("img").click(function() {
            points += 1;
            $("#number-points").text(points);
            if (points == 2) {
                clearInterval(myInt);
                $("#winMessage").show();
                $("img").hide();
                $("h1").hide();
                $("h2").hide();
                $("#play").hide();
            }
        })
    })

});