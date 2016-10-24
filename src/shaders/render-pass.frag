precision highp float;
precision highp int;

uniform sampler2D tex;
varying vec2 uv;

void main() {
	gl_FragColor = texture2D(tex, uv);
	// gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
