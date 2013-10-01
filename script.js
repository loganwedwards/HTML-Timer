/**
 * Script.js
 * Author: Logan Edwards
 * Revision: 2013-07-07
 * This handles the time keeping function based on events
 */
$(document).ready(function () {
    var $totalTime = 0.0; // Keeps track of elapsed time
    var $prevTime = 0.0;
    var $start; // start time
    var $doTime; // keep track of window interval
    
    var $time;
    var $running = false; // keep track of current timer state
    if ($totalTime === 0.0) {
        zeroTime();
    }
    
    function zeroTime() {
        $("#time").html("<p>0:0:0.00</p>");
    }
    /*
    Function to control the start of timer
    */
    $("#start").click(function () {
        
        if(!$running){
            $running = true; // Ensure that we can't start a 2nd concurrent timer
            
        
            $start = new Date().getTime();
          
    
            $doTime = window.setInterval(function() {clock($prevTime);},100);
            
            /**
             * Run this function on setInterval to continuously update
             * the time shown on the page.
             */
            function clock($p) {
                $prevTime = $p; // pass in the previous time
                $time = (new Date().getTime() - $start); // start calculating
                
                $time = ($time / 100) / 10; 
                $time += parseFloat($prevTime); // add previously elapsed time
                
                $totalTime = ($time).toFixed(2); // set to 2 decimals
                $("#time").html("<p>" + formatTime($totalTime) + "</p>");
                //$("#time").append("<p>Prev: " + $prevTime + "</p>");
                //return $totalTime;
            }
            $("#second-hand").css({
                "-webkit-animation-play-state": "running",
                "animation-play-state": "running"
            }).addClass("animation"); 
            
            if ($("#outer-circle").hasClass("not-running")) {
                $("#outer-circle").removeClass("not-running").addClass("running");
            } 
            else {
                $("#outer-circle").addClass("running");
            }
        }
    });
    
    /**
    Function to control the pause of timer
    */
    $("#stop").click(function () {
        $doTime = window.clearInterval($doTime); //stop the timer
        $running = false; // Allow use of timer again
        $prevTime = $totalTime;
        /* FOR TESTING
        $("#time").append("<p>" + $prevTime + "</p>");*/
        
        $("#second-hand").css({
            "-webkit-animation-play-state": "paused",
            "animation-play-state": "paused"
        });
        $("#outer-circle").removeClass("running").addClass("not-running");
        
       
    });
    
    /**
    Function to control rest of timer
    */
    $("#reset").click(function () {
        $doTime = window.clearInterval($doTime);
        $totalTime = 0.0;
        $prevTime = 0.0;
        $running = false; // Allow the use of timer again
        $("#time").empty();
        $("#second-hand").css({
            "-webkit-transform": "rotate(180deg)",
            "transform": "rotate(180deg)",
            "-webkit-transform-origin": "top",
            "transform-origin": "top"
        }).removeClass("not-running animation").addClass("no-animation");
        $("#outer-circle").removeClass("running").addClass("not-running");
        zeroTime();
    });
    
    /**
     * Function to format the time displayed.
     * We assume that noone runs the timer for over 24 hours. If
     * they do, days, months, years not segragated out
     */
    function formatTime($tIn) {
        var $hr, $min, $sec;
        var $t = $tIn;
        var $out = "";
        $hr = Math.floor($t / 3600); // hold the hours
        $t -= $hr * 3600;  // update the time var
        $min = Math.floor($t / 60); // hold the minutes
        $t -= $min * 60; // update the time var
        $sec = $t.toFixed(2); // assign the seconds
        
        /**
         * Some basic formatting for the output.
         * Note this is a string and is not the 
         * number used for any time calculations.
         */
        $out = $hr + ":" + $min + ":" + $sec;
        /* FOR TESTING
        console.log($out + "\n"); */
        return $out;
    };
    
    /**
     * Function to check the window size and
     * modify the CSS properties of the clock
     * face depending on the current width
     */
    $(window).resize(function() {
        if($(window).width() <= 540) {
            var equalHeight = $('#wrapper').css("width");
            var equalHeightNum = parseInt(equalHeight.substring(0,equalHeight.length-2));
            var handHeight = (equalHeightNum/2) - 20;
            console.log(equalHeightNum);
            $('#wrapper').css("height", equalHeight);
            $('#second-hand').css("height", handHeight);
        }
        else {
            $('#wrapper').css("height", "450");
            $('#second-hand').css("height", "200");
        }
    })
    
});



