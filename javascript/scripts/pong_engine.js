var cv;
var cvtx;
var players = new Array(2);
var ball;
var frame_renderer;
var settings = {
	fps: 60,
	paused: true,
	slayer: {
		x: 20,
		y: 80,
		color: "blue",
		movespeed: 4
	},
	ball: {
		speed: null,
		max_speed: null,
		increase_speed: 1.001,
		color: "green"
	},
	controls: {
		pl_right: {
			up: { kc: "L", pressed: false },
			down: { kc: "O", pressed: false },
		},
		pl_left: {
			up: { kc: "A", pressed: false },
			down: { kc: "Q", pressed: false },
		}
	},
	text: {}
};

var PL_RIGHT = 0;
var PL_LEFT = 1;

var POS_CORR = 0.2;

var KEY_ESC = 27;
var KEY_SPACE = 32;

$(document).ready(function () {
	Init();
});

function Init() {
	cv = $("canvas#pong_area")[0];
	cvtx = cv.getContext("2d");

	InitPlayers();
	InitBall();

	settings.text.score_text = new Text("Score", cv.width / 2 - 12, 28, "14px", "Calibri", "black");
	settings.text.score = new Text(players[PL_LEFT].score + " : " + players[PL_RIGHT].score, cv.width / 2 - 16, 52, "24px", "Calibri", "black");
	settings.text.start_game = new Text("Press Space to Start", cv.width / 2 - 100, cv.height / 2 + 4, "24px", "Calibri", "black");

	InitEventListeners();

	frame_renderer = setInterval(function () { CalcFrame(); }, 1000 / settings.fps);
}

function InitPlayers() {
	players = new Array(2);
	players[PL_LEFT] = new Slayer(new Vector2D(0, settings.slayer.y), settings.slayer.color, 0);
	players[PL_RIGHT] = new Slayer(new Vector2D(cv.width - settings.slayer.x, settings.slayer.y), settings.slayer.color, 0);
}

function InitBall() {
	ball = null;
	settings.ball.speed = new Vector2D(1.01, 2.01);
	settings.ball.max_speed = new Vector2D(3.01, 3.01);
	ball = new Ball(new Vector2D(cv.width / 2, cv.height / 2), 20, settings.ball.speed, settings.ball.color);
}

function InitNewRound() {
	settings.paused = true;
	UpdateScoreText();
	InitBall();
	settings.text.start_game = new Text("Press Space to Start", cv.width / 2 - 100, cv.height / 2 + 4, "24px", "Calibri", "black");
}

function Slayer(vect, color, score) {
	this.vect = vect;
	this.color = color;
	this.score = score;
}

function Ball(vect, radius, speed, color) {
	this.vect = vect;
	this.radius = radius;
	this.speed = speed;
	this.color = color;
}

function Vector2D(x, y) {
	this.x = x;
	this.y = y;
}

function Text(text, x, y, size, font, color) {
	this.text = text;
	this.x = x;
	this.y = y;
	this.size = size;
	this.font = font;
	this.color = color;
}

function DrawRect(x, y, z, w, color) {
	cvtx.fillStyle = color;
	cvtx.fillRect(x, y ,z ,w);
}

function DrawBall(x, y, r, color) {
	cvtx.beginPath();
	cvtx.fillStyle = color;
	cvtx.arc(x, y, r, 0, 2 * Math.PI);
	cvtx.fill();
	cvtx.closePath();
}

function DrawText(text) {
	cvtx.fillStyle = text.color;
	cvtx.font = text.size + " " + text.font;
	cvtx.fillText(text.text, text.x, text.y);
}

function ClearImage() {
	cvtx.clearRect(0, 0, cv.width, cv.height);
}

function DrawFrame(players, ball) {
	ClearImage();
	for(var i = 0; i < players.length; i++) {
		DrawRect(players[i].vect.x, players[i].vect.y, settings.slayer.x, settings.slayer.y, players[i].color);
	}
	DrawBall(ball.vect.x, ball.vect.y, ball.radius, ball.color);
	for(var draw_text in settings.text) {
		DrawText(settings.text[draw_text]);
	}
}

function CalcMove(players, ball) {
	if(settings.controls.pl_right.up.pressed && players[PL_RIGHT].vect.y < cv.height - settings.slayer.y) {
		players[PL_RIGHT].vect.y += settings.slayer.movespeed;
	}
	if(settings.controls.pl_right.down.pressed && players[PL_RIGHT].vect.y > 0) {
		players[PL_RIGHT].vect.y -= settings.slayer.movespeed;
	}
	if(settings.controls.pl_left.up.pressed && players[PL_LEFT].vect.y < cv.height - settings.slayer.y) {
		players[PL_LEFT].vect.y += settings.slayer.movespeed;
	}
	if(settings.controls.pl_left.down.pressed && players[PL_LEFT].vect.y > 0) {
		players[PL_LEFT].vect.y -= settings.slayer.movespeed;
	}
	CalcPlayerCollision();
	CalcWallCollision();
	IncreaseBallSpeed();
	ball.vect = VectorAddition(ball.vect, ball.speed);
}

function CalcFrame() {
	if(!settings.paused) {
		CalcMove(players, ball);
	}
	DrawFrame(players, ball);
}

function InitEventListeners() {
	window.onkeydown = function(e) {
		if(e.which == KEY_ESC) {
			settings.paused = !settings.paused;
			if(!settings.paused) {
				delete(settings.text.game_paused);
			}else{
				settings.text.game_paused = new Text("Game Paused", cv.width / 2 - 60, cv.height / 2 - 4, "24px", "Calibri", "black");
			}
		}
		if(e.which == KEY_SPACE) {
			delete(settings.text.start_game);
			settings.paused = false;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_right.up.kc) {
			settings.controls.pl_right.up.pressed = true;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_right.down.kc) {
			settings.controls.pl_right.down.pressed = true;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_left.up.kc) {
			settings.controls.pl_left.up.pressed = true;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_left.down.kc) {
			settings.controls.pl_left.down.pressed = true;
		}
	}

	window.onkeyup = function(e) {
		if(String.fromCharCode(e.which) == settings.controls.pl_right.up.kc) {
			settings.controls.pl_right.up.pressed = false;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_right.down.kc) {
			settings.controls.pl_right.down.pressed = false;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_left.up.kc) {
			settings.controls.pl_left.up.pressed = false;
		}
		if(String.fromCharCode(e.which) == settings.controls.pl_left.down.kc) {
			settings.controls.pl_left.down.pressed = false;
		}
	}
}

function VectorAddition(vect0, vect1) {
	return new Vector2D(vect0.x + vect1.x, vect0.y + vect1.y);
}

function CalcWallCollision() {
	if(ball.vect.x <= ball.radius) {
		//  ball.speed.x *= -1;
		//  ball.vect.x += (ball.radius - ball.vect.x) + POS_CORR;
		players[PL_RIGHT].score++;
		InitNewRound();
	}
	if(ball.vect.x >= cv.width - ball.radius) {
		//  ball.speed.x *= -1;
		//  ball.vect.x -= ((cv.width - ball.radius) - ball.vect.x) + POS_CORR;
		players[PL_LEFT].score++;
		InitNewRound();
	}
	if(ball.vect.y <= ball.radius || ball.vect.y == Number.POSITIVE_INFINITY) {
		ball.speed.y *= -1;
		if(ball.vect.y != Number.POSITIVE_INFINITY) {
			ball.vect.y += (ball.radius - ball.vect.y) + POS_CORR;
		}else{
			ball.vect.y = ball.radius + POS_CORR;
		}
	}
	if(ball.vect.y >= cv.height - ball.radius || ball.vect.y == Number.NEGATIVE_INFINITY) {
		ball.speed.y *= -1;
		if(ball.vect.y != Number.NEGATIVE_INFINITY) {
			ball.vect.y -= ((cv.height - ball.radius) - ball.vect.y) + POS_CORR;
		}else{
			ball.vect.y = (cv.height - ball.radius) + POS_CORR;
		}
	}
}

function CalcPlayerCollision() {
	if((ball.vect.x <= ball.radius + settings.slayer.x || ball.vect.x == Number.NEGATIVE_INFINITY) && ball.vect.y - players[PL_LEFT].vect.y <= settings.slayer.y) {
		ball.speed.x *= -1;
		if(ball.vect.x != Number.NEGATIVE_INFINITY) {
			ball.vect.x += ((ball.radius + settings.slayer.x) - ball.vect.x) + POS_CORR;
		}else{
			ball.vect.x = ball.radius + settings.slayer.x + POS_CORR;
		}
	}
	if((ball.vect.x >= cv.width - ball.radius - settings.slayer.x || ball.vect.x == Number.POSITIVE_INFINITY) && ball.vect.y - players[PL_RIGHT].vect.y <= settings.slayer.y) {
		ball.speed.x *= -1;
		if(ball.vect.x != Number.POSITIVE_INFINITY) {
			ball.vect.x -= ((cv.width - (ball.radius + settings.slayer.x)) - ball.vect.x) + POS_CORR;
		}else{
			ball.vect.x = (cv.width - (ball.radius + settings.slayer.x)) + POS_CORR;
		}
	}
}

function UpdateScoreText() {
	settings.text.score.text = players[PL_LEFT].score + " : " + players[PL_RIGHT].score;
}

function IncreaseBallSpeed() {
	if(ball.speed.x < Math.abs(settings.ball.max_speed.x)) {
		ball.speed.x *= settings.ball.increase_speed;
		if(Math.abs(ball.speed.x) > settings.ball.max_speed.x) {
			ball.speed.x = settings.ball.max_speed.x * (ball.speed.x / Math.abs(ball.speed.x));
		}
	}
	if(ball.speed.y < Math.abs(settings.ball.max_speed.y)) {
		ball.speed.y *= settings.ball.increase_speed;
		if(Math.abs(ball.speed.x) > settings.ball.max_speed.x) {
			ball.speed.x = settings.ball.max_speed.x * (ball.speed.x / Math.abs(ball.speed.x));
		}
	}
}
