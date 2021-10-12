function myTank() {
// YOUR CODE GOES BELOW vvvvvvvv

tank.init(function(settings, info) {

});

tank.loop(function(state, control) {
  control.THROTTLE = 1;
  control.TURN = 0.2
  control.SHOOT = 0.1;
});

// YOUR CODE GOES ABOVE ^^^^^^^^
}

window.myTank = myTank
