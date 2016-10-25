import VueAsyncData from 'vue-async-data'

Vue.use(VueAsyncData)

import Easel from './easel'
import ImageLoader from './image-loader'

import './commands'
import './directives'
import './ctrl'

export default class App extends Vue {

	constructor() {
		super({
			el: 'body',
			data: {
				effects: [],
				currentEffect: 'polar-perlin',
				params: {},
				ui: {
				}
			},
			asyncData: (resolve, reject) => {
				
				$.getJSON('./assets/effects.json', (data) => {
					this.effectsData = data

					resolve({
						effects: _.map(this.effectsData, (e, key) => { return{label: e.label, value: key}}),
						currentEffect: 'polar-perlin'
					})

					this.changeEffect()
				})
			}
		})

		this.easel = new Easel()

		this.changeEffect = this.changeEffect.bind(this)

		window.Commands.execute('load-source', './assets/default.jpg')
	}

	updateUniforms() {
		for (let key in this.uniforms) {
			this.uniforms[key].value = this.params[key].value
		}
		this.easel.updateUniforms(this.uniforms)
	}

	changeEffect() {
		console.log('change effect:', this.currentEffect)

		let effect = this.effectsData[this.currentEffect]

		this.$set('params', effect.params)

		let uniforms = {}

		for (let key in this.params) {
			let p = this.params[key]
			let type, value

			if (p.type.search(/range|offset|angle|random/) != -1) {
				type = 'f'
				value = p.value
			} else if (p.type.search(/range2d|offset2d/) != -1) {
				type = 'v2'
				value = new THREE.Vector2(p.value.x, p.value.y)
			}

			uniforms[key] = {type, value}
		}

		this.uniforms = uniforms

		this.easel.changeEffect(effect.fragmentShader, uniforms)
	}

	// events
	onClickLoad() {
		window.Commands.execute('load-source')
	}

	onClickSave() {
		window.Commands.execute('save-canvas')
	}

	onClickReset() {
		window.Commands.execute('reset-canvas')
	}

}
