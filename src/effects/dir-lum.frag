precision highp float;
precision highp int;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: PI = require(glsl-pi)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float frequency;
uniform float speed;
uniform float seed;
uniform float angle;
uniform vec2 offset;

uniform float aspect;

varying vec2 uv;


void main() {

	vec2 offset = vec2(cos(angle), sin(angle)) * speed;

	vec4 c = texture2D(prevTexture, uv + offset);

	gl_FragColor = c;
}
