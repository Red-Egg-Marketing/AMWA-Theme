<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package providence
 */



$fixed_nav = false;

if (function_exists('get_field')) {

    	$company_settings = [
    	    'name'          => get_field('business_name', 'options'),
    	    'phone'         => get_field('business_phone', 'options'),
    	    'street'        => get_field('business_street', 'options'),
    	    'city'          => get_field('business_city', 'options'),
    	    'zip'           => get_field('business_zip', 'options'),
    	    'state'         => get_field('business_state', 'options'),
    	    'icons'         => get_field('icons', 'options'),
    	];

		global $post;

		if ($post) {

    		$fixed_nav = get_field('fixed_navigation', $post->ID);
    		
    	}
    	$fixed_nav = $fixed_nav == 'yes' ? 'fixed-pos' : '';
    
	}
?>
<!doctype html>

<!--

 _______  __   __  _______  ______    ___   _______  _______  __    _    __   __  __   __  _______  _______  __   __  __   __    _______  _______    _     _  _______  _______  _______  _______  ______    __    _    _______  ______    _______ 
|   _   ||  |_|  ||       ||    _ |  |   | |       ||   _   ||  |  | |  |  |_|  ||  | |  ||       ||       ||  | |  ||  |_|  |  |       ||       |  | | _ | ||       ||       ||       ||       ||    _ |  |  |  | |  |   _   ||    _ |  |       |
|  |_|  ||       ||    ___||   | ||  |   | |       ||  |_|  ||   |_| |  |       ||  | |  ||  _____||    ___||  | |  ||       |  |   _   ||    ___|  | || || ||    ___||  _____||_     _||    ___||   | ||  |   |_| |  |  |_|  ||   | ||  |_     _|
|       ||       ||   |___ |   |_||_ |   | |       ||       ||       |  |       ||  |_|  || |_____ |   |___ |  |_|  ||       |  |  | |  ||   |___   |       ||   |___ | |_____   |   |  |   |___ |   |_||_ |       |  |       ||   |_||_   |   |  
|       ||       ||    ___||    __  ||   | |      _||       ||  _    |  |       ||       ||_____  ||    ___||       ||       |  |  |_|  ||    ___|  |       ||    ___||_____  |  |   |  |    ___||    __  ||  _    |  |       ||    __  |  |   |  
|   _   || ||_|| ||   |___ |   |  | ||   | |     |_ |   _   || | |   |  | ||_|| ||       | _____| ||   |___ |       || ||_|| |  |       ||   |      |   _   ||   |___  _____| |  |   |  |   |___ |   |  | || | |   |  |   _   ||   |  | |  |   |  
|__| |__||_|   |_||_______||___|  |_||___| |_______||__| |__||_|  |__|  |_|   |_||_______||_______||_______||_______||_|   |_|  |_______||___|      |__| |__||_______||_______|  |___|  |_______||___|  |_||_|  |__|  |__| |__||___|  |_|  |___|  
                                     \       ,
                                     |\.--._/|
                                    /\ )  )\\/
                                   /(   \  / \
                                  /(   J `(   \
                                 / ) | _\     /
                                /|)  \  eJ    L
                               |  \ L \   L   L
                              /  \  J  `. J   L
                              |  )   L   \/   \
                             /  \    J   (\   /
           _....___         |  \      \   \```
    ,.._.-'        '''--...-||\     -. \   \
  .'.=.'                    `         `.\ [ Y
 /   /                                  \]  J
Y / Y                                    Y   L
| | |          \                         |   L
| | |           Y                        A  J
|   I           |                       /I\ /
|    \          I             \        ( |]/|
J     \         /._           /        -tI/ |
 L     )       /   /'-------'J           `'-:.
 J   .'      ,'  ,' ,     \   `'-.__          \
  \ T      ,'  ,'   )\    /|        ';'---7   /
   \|    ,'L  Y...-' / _.' /         \   /   /
    J   Y  |  J    .'-'   /         ,--.(   /
     L  |  J   L -'     .'         /  |    /\
     |  J.  L  J     .-;.-/       |    \ .' /
     J   L`-J   L____,.-'`        |  _.-'   |
      L  J   L  J                  ``  J    |
      J   L  |   L                     J    |
       L  J  L    \                    L    \
       |   L  ) _.'\                    ) _.'\
       L    \('`    \                  ('`    \
        ) _.'\`-....'                   `-....'
       ('`    \
        `-.___/  

-->
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'AMWA' ); ?></a>

	<header id="masthead" class="site-header <?php echo $fixed_nav; ?>">
		<div class="main-content-nav">
		<div class="wrapper main-wrapper">
			<div class="site-branding">
				<?php
					the_amwa_logo();
				?>
				<?php
					if ( is_front_page() && is_home() ) :
						?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php
					else :
						?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php
					endif;
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<?php

					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'menu_class'	 => 'nav-menu',
							'walker' => new AMWA_Menu_Walker(),
							'items_wrap' => '<div class="time-navigation">' . do_shortcode('[base_time_shortcode]') . '</div><ul id="%1$s" class="%2$s">%3$s</ul>'
						)
					);

					wp_nav_menu(
						array(
							'theme_location' => 'menu-2',
							'menu_id'        => 'Secondary-menu',
							'walker' => new AMWA_Menu_Walker(),
							'menu_class'	 => 'nav-menu',
						)
					);
				
				?>
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'AMWA' ); ?></button>
				<div class="time-navigation">
					<?php echo do_shortcode('[base_time_shortcode]'); ?>
				</div>
			</nav><!-- #site-navigation -->

			

		</div><!-- .wrapper -->
		</div>
	</header><!-- #masthead -->
	<?php
		get_template_part( 'template-parts/header-event' );

	?>
	