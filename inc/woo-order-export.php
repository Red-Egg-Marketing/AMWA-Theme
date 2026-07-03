<?php
/**
 * Add "Product Categories" column to the Customer/Order/Coupon Export
 * "one row per item" order formats (Default and Legacy).
 *
 * Pulls the product_cat taxonomy terms for each line item's product,
 * since categories aren't stored as post meta and have no meta key.
 */

/**
 * Helper: check whether this export is a "one row per item" format,
 * compatible with both pre- and post-4.0 versions of the plugin.
 *
 * @param object $csv_generator the generator instance
 * @return bool true if this is a one row per item format
 */
function red_egg_csv_export_is_one_row_per_item( $csv_generator ) {

	if ( version_compare( wc_customer_order_csv_export()->get_version(), '4.0.0', '<' ) ) {
		// pre-4.0 compatibility
		return in_array( $csv_generator->order_format, [ 'default_one_row_per_item', 'legacy_one_row_per_item' ], true );
	}

	// post-4.0 (requires 4.0.3+) — order_format was replaced with format_definition
	return isset( $csv_generator->format_definition['row_type'] ) && 'item' === $csv_generator->format_definition['row_type'];
}

/**
 * Step 1: Add the item_categories header.
 *
 * @param array $column_headers the original column headers
 * @param object $csv_generator the generator instance
 * @return array the updated column headers
 */
function red_egg_csv_export_add_category_header( $column_headers, $csv_generator ) {

	if ( ! red_egg_csv_export_is_one_row_per_item( $csv_generator ) ) {
		return $column_headers;
	}

	$new_headers = [];

	foreach ( $column_headers as $key => $column ) {
		$new_headers[ $key ] = $column;

		// add item_categories right after item_sku, if it exists
		if ( 'item_sku' === $key ) {
			$new_headers['item_categories'] = 'Item Categories';
		}
	}

	// fallback: if item_sku wasn't found, just append it
	if ( ! isset( $new_headers['item_categories'] ) ) {
		$new_headers['item_categories'] = 'Item Categories';
	}

	return $new_headers;
}
add_filter( 'wc_customer_order_csv_export_order_headers', 'red_egg_csv_export_add_category_header', 10, 2 );

/**
 * Step 2: Attach category names to the line item data.
 *
 * @param array $line_item the original line item data
 * @param array $item WC order item data
 * @param WC_Product $product the product for this line item
 * @return array the updated line item data
 */
function red_egg_csv_export_add_category_to_line_item( $line_item, $item, $product ) {

	if ( ! $product instanceof WC_Product ) {
		$line_item['item_categories'] = '';
		return $line_item;
	}

	// use the parent product ID for variations, since categories live on the parent
	$product_id = $product->is_type( 'variation' ) ? $product->get_parent_id() : $product->get_id();

	$terms = get_the_terms( $product_id, 'product_cat' );

	if ( is_wp_error( $terms ) || empty( $terms ) ) {
		$line_item['item_categories'] = '';
	} else {
		$line_item['item_categories'] = implode( ', ', wp_list_pluck( $terms, 'name' ) );
	}

	return $line_item;
}
add_filter( 'wc_customer_order_export_csv_order_line_item', 'red_egg_csv_export_add_category_to_line_item', 10, 3 );

/**
 * Step 3: Map item_categories into the per-item CSV row.
 *
 * @param array $order_data the row data for this line item
 * @param array $item the line item data (includes item_categories from Step 2)
 * @return array the updated row data
 */
function red_egg_csv_export_add_category_to_row( $order_data, $item ) {
	$order_data['item_categories'] = $item['item_categories'] ?? '';
	return $order_data;
}
add_filter( 'wc_customer_order_csv_export_order_row_one_row_per_item', 'red_egg_csv_export_add_category_to_row', 10, 2 );