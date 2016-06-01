var inactivityTimeout;
var endSessionTimeout = "false";
inactivityLogout();

jQuery(document).keypress(function(e) { 
	if(e.keyCode < 112 || e.keyCode > 123)
		inactivityLogout();
});
jQuery(document).bind('touchstart mousemove mousedown DOMMouseScroll mousewheel', function(){
	inactivityLogout();
});

function inactivityLogout()
{
	if(inactivityTimeout) { 
		clearTimeout(inactivityTimeout);
		inactivityTimeout = 0;
		endSessionTimeout = "false";
	}
	inactivityTimeout = setTimeout(function() {
		endSessionTimeout = "true";
	}, 600000);
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
	//console.log("Message Received By Child");
	if(e.origin=="http://122.248.236.40" || e.origin=="http://mindspark.in" || e.origin=="http://www.mindspark.in" || e.origin=="http://programserver" || e.origin=="http://educationalinitiatives.com" || e.origin=="http://www.educationalinitiatives.com" || e.origin=="http://192.168.0.15" || e.origin=="http://192.168.1.43" || e.origin=="http://192.168.1.43" || e.origin=="http://localhost" || e.origin=="http://192.168.0.61")
	{
		//console.log("Domain Verified..");
		var returnMsg = generate_params();//timeTaken+"||"+completed+"||"+score+"||"+extraParams;
		parent.postMessage(returnMsg,'*');
	}
	else
	{
		//console.log("Domain Verification Failed..");
		//console.log(e.origin);
	}
},false);

function generate_params()
{
	if(typeof levelsAttempted === 'undefined')
		process_string = totalTimeTaken + "#@" + completed + "#@" + score + "#@" + extraParameters + "#@" + endSessionTimeout;
	else
		process_string = extraParameters + "#@" + completed + "#@" + levelsAttempted + "#@" + levelWiseStatus + "#@" + levelWiseScore + "#@" + levelWiseTimeTaken + "#@" + endSessionTimeout;
	return process_string;
}