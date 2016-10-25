export default {
	'polar-perlin': {
		label: 'Polar Perlin',
		params: {
			frequency: {type: 'range', label: 'FREQUENCY', value: 2, min: 0, max: 10},
			speed: {type: 'range', label: 'SPEED', value: 0.001, min: 0, max: 0.1},
			angle: {type: 'angle', label: 'ANGLE', value: 0},
			offset: {type: 'offset2d', label: 'OFFSET', value: {x: 0, y: 0}}
		},
		fragmentShader: require('./polar-perlin.frag')
	},
	'dir-lum': {
		label: 'Dir Lum',
		params: {
			angle: {type: 'angle', label: 'ANGLE', value: 0}
		},
		fragmentShader: require('./dir-lum.frag')
	}
}
