#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: PI = require(glsl-pi)

vec2 displace(vec4 i, vec4 c, vec2 uv, vec2 pos) {
	vec2 perlin = pos * frequency;
	float angle = snoise2(perlin) * 2.0 * PI + angle;

	float brightness = (i.r + i.b + i.g) / 3.0;
	float amp = mix(0.0, 0.5, brightness);

	return vec2(cos(angle), sin(angle));
}
