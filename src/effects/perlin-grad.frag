precision highp float;
precision highp int;

#pragma glslify: PI = require(glsl-pi)
#pragma glslify: noise = require(glsl-noise/simplex/2d)
#pragma glslify: random = require(glsl-random)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float frequency;
uniform float seed;
uniform float speed;

uniform float aspect;

varying vec2 pos;
varying vec2 uv;

float brightness(vec4 color) {
	return (color.r + color.g + color.b) / 3.0;
}

vec2 base(float angle) {
	return vec2(cos(angle), sin(angle));
}

vec2 random2(float seed) {
	return vec2(
		random(vec2(seed, 0.0)),
		random(vec2(seed + 123.0, 0.0))
		);
}

vec3 prev(vec2 offset) {
	return texture2D(prevTexture, uv + offset).rgb;
}

void main() {

	vec2 pt = pos * frequency + random2(seed);
	float ptn = noise(pt);
	vec2 dir = vec2(
		noise(pt + vec2(0.001, 0.0)) - ptn,
		noise(pt + vec2(0.0, 0.001)) - ptn
		);

	dir = normalize(dir);

	float bri = brightness(texture2D(prevTexture, uv));

	vec2 offset = dir * speed * bri;

	vec3 a = prev(offset * 0.333) * vec3(0.1, 0.3, 0.3);
	vec3 b = prev(offset * 0.666) * vec3(0.6, 0.2, 0.4);
	vec3 c = prev(offset        ) * vec3(0.3, 0.5, 0.3);

	gl_FragColor = vec4(a + b + c, 1.0);
}
