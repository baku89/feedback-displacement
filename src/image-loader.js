import dragDrop from 'drag-drop'
import EventEmitter from 'eventemitter3'

export default class ImageLoader extends EventEmitter {

	constructor() {
		super()

		dragDrop('.easel', (files) => {

			let file = files[0]
			let reader = new FileReader()
			// let data = null

			reader.addEventListener('load', () => {
				this.loader.load(reader.result, (texture) => {
					this.emit('load', texture)
				})
			})

			reader.readAsDataURL(file)
		})


		this.loader = new THREE.TextureLoader()

		this.loader.load('./assets/sample.png', (texture) => {
			this.emit('load', texture)
		})
	}


}
