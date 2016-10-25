const exec = require('child_process').exec
const fs = require('fs')
const _ = require('lodash')

var Effects = require('./src/effects')

var remaining = Object.keys(Effects).length

_.forEach(Effects, (effects, name) => {

	exec(`glslify ./src/effects/${name}.frag`, (err, stdout) => {
		Effects[name].fragmentShader = stdout
		console.log(`Compiled ${name}`)

		if (--remaining == 0) {
			saveAndExit()
		}
	})

})

function saveAndExit() {
	fs.writeFileSync('./public/assets/effects.json', JSON.stringify(Effects))
}
