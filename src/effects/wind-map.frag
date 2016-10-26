precision highp float;
precision highp int;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: PI = require(glsl-pi)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float frequency;
uniform float fineness;
uniform float speed;
uniform float angle;
uniform float seed;

uniform float aspect;

varying vec2 uv;
varying vec2 pos;

float brightness(vec3 color) {
	return (color.r + color.g + color.b) / 3.0;
}

vec2 base(float angle) {
	return vec2(cos(angle), sin(angle));
}

void main() {

	vec3 color = texture2D(originalTexture, uv).rgb;

	float angleWiggle = snoise2( (pos + seed) * frequency ) * PI * 2.0;

	float flowAngle = angle + angleWiggle * fineness;

	float amp = brightness(color) * speed;

	vec2 offset = base(flowAngle) * amp;

	gl_FragColor = texture2D(prevTexture, uv + offset);
}
