import EventEmitter from 'eventemitter3'


class Ticker extends EventEmitter {

	constructor() {
		super()

		this.update = this.update.bind(this)
		this.prev = 0
		this.now = 0
	}

	togglePlay() {
		if (this.requestId) {
			this.stop()
		} else {
			this.start()
		}
	}

	start() {
		// console.log('ticker start')
		this.update()
	}

	stop() {
		// console.log('ticker stop')
		cancelAnimationFrame(this.requestId)
		this.requestId = undefined
	}

	update() {
		this.requestId = requestAnimationFrame(this.update)
		this.emit('update')
	}

}


export default new Ticker()
