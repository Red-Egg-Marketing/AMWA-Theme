<?php

function base_build_times() {

	wp_enqueue_script( 'site-time' );

	$html = '<div class="time-wrapper">';
	$html .= '</div>';

	return $html;
}

add_shortcode( 'base_time_shortcode', 'base_build_times' );
