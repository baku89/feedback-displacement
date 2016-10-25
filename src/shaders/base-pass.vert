precision highp float;
precision highp int;

attribute vec2 vUv;
attribute vec3 position;

varying vec2 uv;

void main(void) {
	uv = vUv;
	gl_Position = vec4(position, 1.0);
}
