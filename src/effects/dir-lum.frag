precision highp float;
precision highp int;

#pragma glslify: PI = require(glsl-pi)

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float angle;
uniform float speed;

uniform float aspect;

varying vec2 uv;

float brightness(vec4 color) {
	return (color.r + color.g + color.b) / 3.0;
}

void main() {


	float bri = brightness(texture2D(prevTexture, uv));

	vec2 offset = vec2(cos(angle + PI), sin(angle + PI)) * speed * (1.0 - bri);


	vec4 c = texture2D(prevTexture, uv + offset);

	gl_FragColor = c;
}
