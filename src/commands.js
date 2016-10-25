import EventEmitter from 'eventemitter3'
import Mousetrap from 'mousetrap'

class Commands extends EventEmitter {

	constructor() {
		super()

		this._initKeybind()
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

	execute(name) {
		this.emit(name)
	}
}


window.Commands = new Commands()
