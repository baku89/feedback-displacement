import Stats from 'stats.js'

import Easel from './easel'
import ImageLoader from './image-loader'
import './directives'

import './ctrl'

const DEBUG = true

export default class App extends Vue {

	constructor() {
		super({
			el: 'body',
			data: {
				programs: ['One', 'Two', 'Three'],
				uniformParams: {
					frequency: {type: 'range', label: 'FREQUENCY', value: 2, min: 0, max: 10},
					speed: {type: 'range', label: 'SPEED', value: 0.001, min: 0, max: 0.1},
					angle: {type: 'angle', label: 'ANGLE', value: 0},
					offset: {type: 'offset2d', label: 'OFFSET', value: {x: 0, y: 0}}
				}
			}
		})

		if (DEBUG) {
			this.stats = new Stats()
			this.stats.setMode(0)
			this.stats.domElement.style.position = 'absolute'
			this.stats.domElement.style.left = 'auto'
			this.stats.domElement.style.right = '0px'
			this.stats.domElement.style.bottom = '0px'
			this.stats.domElement.style.top = 'auto'
			this.stats.domElement.style.background = 'transparent'
			this.stats.domElement.style.color = 'black'
			document.body.appendChild( this.stats.domElement )
		}

		/*
		this.imageLoader = new ImageLoader()
		this.imageLoader.on('load', (texture) => {
			this.canvas.resetByTexture(texture)
		})
		*/

		this.easel = new Easel()

		// this._onChangeFlowType()
		// this._onChangeFlowParameter()
		//


	}

	/*
	_initKeybind() {
	}
	*/

	updateUniforms() {
		let uniforms = this.uniformParams

		this.easel.updateUniforms({
			frequency: uniforms.frequency.value,
			speed: uniforms.speed.value,
			angle: uniforms.angle.value,
			offset: uniforms.offset.value
		})


	}

	/*
	_onChangeCode() {
		this.canvas.changeCode( this.$data.programs[ this.$data.programName ].code )
	}

	_onChangeFlowParameter() {
		this.canvas.flowPass.frequency = this.$data.frequency
		this.canvas.flowPass.speed = this.$data.speed
		this.canvas.flowPass.angle = radians(this.$data.angle)
	}*/

}
