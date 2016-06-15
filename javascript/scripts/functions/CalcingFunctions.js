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

function CalcMove(players, ball) {
	if(settings.controls.pl_right.up.pressed && players[PL_RIGHT].vect.y < cv.height - settings.slayer.y) {
        players[PL_RIGHT].vect.y += players[PL_RIGHT].speed * settings.frames.frame_delta_time;
	}
	if(settings.controls.pl_right.down.pressed && players[PL_RIGHT].vect.y > 0) {
        players[PL_RIGHT].vect.y -= players[PL_RIGHT].speed * settings.frames.frame_delta_time;
	}
	if(settings.controls.pl_left.up.pressed && players[PL_LEFT].vect.y < cv.height - settings.slayer.y) {
        players[PL_LEFT].vect.y += players[PL_LEFT].speed * settings.frames.frame_delta_time;
	}
	if(settings.controls.pl_left.down.pressed && players[PL_LEFT].vect.y > 0) {
        players[PL_LEFT].vect.y -= players[PL_LEFT].speed * settings.frames.frame_delta_time;
	}
	CalcPlayerCollision();
	CalcWallCollision();
    IncreasePlayerSpeed();
	IncreaseBallSpeed();
	ball.vect = VectorAddition(ball.vect, new Vector2D(ball.speed.x * settings.frames.frame_delta_time, ball.speed.y * settings.frames.frame_delta_time));
}

function CalcFrame() {
    if(settings.debug.debugging) {
        if(settings.debug.show_frame_informations) {
            if(!settings.text.frame_informations) {
                settings.text.frame_informations = new Text("fps: " + 1000 / (settings.frames.frame_delta_time * 1000) + " fps_time: " + settings.frames.frame_delta_time * 1000 + " ms", cv.width / 2 - 48, cv.height - 18, "12px", "Calibri", "purple");
            }else{
                settings.text.frame_informations.text = "fps: " + 1000 / (settings.frames.frame_delta_time * 1000) + " fps_time: " + settings.frames.frame_delta_time * 1000 + " ms";
            }
        }
    }else{
        if(settings.text.frame_informations) {
            delete(settings.text.frame_informations);
        }
    }
	if(!settings.paused) {
		CalcMove(players, ball);
	}
	DrawFrame(players, ball);
    settings.frames.frame_time_end = new Date();
    var frame_delta_time = Math.abs(settings.frames.frame_time_start.getMilliseconds() - settings.frames.frame_time_end.getMilliseconds()) / 1000;
    if(frame_delta_time < 0.900) {
        settings.frames.frame_delta_time = frame_delta_time;
    }
    settings.frames.frame_time_start = new Date();
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
			ball.vect.y += 2 * ((ball.radius - ball.vect.y) + POS_CORR);
		}else{
			ball.vect.y = ball.radius + POS_CORR;
		}
	}
	if(ball.vect.y >= cv.height - ball.radius || ball.vect.y == Number.NEGATIVE_INFINITY) {
		ball.speed.y *= -1;
		if(ball.vect.y != Number.NEGATIVE_INFINITY) {
			ball.vect.y -= 2 * ((ball.vect.y - cv.height) + ball.radius + POS_CORR);
		}else{
			ball.vect.y = (cv.height - ball.radius) + POS_CORR;
		}
	}
}

function CalcPlayerCollision() {
	if((ball.vect.x <= ball.radius + settings.slayer.x || ball.vect.x == Number.NEGATIVE_INFINITY) && ball.vect.y - players[PL_LEFT].vect.y <= settings.slayer.y && ball.vect.y - players[PL_LEFT].vect.y >= 0) {
		ball.speed.x *= -1;
		if(ball.vect.x != Number.NEGATIVE_INFINITY) {
			ball.vect.x += 2 * (((ball.radius + settings.slayer.x) - ball.vect.x) + POS_CORR);
		}else{
			ball.vect.x = ball.radius + settings.slayer.x + POS_CORR;
		}
	}
	if((ball.vect.x >= cv.width - ball.radius - settings.slayer.x || ball.vect.x == Number.POSITIVE_INFINITY) && ball.vect.y - players[PL_RIGHT].vect.y <= settings.slayer.y && ball.vect.y - players[PL_RIGHT].vect.y >= 0) {
		ball.speed.x *= -1;
		if(ball.vect.x != Number.POSITIVE_INFINITY) {
			ball.vect.x -= 2 * ((ball.vect.x - cv.width) + ball.radius + settings.slayer.x + POS_CORR);
		}else{
			ball.vect.x = (cv.width - (ball.radius + settings.slayer.x)) + POS_CORR;
		}
	}
}

function IncreaseBallSpeed() {
	if(ball.speed.x < Math.abs(settings.ball.max_speed.x)) {
		ball.speed.x += (settings.ball.increase_speed * settings.frames.frame_delta_time) * (ball.speed.x / Math.abs(ball.speed.x));
		if(Math.abs(ball.speed.x) > settings.ball.max_speed.x) {
			ball.speed.x = settings.ball.max_speed.x * (ball.speed.x / Math.abs(ball.speed.x));
		}
	}
	if(ball.speed.y < Math.abs(settings.ball.max_speed.y)) {
		ball.speed.y += (settings.ball.increase_speed * settings.frames.frame_delta_time) * (ball.speed.y / Math.abs(ball.speed.y));
		if(Math.abs(ball.speed.y) > settings.ball.max_speed.y) {
			ball.speed.y = settings.ball.max_speed.y * (ball.speed.y / Math.abs(ball.speed.y));
		}
	}
}

function IncreasePlayerSpeed() {
    players[PL_RIGHT].speed += (settings.slayer.increase_speed * settings.frames.frame_delta_time) * (players[PL_RIGHT].speed / Math.abs(players[PL_RIGHT].speed));
    players[PL_LEFT].speed += (settings.slayer.increase_speed * settings.frames.frame_delta_time) * (players[PL_LEFT].speed / Math.abs(players[PL_LEFT].speed));
}

function CalcRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
