"use strict";
{
	let _states = ["inProgress", "enteringMap", "leavingMap", "aborted", "paused"];
	let _state = "";
	V3.StateMachine = class{
		constructor(){}
		get state(){
			return _state;
		}
		set state(state){
			if ((state !== _state) && (_states.indexOf(state) != -1)){
				_state = state;
				// also should maybe trigger an event
				return true;
			}
			else return false;
		}
	};
}

