precision highp float;
precision highp int;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: PI = require(glsl-pi)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;
uniform float aspect;
varying vec2 uv;
varying vec2 pos;

uniform float frequency;
uniform float speed;
uniform float seed;
uniform float angle;

vec2 perlin2(vec2 pos) {
	return vec2(snoise2(pos), snoise2(pos + vec2(100.0)));
}

void main() {

	vec3 color = texture2D(originalTexture, uv).rgb;

	vec2 intensity = perlin2(pos + (seed * 100.0) * frequency);
	vec2 intensityOffset = perlin2(pos * frequency + vec2(0.0001));

	vec2 offset = normalize(intensity - intensityOffset) * speed;

	gl_FragColor = texture2D(prevTexture, uv + offset);
}
