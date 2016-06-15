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
