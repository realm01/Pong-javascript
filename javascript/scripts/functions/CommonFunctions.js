function UpdateScoreText() {
	settings.text.score.text = players[PL_LEFT].score + " : " + players[PL_RIGHT].score;
}

function ResetPlayersSpeed() {
    players[PL_RIGHT].speed = settings.slayer.start_speed;
    players[PL_LEFT].speed = settings.slayer.start_speed;
}
