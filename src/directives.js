Vue.directive('wheel', {
	twoWay: true,
	bind() {
		let isMousedown = false

		$(this.el).on({
			'mousedown': () => {
				isMousedown = true
			},
			'mousemove': () => {
				if (isMousedown) {
					this.set({x: 10, y: 20})
				}
			}
		})

		$(window).on('mouseup', () => {
			isMousedown = false
			this.set({x: 0, y: 0})
		})
	}
})
