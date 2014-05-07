function UpdateScoreText() {
	settings.text.score.text = players[PL_LEFT].score + " : " + players[PL_RIGHT].score;
}

function ResetPlayersSpeed() {
    players[PL_RIGHT].speed = settings.slayer.start_speed;
    players[PL_LEFT].speed = settings.slayer.start_speed;
}

function ResetPlayersVect() {
    var player_vect_y_new = cv.height / 2 - settings.slayer.y / 2;
    players[PL_RIGHT].vect.y = player_vect_y_new;
    players[PL_LEFT].vect.y = player_vect_y_new;
}

function ResetPlayersMovement() {
    ResetPlayersSpeed();
    ResetPlayersVect();
}
