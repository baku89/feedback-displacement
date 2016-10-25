import 'jquery.transit'
import Mousetrap from 'mousetrap'
import FileSaver from 'filesaverjs'

import DisplacePass from './displace-pass'
import BasePass from './base-pass'

import Ticker from './ticker'

export default class Easel {

	constructor() {

		this.$canvas = $('#canvas')
		this.$easel = $('.easel')
		this.$wrapper = $('.canvas-wrapper')

		this.$cursor = $('.brush-cursor')

		// create renderer
		window.renderer = new THREE.WebGLRenderer({
			canvas: this.$canvas[0],
			preserveDrawingBuffer: true

		})
		window.renderer.setClearColor(0x000000)

		// init passes
		this.displacePass = new DisplacePass()

		// this.changeEffect(
		// 	require('./shaders/displace-pass.frag'),
		// 	{
		// 		frequency: {type: 'f', value: 0},
		// 		speed: {type: 'f', value: 0},
		// 		angle: {type: 'f', value: 0},
		// 		offset: {type: 'v2', value: new THREE.Vector2(0)}
		// 	}
		// )

		new THREE.TextureLoader().load('./assets/sample.png', (tex) => {
			this.displacePass.reset(tex)
			this._update()
		})

		this.renderPass = new BasePass({
			fragmentShader: require('./shaders/render-pass.frag'),
			uniforms: {
				tex: {type: 't', value: this.displacePass.texture}
			}
		})

		this._setResolution(1024, 1024)

		Ticker.on('update', this._update.bind(this))
		this._update()

		$(window).on('resize', this._updateTransform.bind(this))
		this._updateTransform()

		this.$canvas.on({
			'mousedown': () => Ticker.start(),
			'mouseup': () => Ticker.stop()
		})

		this.$easel.on({
			'mouseenter': this._showCursor.bind(this),
			'mouseleave': this._hideCursor.bind(this),
			'mousemove': this._moveCursor.bind(this)
		})

		this._setupKeybind()
	}

	changeEffect(fragmentShader, uniforms) {
		this.displacePass.changeProgram(fragmentShader, uniforms)
	}

	updateUniforms(_uniforms) {
		let uniforms = this.displacePass.uniforms

		for (let key in _uniforms) {
			if (uniforms[key].type.search(/f|i/) != -1) {
				uniforms[key].value = _uniforms[key].value
			} else if (uniforms[key].type.search('v2') != -1) {
				uniforms[key].value.x = _uniforms[key].value.x
				uniforms[key].value.y = _uniforms[key].value.y
			} else if (uniforms[key].type.search('v3') != -1) {
				uniforms[key].value.x = _uniforms[key].value.x
				uniforms[key].value.y = _uniforms[key].value.y
				uniforms[key].value.z = _uniforms[key].value.z
			}
		}
	}

	//----------------------------------------
	// private

	_update() {
		this.displacePass.render()
		this.renderPass.render()
		// console.log('update')
	}

	// init
	_setupKeybind() {
		Mousetrap.bind('esc', () => {
			this.displacePass.reset()
			this._update()
		})

		Mousetrap.bind('command+s', () => {
			this.saveAsImage()
			return false
		})
	}

	// event

	_showCursor() {
		this.$cursor.addClass('show')
	}

	_hideCursor() {
		this.$cursor.removeClass('show')
	}

	_moveCursor(e) {
		this.$cursor.css({
			x: e.pageX - this.$easel[0].offsetLeft,
			y: e.pageY - this.$easel[0].offsetTop
		})
	}

	_updateTransform() {
		let sw = this.$wrapper.width() / this.width
		let sh = this.$wrapper.height() / this.height

		let scale = Math.min(sw, sh)
		let x = (this.$wrapper.width() - this.width * scale) / 2
		let y = (this.$wrapper.height() - this.height * scale) / 2

		this.$canvas.css({x, y, scale})
	}

	_setResolution(w, h) {
		this.width = w
		this.height = h
		this.displacePass.setSize(this.width, this.height)
		window.renderer.setSize(this.width, this.height)
	}

	//----------------------------------------
	// public

	changeProgram(code) {
		this.displacePass.changeProgram(code)
	}

	saveAsImage() {
		this.$canvas[0].toBlob((blob) => {
			FileSaver.saveAs(blob, 'image.png')
		})
	}

	setOriginalTexture(tex) {
		this.originalTexture = tex
		this._setResolution(tex.image.width, tex.image.height)
		this.displacePass.reset(this.originalTexture)
	}
}
