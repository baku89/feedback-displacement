import EventEmitter from 'eventemitter3'
import Mousetrap from 'mousetrap'
import dragDrop from 'drag-drop'

class Commands extends EventEmitter {

	constructor() {
		super()

		this._initKeybind()
		this._initDragDrop()
	}

	_initKeybind() {
		Mousetrap.bind('esc', () => {
			this.emit('reset-canvas')
		})

		Mousetrap.bind('command+s', () => {
			this.emit('save-canvas')
			return false
		})
	}

	_initDragDrop() {

		dragDrop('body', (files) => {
			console.log(files)

			if (files.length == 1 && files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
				this.emit('load-source', files[0])
			}
		})

	}

	execute() {
		this.emit(...arguments)
	}
}


window.Commands = new Commands()
