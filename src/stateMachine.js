"use strict";
V3.StateMachine = function(){
	var states = ["inProgress", "enteringMap", "leavingMap", "aborted", "paused"];

	var state = "asd";
	this.prototype = {
		get: function(){
			return state;
		},
		set: function(state){
			if (state in states){
				this.state = state;
				var event = new CustomEvent("gameStateChange", {state: state});
				document.dispatchEvent("gameStateChange", event);
				return true;
			}
			else return false;
		}
	};
};
