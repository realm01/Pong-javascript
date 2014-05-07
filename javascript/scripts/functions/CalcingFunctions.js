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
