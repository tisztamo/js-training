/*
	Usage: set the javaScript variables endDate, countDownId, countDownTimeFormat, function timeIsUpFunction() and include this js
*/

function displayTimeLeft() {
	now = new Date();    
    var mSecs = endDate - now;
	if (mSecs >= 0) {    
  	var timeString = "";
		var formatString = countDownTimeFormat;
		while (formatString.length > 0) {
	   	//Set Hours
            if (formatString.charAt(0).toUpperCase() == 'H') {
             
      	if (mSecs < 1000*60*60*10) {
      		timeString += "0" + (Math.floor(mSecs/(1000*60*60))).toString() + ":";
      	} else {
      		timeString += (Math.floor(mSecs/(1000*60*60))).toString() + ":";
      	}
      	mSecs = mSecs % (1000*60*60);
  	  }

    	//Set Minutes
  		if (formatString.charAt(0).toUpperCase() == 'M') {
      	if (mSecs < 1000*60*10) {
      		timeString += "" + (Math.floor(mSecs/(1000*60))).toString() + ":";
      	} else {
      		timeString += (Math.floor(mSecs/(1000*60))).toString() + ":";
      	}
      	mSecs = mSecs % (1000*60);
  		}
    
    	//Set Seconds
  		if (formatString.charAt(0).toUpperCase() == 'S') {
      	if (mSecs < 10000) {
      		timeString += "0" + (Math.floor(mSecs/(1000))).toString();            
      	} else {
      		timeString += (Math.floor(mSecs/(1000))).toString();
      	}
    	}
  		formatString = formatString.substring(1);
    }
		document.getElementById(countDownId).innerHTML = "<b>" + timeString + "</b>";       
		setTimeout("displayTimeLeft()", 990);
	} else {        
		timeIsUpFunction();
		return true;
	}
}

displayTimeLeft();
