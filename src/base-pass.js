export default class BasePass {

	constructor(option) {

		this._scene = new THREE.Scene()

		// camera
		this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000)
		this._camera.position.set(0, 0, 10)
		this._scene.add(this._camera)

		this.uniforms = option.uniforms

		this._material = new THREE.RawShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: option.vertexShader || require('./shaders/base-pass.vert'),
			fragmentShader: option.fragmentShader
		})

		let geometry = new THREE.BufferGeometry()
		{
			let vertices = new Float32Array([
				-1, +1, 0,
				-1, -1, 0,
				+1, +1, 0,

				-1, -1, 0,
				+1, -1, 0,
				+1, +1, 0
			])

			let uvs = new Float32Array([
				0, 1,
				0, 0,
				1, 1,

				0, 0,
				1, 0,
				1, 1
			])

			geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3))
			geometry.addAttribute('vUv', new THREE.BufferAttribute(uvs, 2))
		}

		this._mesh = new THREE.Mesh(geometry, this._material)

		this._scene.add(this._mesh)
	}

	render(targetRenderer) {
		window.renderer.render(this._scene, this._camera, targetRenderer)
	}

	updateMaterial(mat) {
		this.uniforms = mat.uniforms
		this._mesh.material = mat
		mat.needsUpdate = true
	}
}
