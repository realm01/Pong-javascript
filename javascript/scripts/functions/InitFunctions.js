/*
* Created by: Anastassios Martakos
*
* Copyright 2016 Anastassios Martakos
*
* This program is free software: you can redistribute it and/or modify it
* under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*/

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
	players[PL_LEFT] = new Slayer(new Vector2D(0, cv.height / 2 - settings.slayer.y / 2), settings.slayer.start_speed, settings.slayer.color, 0);
	players[PL_RIGHT] = new Slayer(new Vector2D(cv.width - settings.slayer.x, cv.height / 2 - settings.slayer.y / 2), settings.slayer.start_speed, settings.slayer.color, 0);
}

function InitBall() {
	ball = null;
    var start_speed_x = 0;
    var start_speed_y = 0;
    while(start_speed_x > -80 && start_speed_x < 80) {
        start_speed_x = CalcRandomNumber(-settings.ball.start_speed.x, settings.ball.start_speed.x);
    }
    while(start_speed_y > -80 && start_speed_y < 80) {
        start_speed_y = CalcRandomNumber(-settings.ball.start_speed.y, settings.ball.start_speed.y);
    }
	ball = new Ball(new Vector2D(cv.width / 2, cv.height / 2), 20, new Vector2D(start_speed_x, start_speed_y), settings.ball.color);
}

function InitNewRound() {
	settings.paused = true;
	UpdateScoreText();
    ResetPlayersMovement();
	InitBall();
	settings.text.start_game = new Text("Press Space to Start", cv.width / 2 - 100, cv.height / 2 + 4, "24px", "Calibri", "black");
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
