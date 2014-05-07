var cv;
var cvtx;
var players = new Array(2);
var ball;
var frame_renderer;
var settings = {
	fps: 0,
	paused: true,
	slayer: {
		x: 20,
		y: 80,
		color: "blue",
        start_speed: 400.02,
        max_speed: 1600.02,
        increase_speed: 10.001
	},
	ball: {
        start_speed: new Vector2D(200.02, 200.02),
        max_speed: new Vector2D(800.02, 800.02),
		increase_speed: 10.001,
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
	text: {},
    frames: {
        frame_time_start: new Date(),
        frame_time_end: new Date(),
        frame_delta_time: 1.0
    },
    debug: {
        debugging: true,
        show_frame_informations: true
    }
};
