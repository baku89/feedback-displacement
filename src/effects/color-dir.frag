precision highp float;
precision highp int;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: PI = require(glsl-pi)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;
uniform float aspect;

uniform float speed;
uniform float angleOffset;

varying vec2 uv;
varying vec2 pos;

void main() {

	vec3 pc = texture2D(prevTexture, uv).rgb;
	vec3 oc = texture2D(originalTexture, uv).rgb;

	float angle = (oc.r - oc.g + angleOffset) * PI * 4.0;

	float bri = (oc.r + oc.g + oc.b) / 3.0;
	float amp = mix(0.1, 1.0, bri) * speed;

	vec2 offset = vec2(cos(angle), sin(angle)) * amp;

	gl_FragColor = texture2D(prevTexture, uv + offset);
}
