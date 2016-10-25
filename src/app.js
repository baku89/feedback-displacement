import Easel from './easel'
import ImageLoader from './image-loader'

import Effects from './effects'

import './directives'
import './ctrl'


export default class App extends Vue {

	constructor() {
		super({
			el: 'body',
			data: {
				effects: [
					{label: 'Polar Perlin', value:'polar-perlin'},
					{label: 'Dir Lum', value:'dir-lum'}
				],
				currentEffect: 'polar-perlin',
				params: {}
			}
		})

		this.easel = new Easel()

		this.changeEffect = this.changeEffect.bind(this)
		this.changeEffect()

		/*
		this.imageLoader = new ImageLoader()
		this.imageLoader.on('load', (texture) => {
			this.canvas.resetByTexture(texture)
		})
		*/
	}

	updateUniforms() {
		for (let key in this.uniforms) {
			this.uniforms[key].value = this.params[key].value
		}
		this.easel.updateUniforms(this.uniforms)
	}

	changeEffect() {
		console.log('change effect:', this, this.currentEffect)

		let effect = Effects[this.currentEffect]

		this.$set('params', effect.params)

		let uniforms = {}

		for (let key in this.params) {
			let p = this.params[key]
			let type, value

			if (p.type == 'range' || p.type == 'offset' || p.type == 'angle' || p.type == 'random') {
				type = 'f'
				value = p.value
			} else if (p.type == 'range2d' || p.type == 'offset2d') {
				type = 'v2'
				value = new THREE.Vector2(p.value.x, p.value.y)
			}

			uniforms[key] = {type, value}
		}

		this.uniforms = uniforms

		this.easel.changeEffect(effect.fragmentShader, uniforms)
	}

}
