<?php
/**
 * Providence functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package providence
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.5.3' );
}

if ( ! function_exists( 'amwa_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function amwa_theme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Providence, use a find and replace
		 * to change 'AMWA' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'AMWA', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in two locations.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'AMWA' ),
				'menu-2' => esc_html__( 'Secondary', 'AMWA' ),
				// 'menu-3' => esc_html__( 'Secondary - Column 2', 'AMWA' ),
				// 'menu-12' => esc_html__( 'Secondary/Footer - Column 1', 'AMWA' ),
				// 'menu-14' => esc_html__( 'Secondary/Footer - Column 2', 'AMWA' ),
				'menu-15' => esc_html__( 'Footer', 'AMWA' )
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'amwa_theme_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'amwa_theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function amwa_theme_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'amwa_theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'amwa_theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function amwa_theme_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'AMWA' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'AMWA' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'amwa_theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function amwa_theme_scripts() {
	global $post;

	wp_enqueue_style('AMWA-theme-fonts', 'https://fonts.googleapis.com/css2?family=Bona+Nova:ital,wght@0,400;0,700;1,400&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap', [], null);
	wp_enqueue_style( 'AMWA-theme-style', get_stylesheet_uri(), ['AMWA-theme-fonts' , 'wp-components'], _S_VERSION );
	wp_style_add_data( 'AMWA-theme-style', 'rtl', 'replace' );

	wp_enqueue_script( 'AMWA-theme-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION . date("U"), true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	 wp_register_script(
        'site-time',
        get_stylesheet_directory_uri() . '/js/time.js',
        ['jquery', 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-dom-ready', 'lodash' ],
        '1.1.7',
        true
    );


	 if (is_tax('product_cat', 'guided-tours')){
	 	wp_register_script(
        	'site-tickets',
        	get_stylesheet_directory_uri() . '/js/tickets.js',
        	['jquery', 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-dom-ready', 'lodash' ],
        	'1.1.7',
        	true
    	);

    	wp_enqueue_script( 'site-tickets' );
	 }

}

add_action( 'wp_enqueue_scripts', 'amwa_theme_scripts' );


function amwa_theme_browser_body_class($classes) {
        global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;
        if($is_lynx) $classes[] = 'lynx';
        elseif($is_gecko) $classes[] = 'gecko';
        elseif($is_opera) $classes[] = 'opera';
        elseif($is_NS4) $classes[] = 'ns4';
        elseif($is_safari) $classes[] = 'safari';
        elseif($is_chrome)  $classes[] = 'chrome'; 
        elseif($is_IE) {
                $classes[] = 'ie';
                if(preg_match('/MSIE ([0-9]+)([a-zA-Z0-9.]+)/', $_SERVER['HTTP_USER_AGENT'], $browser_version))
                $classes[] = 'ie'.$browser_version[1];
            	if (!is_admin()) {
            		wp_deregister_script('wp-main-js');
            		wp_enqueue_script('AMWA-theme-faq-id', get_template_directory_uri() . '/js/faq.js', [], 'v1', true);
            	}
        } else $classes[] = 'unknown';
        if($is_iphone) $classes[] = 'iphone';
        if ( stristr( $_SERVER['HTTP_USER_AGENT'],"mac") ) {
                 $classes[] = 'osx';
           } elseif ( stristr( $_SERVER['HTTP_USER_AGENT'],"linux") ) {
                 $classes[] = 'linux';
           } elseif ( stristr( $_SERVER['HTTP_USER_AGENT'],"windows") ) {
                 $classes[] = 'windows';
           }
        return $classes;
}
add_filter('body_class','amwa_theme_browser_body_class');



function amwa_login_logo() { ?>
    <style type="text/css">

        #login h1 a, .login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/AMWA-theme-white-logo.svg);
			height:195px;
			width:300px;
			background-size: 300px 195px;
			background-repeat: no-repeat;
        }
    </style>
<?php }


function amwa_add_woocommerce_support() {
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'amwa_add_woocommerce_support' );

/**
* Allow additional MIME types
* Use 'text/plain' instead of 'application/json' for JSON because of a current Wordpress core bug
*/

function add_upload_mimes( $types ) { 
	$types['json'] = 'text/plain';
	return $types;
}
add_filter( 'upload_mimes', 'add_upload_mimes' );


add_action( 'login_enqueue_scripts', 'amwa_login_logo' );


remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

remove_filter( 'woocommerce_before_shop_loop_item_title', ['FooEvents_Woo_Helper', 'display_product_date'], 50);

remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );

remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );

remove_action( 'woocommerce_shop_loop_header', 'woocommerce_product_taxonomy_archive_header' );

add_action('woocommerce_shop_loop_header', 'amwa_shop_header');


function amwa_shop_header() {
	if (is_shop()) {
		?>
		<header class="hero">
			<div class="block-wrapper">
				<div class="hero__inner">
					<div class="content-wrap">
						<div class="hero-block-content">
							<div class="hero-block-wrap">
								<h1>Museum Shop</h1>
							</div>
						</div>
					</div>
					<div class="hero-block-image">
						<div class="hero-block-image-wrap">
							<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/shop-header.jpg" />
						</div>
					</div>
				</div>
			</div>
		</header>
		<?php
	}
}



/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';


/**
 * Custom Blocks
 */
require get_template_directory() . '/support/blocks.php';


/**
 * Custom End Points
 */
require get_template_directory() . '/inc/custom-endpoints.php';


/**
 * Media
 */
require get_template_directory() . '/inc/media.php';



/**
 * Options 
 */
require get_template_directory() . '/inc/options.php';


/**
 * Custom Menu Walkter
 */
require get_template_directory() . '/inc/custom-walker.php';


/**
 * Post saving
 */
require get_template_directory() . '/inc/posts.php';



/**
 * Menu Functions
 */
require get_template_directory() . '/inc/menu-functions.php';


/**
 * Shortcodes
 */
require get_template_directory() . '/inc/shortcodes.php';



/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

