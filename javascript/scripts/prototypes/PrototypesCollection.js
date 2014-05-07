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
