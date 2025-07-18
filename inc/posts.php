<?php

add_action('save_post_videos', 'amwa_theme_update_video', 10, 3);

function amwa_theme_update_video() {
	global $post;
	// required libraries for media_sideload_image
	require_once(ABSPATH . 'wp-admin/includes/file.php');
	require_once(ABSPATH . 'wp-admin/includes/media.php');
	require_once(ABSPATH . 'wp-admin/includes/image.php');

	$id = $post->ID;

	$video = get_field('featured_video', $id);

	preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $video, $matches);

	$video_id = $matches[1];

	// Get Thumbnail
	$file_headers = get_headers( 'http://img.youtube.com/vi/' . $video_id . '/maxresdefault.jpg' );
	$is_404 = $file_headers[0] == 'HTTP/1.0 404 Not Found' || false !== strpos( $file_headers[0], '404 Not Found' );
	$video_thumbnail_url = $is_404 ? 'http://img.youtube.com/vi/' . $youtube_id . '/maxresdefault.jpg' : 'http://img.youtube.com/vi/' . $video_id . '/hqdefault.jpg';


	// load the image
	$result = media_sideload_image($video_thumbnail_url, $id);

	$attachments = get_posts(array('numberposts' => '1', 'post_parent' => $id, 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => 'ASC'));

	if(sizeof($attachments) > 0 && has_post_thumbnail($id) == false){
	    // set image as the post thumbnail
	    set_post_thumbnail($id, $attachments[0]->ID);
	}
}


function lesson_register_template() {
    $post_type_object = get_post_type_object( 'lesson' );
    $post_type_object->template = [
        ['amwa-theme-block/anchor-links'],
        [
        	'core/heading', 
        	[
        		'placeholder' 	=> 'Lesson Header',
        		'level' 		=> 1
        	]	
        ],
        ['amwa-theme-block/images-columns'],
        ['amwa-theme-block/text-section'],
        ['amwa-theme-block/portraits'],
        ['amwa-theme-block/text-section'],
        ['amwa-theme-block/text-section']
    ];
}
add_action( 'init', 'lesson_register_template' );


// attach category image for guided tours and self guided tours
add_action( 'publish_product', 'attach_category_image_as_featured_image', 10, 2 );

function attach_category_image_as_featured_image( $post_id, $post ) {
    // Bail if there is already a post thumbnail set.
    $current_post_thumbnail = get_post_thumbnail_id( $post_id );

    if ( false != $current_post_thumbnail ) {
        return;
    }

	//check which categories are set
    if (has_term('guided-tour', 'product_cat', $post_id)) {
    	$guided = get_term_by('slug', 'guided-tour', 'product_cat');
    	$thumb_id = get_term_meta($guided->term_id, 'thumbnail_id', true);
    	set_post_thumbnail($post_id, $thumb_id);
    } else if (has_term('self-guided-tours', 'product_cat', $post_id)) {
    	$self = get_term_by('slug', 'self-guided-tours', 'product_cat');
    	$thumb_id = get_term_meta($self->term_id, 'thumbnail_id', true);
    	set_post_thumbnail($post_id, $thumb_id);
    } else if (has_term('puzzlin-art', 'product_cat', $post_id)) {
    	$self = get_term_by('slug', 'puzzlin-art', 'product_cat');
    	$thumb_id = get_term_meta($self->term_id, 'thumbnail_id', true);
    	set_post_thumbnail($post_id, $thumb_id);
    }
}

?>