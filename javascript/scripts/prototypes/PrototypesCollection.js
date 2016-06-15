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

function Slayer(vect, speed, color, score) {
	this.vect = vect;
    this.speed = speed;
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
