precision highp float;
precision highp int;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: PI = require(glsl-pi)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float frequency;
uniform float marbleSize;
uniform float speed;
uniform float seed;
uniform float angle;

uniform float aspect;

varying vec2 uv;
varying vec2 pos;

float brightness(vec3 color) {
	return (color.r + color.g + color.b) / 3.0;
}


void main() {

	vec3 color = texture2D(originalTexture, uv).rgb;

	float angleWiggle = snoise2( (pos + seed) * frequency ) * PI * 2.0;

	float flowAngle = angleWiggle + (cos(angle) * pos.x + sin(angle) * pos.y) * marbleSize;

	float amp = brightness(color) * speed / 1.2;

	vec2 offset = vec2(cos(flowAngle), sin(flowAngle)) * amp;

	gl_FragColor = texture2D(prevTexture, uv + offset);
}
