import VueLocalStorage from 'vue-localstorage'
import queryString from 'query-string'

Vue.use(VueLocalStorage)

import Easel from './easel'
import TransformUniforms from './transform-uniforms.js'

import './commands'
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

			let query = queryString.parse(window.location.search)
			console.log(query)
			if (query.type && query.type in this.effectsData) {
				this.currentEffect = query.type
			} else {
				this.currentEffect = this.$localStorage.get('currentEffect')
			}

			this.changeEffect()

			let defaultParams = this.effectsData[this.currentEffect].params
			let savedParams = this.$localStorage.get('currentParams')

			let params = {}

			for (let key in defaultParams) {
				params[key] = defaultParams[key]
				if (key in savedParams && defaultParams[key].type == savedParams[key].type) {
					params[key].value = savedParams[key].value
				}
			}

			this.$set('params', params)
			this.updateUniforms()
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

		this.uniforms = TransformUniforms(this.params)
		this.easel.changeEffect(effect.fragmentShader, this.uniforms)
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
