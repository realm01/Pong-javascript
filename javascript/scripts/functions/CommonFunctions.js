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
