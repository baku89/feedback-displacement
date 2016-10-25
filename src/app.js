import VueAsyncData from 'vue-async-data'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueAsyncData)
Vue.use(VueLocalStorage)

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
				currentEffect: '',
				params: {},
				ui: {
				}
			},
			localStorage: {
				currentEffect: {type: String, default: 'polar-perlin'},
				currentParams: {type: Object, default: {}}
			}
		})

		this.easel = new Easel()
		this.changeEffect = this.changeEffect.bind(this)

		this._loadEffects = this._loadEffects.bind(this)
		this._loadEffects()

		window.Commands.execute('load-source', './assets/default.jpg')

		window.Commands.on('reload-effects', this._loadEffects)
	}

	_loadEffects() {
		$.getJSON('./assets/effects.json', (data) => {
			this.effectsData = data

			let effectsList = _.map(this.effectsData, (e, key) => { return{label: e.label, value: key}})
			this.$set('effects', effectsList)

			this.currentEffect = this.$localStorage.get('currentEffect')
			console.log('load effect')
			this.changeEffect()


			// let defaultParams = this.effectsData[this.currentEffect].params
			// let savedParams = this.$localStorage.get('currentParams')

			// this.$set('params', _.merge(defaultParams, savedParams))
		})
	}

	updateUniforms() {
		for (let key in this.uniforms) {
			this.uniforms[key].value = this.params[key].value
		}
		this.$localStorage.set('currentParams', this.params)
		this.easel.updateUniforms(this.uniforms)
	}

	changeEffect() {
		console.log('change effect:', this.currentEffect)

		let effect = this.effectsData[this.currentEffect]

		this.$set('params', effect.params)
		this.$localStorage.set('currentEffect', this.currentEffect)

		let uniforms = {}

		for (let key in this.params) {
			let p = this.params[key]
			let type, value

			if (p.type.search(/range|offset|angle|random/) != -1) {
				type = 'f'
				value = p.value
			} else if (p.type.search(/hanni|range2d|offset2d/) != -1) {
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
		window.Commands.loadImage('load-source')
	}

	onClickSave() {
		window.Commands.execute('save-canvas')
	}

	onClickReset() {
		window.Commands.execute('reset-canvas')
	}

}
