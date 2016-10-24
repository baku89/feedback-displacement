export default [
	{
		name: 'Static',
		uniforms: [
			{type: 'range', name: 'intensity', label:'INTENSITY'}
		],
		code: require('./static.frag')
	}
]
