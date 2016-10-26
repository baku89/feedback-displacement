precision highp float;
precision highp int;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: PI = require(glsl-pi)
#pragma glslify: random = require(glsl-random)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float frequency;
uniform float speed;
uniform float seed;

uniform float aspect;

varying vec2 uv;
varying vec2 pos;

vec2 random2(float seed) {
	return vec2(
		random(vec2(seed, 0.0)),
		random(vec2(seed + 123.0, 0.0))
		);
}

float random1(float seed) {
	return random(vec2(seed * 431.34, 0.0));
}

vec2 base(float angle) {
	return vec2(cos(angle), sin(angle));
}

float brightness(vec4 color) {
	return (color.r + color.g + color.b) / 3.0;
}

void main() {

	vec4 oc = texture2D(originalTexture, uv);

	vec2 perlinSeed = pos * frequency + random2(seed);
	float angle = snoise2(perlinSeed) * 2.0 * PI + random1(seed);

	float bri = brightness(oc);
	float amp = mix(0.5, 1.9, bri);

	vec2 offset = base(angle) * speed * amp;

	gl_FragColor = texture2D(prevTexture, uv + offset);
}
