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
