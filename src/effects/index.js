module.exports = {

	'polar-perlin': {
		label: 'Polar Perlin',
		params: {
			frequency: {type: 'slider', label: 'FREQUENCY', value: 1, min: 0, max: 5},
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			seed:  {type: 'random', label: 'SEED', value: 0, min: 0, max: 100}
		}
	},

	'wind-map': {
		label: 'Wind Map',
		params: {
			frequency:  {type: 'slider', label: 'FREQUENCY', value: 1, min: 0, max: 3},
			fineness: {type: 'slider', label: 'FINENESS', value: 10, min: 0, max: 30},
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			seed:  {type: 'random', label: 'SEED', value: 0, min: 0, max: 100}
		}
	},

	'perlin-grad': {
		label: 'Perlin Grad',
		params: {
			frequency:  {type: 'slider', label: 'FREQUENCY', value: 1.25, min: 0, max: 5},
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			seed:  {type: 'random', label: 'SEED', value: 0, min: 0, max: 100}
		}
	},

	'marble': {
		label: 'Marble',
		params: {
			frequency: {type: 'slider', label: 'RANDOMNESS', value: 0.8, min: 0, max: 2},
			fineness: {type: 'slider', label: 'FINENESS', value: 36, min: 0, max: 100},
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			angle: {type: 'angle', label: 'ANGLE', value: 0.7853981634},
			seed: {type: 'random', label: 'SEED', value: 0}
		},
	},

	'color-dir': {
		label: 'Color Dir',
		params: {
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			angleOffset: {type: 'angle', label: 'ANGLE OFFSET', value: 0}
		}
	},

	'hair-whorl': {
		label: 'Hair Whorl',
		params: {
			frequency: {type: 'slider', label: 'FREQUENCY', value: 1, min: 0, max: 4},
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01},
			seed: {type: 'random', label: 'SEED', value: 0}
		}
	},

	'dir-lum': {
		label: 'Dir Lum',
		params: {
			angle: {type: 'angle', label: 'ANGLE', value: 0},
			speed: {type: 'slider', label: 'SPEED', value: 0.002, min: 0, max: 0.01}
		}
	}

}
