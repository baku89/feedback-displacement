module.exports = {

	'polar-perlin': {
		label: 'Polar Perlin',
		params: {
			frequency: {type: 'range', label: 'FREQUENCY', value: 1, min: 0, max: 5},
			speed: {type: 'range', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			angle: {type: 'angle', label: 'ANGLE', value: 0},
			offset: {type: 'offset2d', label: 'OFFSET', value: {x: 0, y: 0}}
		}
	},

	'hair-whorl': {
		label: 'Hair Whorl',
		params: {
			frequency: {type: 'range', label: 'FREQUENCY', value: 1, min: 0, max: 4},
			speed: {type: 'range', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			seed: {type: 'random', label: 'SEED', value: 0}
		}
	},

	'marble': {
		label: 'Marble',
		params: {
			frequency: {type: 'range', label: 'RANDOMNESS', value: 0.6, min: 0, max: 2},
			marbleSize: {type: 'range', label: 'MARBLE SIZE', value: 40, min: 0, max: 100},
			speed: {type: 'range', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			angle: {type: 'angle', label: 'ANGLE', value: 0},
			seed: {type: 'random', label: 'SEED', value: 0}
		},
	},

	'dir-lum': {
		label: 'Dir Lum',
		params: {
			angle: {type: 'angle', label: 'ANGLE', value: 0},
			speed: {type: 'range', label: 'SPEED', value: 0.002, min: 0, max: 0.01}
		}
	}

}
