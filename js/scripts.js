//Global Variable Declaration 
var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
var height, width;
var lastRender = 0;
//Inital Starting Position
    var startX=50;
    var startY=80;
var state = {
	x: 50,
	y: c.height + 50,
	ySpeed: 8,
	xSpeed: 8,
	deg: 45,
	pressedKeys: {
  	}
};

//Function Setup
var resize = function() {
  width = window.innerWidth - 22;
  height = window.innerHeight - 22;
  c.width = width;
  c.height = height;
};

//Clear and Draw to Screen
function draw(state){
	ctx.beginPath();
	ctx.rect(state.x, state.y, 100, 100);
	ctx.fillStyle = "red";
	ctx.fill();
	drawRotatedRect(state.x,state.y,100,20,45);
}

    function drawRotatedRect(x,y,width,height,degrees){

        // first save the untranslated/unrotated context
 
        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate( x+width/2, y+height/2 );
        // rotate the rect
        ctx.rotate(degrees*Math.PI/180);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        ctx.rect( -width/2, -height/2, width,height);

        ctx.fillStyle="gold";
        ctx.fill();

        // restore the context to its untranslated/unrotated state
 

    }
//Check Bounds of the global state
function checkBounds() {
	if (state.y > height) {
		state.y -= height;
	}
	if (state.y < 0) {
		state.y += height;
	}
	if (state.x > width){
		state.x -= width;
	}
	if (state.x < 0){
		state.x += width;
	}
}

//Check if in bounds, for each pressed key, do something
function update(progress){
	checkBounds();
    for (var key in state.pressedKeys) {
        if (state.pressedKeys.hasOwnProperty(key)) {
        	switch(key){
        	    case 'KeyA':
        	        state.x -= state.xSpeed;
        	    break;
        	    case 'KeyD':
        	        state.x += state.xSpeed;
        	    break;
        	    case 'KeyS':
        	        state.y += state.ySpeed;
        	    break;
        	    case 'KeyW':
        	        state.y -= state.ySpeed;
        	    break;	
        	}
        }
    }
};

//Main loop
function loop(timestamp){
	var progress = timestamp - lastRender;
	update(progress);
	draw(state);
	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}

resize();
window.requestAnimationFrame(loop);
window.onresize = resize;
window.addEventListener("keydown", function(ev){state.pressedKeys[ev.code] = true; }, false);
window.addEventListener("keyup", function(ev){delete state.pressedKeys[ev.code]}, false);