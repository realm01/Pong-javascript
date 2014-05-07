var cv;
var cvtx;
var players = new Array(2);
var ball;
var frame_renderer;
var settings = {
	fps: 60,
	paused: true,
	slayer: {
		x: 20,
		y: 80,
		color: "blue",
        start_speed: 4.02,
        max_speed: 16.02,
        increase_speed: 1.001
	},
	ball: {
        start_speed: new Vector2D(2.02, 2.02),
        max_speed: new Vector2D(8.02, 8.02),
		increase_speed: 1.001,
		color: "green"
	},
	controls: {
		pl_right: {
			up: { kc: "L", pressed: false },
			down: { kc: "O", pressed: false },
		},
		pl_left: {
			up: { kc: "A", pressed: false },
			down: { kc: "Q", pressed: false },
		}
	},
	text: {}
};
