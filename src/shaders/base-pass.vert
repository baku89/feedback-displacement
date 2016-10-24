precision highp float;
precision highp int;

attribute vec2 uUv;
attribute vec3 position;

varying vec2 uv;

void main(void) {
	uv = vec2(uUv.x, uUv.y);
	gl_Position = vec4(position, 1.0);
}
