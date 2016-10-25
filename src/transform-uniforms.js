export default function(params) {
	let uniforms = {}

	for (let key in params) {
		let p = params[key]
		let type, value

		if (p.type.search(/slider|offset|angle|random/) != -1) {
			type = 'f'
			value = p.value
		} else if (p.type.search(/slider2d|offset2d/) != -1) {
			type = 'v2'
			value = new THREE.Vector2(p.value.x, p.value.y)
		}

		uniforms[key] = {type, value}
	}

	return uniforms
}
