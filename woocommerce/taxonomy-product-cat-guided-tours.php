<?php
/**
 * The Template for displaying products in a product category. Simply includes the archive template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/taxonomy-product-cat.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     4.7.0
 */

$term = get_queried_object();


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


get_header( 'shop' );


?>

<div class="site-main">
<div class="wrapper">
	<div class="col col-image">
	<?php 
		$thumb_id = get_term_meta( $term->term_id, 'thumbnail_id', true );
		$image = wp_get_attachment_image( $thumb_id, 'full' );
		echo $image;
	?>
	</div>
	<div class="col">
	<?php
	/**
	 * Hook: woocommerce_shop_loop_header.
	 *
	 * @since 8.6.0
	 *
	 * @hooked woocommerce_product_taxonomy_archive_header - 10
	 */
	do_action( 'woocommerce_shop_loop_header' );

	?>
	<div id="guided-tours" data-tax="<?php echo $term->term_id ?>">

	</div>
	</div>
</div>
</div>
<?php

/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */
do_action( 'woocommerce_sidebar' );

get_footer( 'shop' );