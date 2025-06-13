<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package paint_denver
 */

$id = get_the_id();


?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php do_action('before_collections_content'); ?>

	<div class="post-content">

		<?php

		amwa_parse_collections_blocks();
		
		?>
	</div><!-- .post-content -->
	<?php 
		get_template_part( 'template-parts/footer-post');
	?>
</article><!-- #post-<?php the_ID(); ?> -->
