<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.6.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

/**
 * Hook: woocommerce_shop_loop_header.
 *
 * @since 8.6.0
 *
 * @hooked woocommerce_product_taxonomy_archive_header - 10
 */
do_action( 'woocommerce_shop_loop_header' );
?>
<div class="wrapper">
<?php

  if(!function_exists('wc_get_products')) {
    return;
  }

  $ordering              = WC()->query->get_catalog_ordering_args();
  $ordering['orderby']   = array_shift(explode(' ', $ordering['orderby']));
  $ordering['orderby']   = stristr($ordering['orderby'], 'price') ? 'meta_value_num' : $ordering['orderby'];
  $limit = 30;
  $paged = $GLOBALS['wp_query']->get( 'paged', 1 );

  if ($paged > 0) {
  	$offset = ($limit * $paged - $limit);
   } else {
   	$offset = 0;
   }

  

  if (is_shop()) {
    $cat_products         = wc_get_products(array(
    'stock_status'      => 'instock',
    'visibility'        => 'visible',
    'status'            => 'publish',
    'limit'             => $limit,
    'paginate'          => true,
    'offset'             => $offset,
    'return'            => 'ids',
    'orderby'           => $ordering['orderby'],
    'order'             => $ordering['order'],
    'tax_query'         => [
        [
            'taxonomy'      => 'product_cat',
            'field'         => 'term_id',
            'terms'         => array('31'),
            'operator'      => 'IN',
        ]
    ]
    ));
    
  } elseif(is_archive()) {
    $object = get_queried_object();
    $term_id = $object->term_id;
    $cat_products         = wc_get_products(array(
    'stock_status'      => 'instock',
    'visibility'        => 'visible',
    'status'            => 'publish',
    'limit'             => $limit,
    'paginate'          => true,
    'offset'            => $offset,
    'return'            => 'ids',
    'orderby'           => $ordering['orderby'],
    'order'             => $ordering['order'],
    'tax_query'         => [
        [
            'taxonomy'      => 'product_cat',
            'field'         => 'term_id',
            'terms'         => $term_id,
            'operator'      => 'IN',
        ]
    ]
    ));
  }


 wc_set_loop_prop('total', $cat_products->total);
 wc_set_loop_prop('total_pages', $cat_products->max_num_pages);

  if($cat_products) {
    do_action('woocommerce_before_shop_loop');

      echo '<div class="grid">';

      foreach($cat_products->products as $cat_product) {

        $post_object = get_post($cat_product);
        setup_postdata($GLOBALS['post'] =& $post_object);

        echo '<div '; wc_product_class( ' ', $cat_product ); echo '>'; 

            do_action( 'woocommerce_before_shop_loop_item' );
            do_action( 'woocommerce_before_shop_loop_item_title' );
            do_action( 'woocommerce_shop_loop_item_title' );
            do_action( 'woocommerce_after_shop_loop_item_title' );
            do_action( 'woocommerce_after_shop_loop_item' );

        echo '</div>';

      }
      wp_reset_postdata();

      echo '</div>';

    do_action('woocommerce_after_shop_loop');
  } else {
    do_action('woocommerce_no_products_found');
  }

?>
</div><!-- .wrapper -->
<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );


/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */
do_action( 'woocommerce_sidebar' );

get_footer( 'shop' );
