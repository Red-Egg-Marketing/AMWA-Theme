wp.domReady( () => {

	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'border-white',
		label: 'Border White',
		isDefault: false,
	});

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'solid-yellow',
		label: 'Solid Yellow',
		isDefault: true,
	});

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'yellow-arrow',
		label: 'Solid Yellow with Arrow',
		isDefault: false,
	});

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'green-arrow',
		label: 'Solid Green with Arrow',
		isDefault: false,
	});

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'orange-arrow',
		label: 'Solid Orange with Arrow',
		isDefault: false,
	});

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'teal-arrow',
		label: 'Solid Teal with Arrow',
		isDefault: false,
	});

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'purple-arrow',
		label: 'Solid Purple with Arrow',
		isDefault: false,
	});


});
