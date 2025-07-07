<?php

function base_build_times() {

	wp_enqueue_script( 'site-time' );

	$html = '<div class="time-wrapper">';
	$html .= '</div>';

	return $html;
}

add_shortcode( 'base_time_shortcode', 'base_build_times' );


function amwa_get_closures( $atts = [] ) {

	$wporg_atts = shortcode_atts(
		array(
			'title' => 'Upcoming Museum Closures',
		), $atts
	);

	$title = $wporg_atts['title'];

	$current_date = current_time('timestamp', 1);

	$args = [
			'post_type' 		=> 'product',
			'posts_per_page' 	=> -1,
			'post_status'		=> 'publish',
			'order'				=> 'DESC',
			'meta_query'		=> [
				'relation' 		=> 'AND',
				[
					'key'			=> 'WooCommerceEventsExpireTimestamp',
					'compare'		=> '>=',
					'type'			=> 'NUMERIC',
					'value'			=> $current_date
				]
			],
			'tax_query' => [
					'relation' => 'AND',
				[
					'taxonomy' 	=> 'product_cat',
					'terms'		=> 'closures',
					'field'		=> 'slug'
				]
			],
			
	];

	$query = new WP_Query($args);
	$html = '';

	if ($query->have_posts()) {
		$html .= '<div class="block-wrapper closures">';
		$html .= '<h5>' . $title . '</h5>';
		$html .= '<div class="light-yellow content">';
		while($query->have_posts()) {
			$query->the_post();
			$title = get_the_title();
			$html .= '<p>' . $title . '<p>';
		}
		$html .= '</div>';
		$html .= '</div>';
		wp_reset_postdata();
	} else {
		$html .= '<div class="block-wrapper closures">';
		$html .= '<h5>' . $title . '</h5>';
		$html .= '<div class="light-yellow content">';
		$html .= '<p>No closures</p>';
		$html .= '</div>';
		$html .= '</div>';
	}

	return $html;
}


add_shortcode( 'amwa_closures_shortcode', 'amwa_get_closures' );

