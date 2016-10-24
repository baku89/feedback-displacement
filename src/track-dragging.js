let mouseX, mouseY

export default function startTracking(option, onChange) {

	$(window).on({
		'mousemove': onMousemove,
		'mouseup': onMouseup
	})

	let originX, originY

	if (option.origin) {
		originX = option.origin.x
		originY = option.origin.y
	} else {
		originX = mouseX
		originY = mouseY
	}



	function onMousemove(e) {
		onChange(e.pageX - originX, e.pageY - originY)
		if (option.reset === true) {
			originX = e.pageX
			originY = e.pageY
		}
	}

	function onMouseup() {
		$(window).off({
			'mousemove': onMousemove,
			'mouseup': onMouseup
		})
	}
}

$(window).on('mousemove mousedown', function(e) {
	mouseX = e.pageX
	mouseY = e.pageY
})
