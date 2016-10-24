import 'jquery.transit'
import lerp from 'lerp'
import clamp from 'clamp'

import trackDragging from './track-dragging.js'

function mod(n, m) {
	return ((n % m) + m) % m
}

//------------------------------------------------------------------
// filters
Vue.filter('precision', function(value) {
	return parseFloat(value).toFixed(2)
})

Vue.filter('degrees', function(value) {
	return `${(value * 180 / Math.PI).toFixed(1)}°`
})

//------------------------------------------------------------------
// group

Vue.component('ctrl-group', {
	template: `
		<div class='ctrl__group'>
			<template v-for='p in params'>

				<template v-if='p.type == "dropdown"'>
					<ctrl-dropdown @change='onChange' :label='p.label' :options='p.options'></ctrl-dropdown>
				</template>

				<template v-if='p.type == "range"'>
					<ctrl-range @change='onChange' :label='p.label' :value.sync='p.value' :min='p.min' :max='p.max'></ctrl-range>
				</template>

				<template v-if='p.type == "offset"'>
					<ctrl-offset @change='onChange' :label='p.label' :value.sync='p.value' :width='p.width'></ctrl-offset>
				</template>

				<template v-if='p.type == "angle"'>
					<ctrl-angle @change='onChange' :label='p.label' :value.sync='p.value'></ctrl-angle>
				</template>

				<template v-if='p.type == "range2d"'>
					<ctrl-range2d @change='onChange' :label='p.label' :value.sync='p.value'></ctrl-range2d>
				</template>

				<template v-if='p.type == "offset2d"'>
					<ctrl-offset2d @change='onChange' :label='p.label' :value.sync='p.value'></ctrl-offset2d>
				</template>

				<template v-if='p.type == "random"'>
					<ctrl-random @change='onChange' :label='p.label' :value.sync='p.value'></ctrl-random>
				</template>

			</template>
		</div>
		`,

	props: {
		params: {
			type: Object,
			default: {}
		}
	},
	methods: {
		onChange() {
			this.$emit('change')
		}
	}
})
//------------------------------------------------------------------
// components

//------------------------------------------------------------------
Vue.component('ctrl-dropdown', {
	template: `
		<div class='ctrl__component ctrl__dropdown'>
			<label>{{label}}</label>
			<select>
				<option v-for='option in options'>{{option}}</option>
			</select>
		</div>`,
	props: {
		label: {type: String, default: 'DROPDOWN'},
		options: {type: Array, default: function() { return [] }}
	}
})

//------------------------------------------------------------------
Vue.component('ctrl-range', {
	template: `
		<div class='ctrl__component ctrl__range'>
			<label>{{label}}</label>
			<div class='container' @mousedown='onMousedown'>
				<div class='fill' :style='{transform: fillTransform}'></div>
				<div class='value'>{{value | precision}}</div>
			</div>
		</div>`,
	props: {
		label: {type: String, default: 'RANGE'},
		value: {type: Number, default: 0},
		min: {type: Number, default: 0},
		max: {type: Number, default: 1},
		step: {type: Number, default: 0.0001}
	},
	computed: {
		fillTransform: function() {
			return `scaleX(${this.value / (this.max - this.min)})`
		}
	},
	methods: {
		onMousedown() {
			let rect = this.$el.getBoundingClientRect()
			let w = rect.width
			let origin = {
				x: rect.left,
				y: rect.top
			}

			trackDragging({origin}, (x) => {
				this.value = clamp(lerp(this.min, this.max, x / w), this.min, this.max)
				this.$emit('change', this.value)
			})
		}
	}
})

//------------------------------------------------------------------
Vue.component('ctrl-offset', {
	template: `
		<div class='ctrl__component ctrl__offset'>
			<label>{{label}}</label>
			<div class='container' @mousedown='onMousedown'>
				<div class='grid' :style='{transform: gridTranslate}'></div>
				<div class='zero' :style='{transform: zeroTranslate}'></div>
				<div class='value'>{{value | precision}}</div>
			</div>
		</div>`,
	props: {
		label: {type: String, default: 'OFFSET'},
		value: {type: Number, default: 0},
		width: {type: Number, default: 2}
	},
	computed: {
		gridTranslate() {
			let w = this.$el.offsetWidth
			let x = mod(w * (this.value / this.width), 40)
			return `translateX(${x}px)`
		},
		zeroTranslate() {
			let w = this.$el.offsetWidth
			let x = w * (this.value / this.width)
			return `translateX(${x}px)`
		}
	},
	methods: {
		onMousedown() {
			let step = this.width /  this.$el.offsetWidth
			trackDragging({reset: true}, (x) => {
				this.value += x * step
				this.$emit('change')
			})
		}
	}
})

//------------------------------------------------------------------
Vue.component('ctrl-angle', {
	template: `
		<div class='ctrl__component ctrl__angle'>
			<label>{{label}}</label>
			<div class='container'>
				<div class='knob' @mousedown='onMousedown' :style='{transform: knobRotate}'>
					<div class='marker'></div>
				</div>
				<div class='value'>{{value | degrees}}</div>
			</div>
		</div>
		`,
	props: {
		label: {type: String, default: 'ANGLE'},
		value: {type: Number, default: 0}
	},
	computed: {
		knobRotate: function() {
			return `rotate(${-this.value / Math.PI * 180}deg )`
		}
	},
	methods: {
		onMousedown(e) {

			let rect = this.$el.getBoundingClientRect()
			let origin = {
				x: (rect.left + rect.right) / 2,
				y: (rect.top + rect.bottom) / 2
			}

			let initialAngle = -Math.atan2(e.pageY - origin.y, e.pageX - origin.x)
			let initialValue = this.value

			trackDragging({origin}, (x, y) => {
				let angle = -Math.atan2(y, x)
				this.value = (initialValue + (angle - initialAngle) + Math.PI * 2) % (Math.PI * 2)
				this.$emit('change')
			})
		}
	}
})

//------------------------------------------------------------------
Vue.component('ctrl-range2d', {
	template: `
		<div class='ctrl__component ctrl__range2d'>
			<label>{{label}}</label>
			<div class='value'>{{value.x | precision}}, {{value.y | precision}}</div>
			<div class='container' @mousedown='onMousedown($event)'>
				<div class='pad'>
					<div class='dot' :style='{top: uiTop, left: uiLeft}'></div>
					<div class='axis-x' :style='{top: uiTop}'></div>
					<div class='axis-y' :style='{left: uiLeft}'></div>
				</div>
			</div>
		</div>
		`,
	props: {
		label: {type: String, default: 'RANGE 2D'},
		value: {type: Object, default: function() {return {x: .5, y: .5}}}
	},
	computed: {
		uiTop: function() {
			return `${(1 - this.value.y) * 100}%`
		},
		uiLeft: function() {
			return `${this.value.x * 100}%`
		}
	},
	methods: {
		onMousedown(e) {

			let rect = e.target.getBoundingClientRect()
			let origin = {
				x: rect.left,
				y: rect.top
			}

			trackDragging({origin}, (x, y) => {
				this.value.x = clamp(x / rect.width, 0, 1)
				this.value.y = 1 - clamp(y / rect.height, 0, 1)
				this.$emit('change')
			})
		}
	}
})

//------------------------------------------------------------------
Vue.component('ctrl-offset2d', {
	template: `
		<div class='ctrl__component ctrl__offset2d'>
			<label>{{label}}</label>
			<div class='value'>{{value.x | precision}}, {{value.y | precision}}</div>
			<div class='container' @mousedown='onMousedown($event)'>
				<div class='pad' :style='{transform: gridTranslate}'>
				</div>
				<div class='axis-x' :style='{transform: axisXTranslate}'></div>
				<div class='axis-y' :style='{transform: axisYTranslate}'></div>
			</div>
		</div>
		`,
	props: {
		label: {type: String, default: 'OFFSET 2D'},
		value: {type: Object, default: function() {return {x: 0, y: 0}}}
	},
	computed: {
		backgroundPosition() {
			return `${this.value.x * 100}% ${this.value.y * 100}%`
		},
		gridTranslate() {
			let $pad = this.$el.children[2]
			let x = mod(this.value.x * $pad.offsetWidth / 2, 40)
			let y = mod(-this.value.y * $pad.offsetHeight / 2, 40)
			return `translate(${x}px, ${y}px)`
		},
		axisXTranslate() {
			let $pad = this.$el.children[2]
			let y = -this.value.y * $pad.offsetHeight / 2
			return `translateY(${y}px)`
		},
		axisYTranslate() {
			let $pad = this.$el.children[2]
			let y = this.value.x * $pad.offsetWidth / 2
			return `translateX(${y}px)`
		}
	},
	methods: {
		onMousedown() {

			let stepX = 1 / this.$el.children[2].offsetWidth * 2
			let stepY = -1 / this.$el.children[2].offsetHeight * 2

			trackDragging({reset: true}, (x, y) => {
				this.value.x += x * stepX
				this.value.y += y * stepY
				this.$emit('change')
			})
		}
	}
})

//------------------------------------------------------------------
Vue.component('ctrl-random', {
	template: `
		<div class='ctrl__component ctrl__random'>
			<label>{{label}}</label>
			<div class='container'>
				<input type='number' v-model='value'>
				<button @click='generate'></button>
			</div>
		</div>`,
	props: {
		label: {type: String, default: 'RANDOM'},
		value: {type: Number, default: 0}
	},
	computed: {
		fillTransform: function() {
			return `scaleX(${this.value / (this.max - this.min)})`
		}
	},
	methods: {
		generate() {
			this.value = Math.random()
			this.$emit('change')
		}
	}
})
