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

	vec2 perlin = uv * frequency + offset;
	float dispAngle = snoise2(perlin) * 2.0 * PI + angle;

	// float brightness = (i.r + i.b + i.g) / 3.0;
	// float amp = mix(0.0, 0.5, brightness);

	vec2 offset = vec2(cos(dispAngle), sin(dispAngle)) * speed;

	vec4 c = texture2D(prevTexture, uv + offset);

	gl_FragColor = c;
}
