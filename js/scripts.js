//Global Variable Declaration 
var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
var lastRender = 0;
var  width = c.width;
var  height = c.height;
//Inital Starting Position
<<<<<<< HEAD
    var startX=50;
    var startY=80;
var state = {
	x: 50,
	y: c.height + 50,
	ySpeed: 8,
	xSpeed: 8,
	deg: 45,
=======
var ship = new Image(); 
ship.src = "shuttle.png";

var state = {
	x: (width / 2) -ship.width,
	y: (height / 2) -ship.height,
	ySpeed: 0,
	xSpeed: 0,
	angle: 0, 
    angleSpeed: 5,
>>>>>>> 25a49c5228369086d87e7cd072ac9fbbc9f51de3
	pressedKeys: {
  	}
};

//Function Setup
var resize = function() {
  if(window.innerWidth > 640){
  	c.width = 640;
  }else{
    c.width = window.innerWidth - ship.width;
  }	
  if(window.innerHeight > 400){
    c.height = 400;	
  }else{
    c.height = window.innerHeight - ship.height;
  }
  width = c.width;
  height = c.height;
};

//Clear and Draw to Screen
function draw(state){
<<<<<<< HEAD
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
=======
	ctx.clearRect(0,0, c.width, c.height);
	ctx.save();
	ctx.translate(state.x,state.y);
	ctx.translate(ship.width,ship.height);
	ctx.rotate((state.angle+90)*(Math.PI/180));
	ctx.drawImage(ship,-(ship.width/2), -(ship.height/2), ship.width,ship.height);
	ctx.restore();
};
>>>>>>> 25a49c5228369086d87e7cd072ac9fbbc9f51de3

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
	if (state.y + 78 > height) {
		state.y = -26;
	}
	if (state.y + 26 < 0) {
		state.y += height - 52;
	}
	if ((state.x + 78) > width){
		state.x = -26;
	}
	if (state.x + 26 < 0){
		state.x += width - 52;
	}
}
function processKeys() {
    for (var key in state.pressedKeys) {
        if (state.pressedKeys.hasOwnProperty(key)) {
            switch(key){
                case 'KeyA':
                    state.angle -= state.angleSpeed;
                    if (state.angle < 1){
                        state.angle = 360;
                    }
                break;
                case 'KeyD':
                    state.angle += state.angleSpeed;
                    if (state.angle > 360){
                        state.angle = 0;
                    }
                break;
                case 'KeyS':
                    state.xSpeed -= .05;
                    state.ySpeed -= .05;
                    if(state.xSpeed < 0){
                        state.xSpeed = 0;
                    }
                    if(state.ySpeed < 0){
                        state.ySpeed = 0;
                    } 
                break;
                case 'KeyW':
                    if(state.xSpeed < 4 && state.ySpeed < 4){
                        state.xSpeed += .05;
                        state.ySpeed += .05;
                    }
                break;
                default:
                break;
            }
        }  
    }
}
//Check if in bounds
//Process each pressed key
//Move based on xSpeed and ySpeed and the angle faced
//Apply friction to xSpeed and ySpeed
function update(progress){
	checkBounds();
    processKeys();
    state.x += state.xSpeed * Math.cos(state.angle * Math.PI / 180);
    state.y += state.ySpeed * Math.sin(state.angle * Math.PI / 180);
    if(state.xSpeed > 0 && state.ySpeed > 0){
        state.xSpeed -= .01;
        state.ySpeed -= .01;
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

ship.onload = function(){
    resize();
    window.onresize = resize;
    window.addEventListener("keydown", function(ev){state.pressedKeys[ev.code] = true; }, false);
    window.addEventListener("keyup", function(ev){delete state.pressedKeys[ev.code];}, false);
    window.requestAnimationFrame(loop);
}