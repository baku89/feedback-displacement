import BasePass from './base-pass.js'
import _ from 'lodash'

/*

Contains optical flow texture.
Each pixel  represents direction of flow.

*/

export default class DisplacePass extends BasePass {

	constructor() {

		let baseUniforms = {
			originalTexture: {type: 't', value: null},
			prevTexture: {type: 't', value: null},
			aspect: {type: 'f', value: 1}
		}

		super({
			fragmentShader: require('./shaders/displace-pass.frag'),
			uniforms: baseUniforms
		})

		this.baseUniforms = baseUniforms

		this.enableDisplace = false

		this.prevRenderTarget = new THREE.WebGLRenderTarget()
		this.currentRenderTarget = new THREE.WebGLRenderTarget()
		this.texture = this.currentRenderTarget.texture

		this.passthruPass = new BasePass({
			fragmentShader: require('./shaders/passthru.frag'),
			uniforms: {
				texture: {type: 't', value: null}
			}
		})
	}

	changeProgram(code, uniforms) {

		this.uniforms = _.merge(this.baseUniforms, uniforms)

		let mat = new THREE.RawShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: this._material.vertexShader,
			fragmentShader: code
		})

		this.updateMaterial(mat)
	}

	render() {
		[this.prevRenderTarget, this.currentRenderTarget]
			= [this.currentRenderTarget, this.prevRenderTarget]

		this.uniforms.prevTexture.value = this.prevRenderTarget.texture
		super.render(this.currentRenderTarget)

		this.texture = this.currentRenderTarget.texture
	}

	reset(tex) {

		if (tex) {
			this.originalTexture = tex
			this.uniforms.originalTexture.value =tex
		}

		this.passthruPass.uniforms.texture.value = this.originalTexture
		this.passthruPass.render(this.currentRenderTarget)

		this.texture = this.currentRenderTarget.texture
	}

	setSize(w, h) {
		this.prevRenderTarget.setSize(w, h)
		this.currentRenderTarget.setSize(w, h)
		this.uniforms.aspect.value = h / w
	}
}
