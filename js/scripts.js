//Global Variable Declaration 
var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
var lastRender = 0;
var  width = c.width;
var  height = c.height;
//Inital Starting Position
var ship = new Image(); 
ship.src = "shuttle.png";

var state = {
	x: (width / 2) -ship.width,
	y: (height / 2) -ship.height,
	ySpeed: 0,
	xSpeed: 0,
	angle: 0, 
    angleSpeed: 5,
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
	ctx.clearRect(0,0, c.width, c.height);
	ctx.save();
	ctx.translate(state.x,state.y);
	ctx.translate(ship.width,ship.height);
	ctx.rotate((state.angle+90)*(Math.PI/180));
	ctx.drawImage(ship,-(ship.width/2), -(ship.height/2), ship.width,ship.height);
	ctx.restore();
};

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
    var xDirection = Math.cos(state.angle * Math.PI / 180);
    var yDirection = Math.sin(state.angle * Math.PI / 180);
    state.x += state.xSpeed * xDirection;
    state.y += state.ySpeed * yDirection;
    if(state.xSpeed > 0 && state.ySpeed > 0){
        state.xSpeed -= .02;
        state.ySpeed -= .02;
    }
    if(state.xSpeed < 0 && state.ySpeed < 0){
        state.xSpeed = 0;
        state.ySpeed = 0;
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