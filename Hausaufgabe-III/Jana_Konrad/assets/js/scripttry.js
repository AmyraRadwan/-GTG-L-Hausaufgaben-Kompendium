//------------------------------------
//MOVE
//__________________________
// UP 
//___________________________

var arrow1 = document.getElementById("up");

move1(arrow1, window.innerHeight - 50, 0, -5); // start at the bottom, move upwards

function move1(elem, from, to, inc) {
    console.log("Moving from " + from + " to " + to);

    var top = from;

    function frame() {
        top += inc;
        
        if (top <= to) { // Reset position to start from the bottom again
            top = from;
        }

        elem.style.top = top + 'px';
    }

    setInterval(frame, 1000 / 20); // Run at 60 frames per second
}
// //__________________________
// // DOWN
// //___________________________

var arrow2 = document.getElementById("down");

move2(arrow2, 0, window.innerHeight - 50, 5); // start at the top, move downwards

function move2(elem, from, to, inc) {
    console.log("Moving from " + from + " to " + to);

    var top = from;

    function frame() {
        top += inc;
        
        if (top >= to) { // Reset position to start from the top again
            top = from;
        }

        elem.style.top = top + 'px';
    }

    setInterval(frame, 1000 / 20); // Run at 60 frames per second
}
// //__________________________
// // LEFT green
// //___________________________


var arrow3 = document.getElementById("left");

// Start from the end and move to the beginning in reverse
move3(arrow3, window.innerWidth - 50, 0, -10); // Use a negative increment to move left

function move3(elem, from, to, inc) {
    console.log("Moving from " + from + " to " + to);

    var left = from;

    function frame() {
        left += inc;

        // Reset position when it reaches the start
        if (left <= to) {
            left = from; // Reset to the starting position (end in this case)
        }

        elem.style.left = left + 'px';
    }

    setInterval(frame, 1000 / 20); // Run at 20 frames per second
}

// //__________________________
// // RIGHT red
// //___________________________

var arrow4 = document.getElementById("right");

move4(arrow4, 0, window.innerWidth - 50, 10);

function move4(elem, from, to, inc) {
    console.log("Moving from " + from + " to " + to);

    var left = from;

    function frame() {
        left += inc;
        
        // Reset position when it reaches the end
        if (left >= to) {
            left = from; // Reset to starting position
        }

        elem.style.left = left + 'px';
    }

    setInterval(frame, 1000 / 20); // Run at 60 frames per second
}
//-------------------------------------------------

var arrow5 = document.getElementById("star");

move5(arrow5, 0, window.innerWidth - 50, 10);

function move5(elem, from, to, inc) {
    console.log("Moving from " + from + " to " + to);

    var left = from;

    function frame() {
        left += inc;
        
        // Reset position when it reaches the end
        if (left >= to) {
            left = from; // Reset to starting position
        }

        elem.style.left = left + 'px';
    }

    setInterval(frame, 1000 / 20); // Run at 60 frames per second
}






