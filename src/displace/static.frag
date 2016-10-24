precision highp float;
precision highp int;

uniform sampler2D prevTexture;
uniform sampler2D originalTexture;

uniform float aspect; // height / width

varying vec2 uv;
varying vec2 pos;

void main() {

	vec2 pos = uv * vec2(1.0, aspect);
	vec4 c = texture2D(prevTexture, uv + vec2(0.001, 0.0));

	gl_FragColor = c;
}
