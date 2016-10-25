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

		dragDrop('body', (files) => this._validateImageAndEmit('load-source', files))
	}

	_validateImageAndEmit(eventName, files) {
		if (files.length == 1 && files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
			this.emit(eventName, files[0])
		} else {
			console.log('failed')
		}
	}

	// public
	loadImage(eventName) {
		$('#image-loader')
			.on('change', (e) => this._validateImageAndEmit(eventName, e.target.files))
			.trigger('click')
	}

	execute() {
		this.emit(...arguments)
	}
}


window.Commands = new Commands()
