<?php
 // enqueue custom blocks
function amwa_theme_enqueue_block_editor_assets() {
    wp_enqueue_style('AMWA-theme-fonts-editor', 'https://use.typekit.net/dly3nlz.css', [], null);
    if (get_post_type() == 'lesson' || get_post_type() == 'page' || get_post_type() == 'wp_block' && strpos(get_page_template(), 'page-boilerplate.php') == false) {
        $block_path = '/support/assets/js/editor.blocks.js';

        $dependencies = array( 'wp-blocks', 'wp-dom-ready' );

        if( is_object( get_current_screen() ) ){
            if( get_current_screen()->id == 'site-editor' ){
                $dependencies[] = 'wp-edit-site';
            }elseif( get_current_screen()->id == 'widgets' ){
                $dependencies[] = 'wp-edit-widgets';
            }else{
                $dependencies[] = 'wp-edit-post';
            }
        }else{
            $dependencies[] = 'wp-edit-post';
        }
        
        wp_enqueue_script(
            'wp-core-blocks-js',
            get_template_directory_uri() . $block_path,
            [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-dom-ready', 'lodash' ],
            $dependencies,
            'v1.0.1'
        );

    
        wp_localize_script(
           'wp-core-blocks-js',
           'AMWA',
           [
               'template_directory' => get_template_directory_uri()
           ]
        );
        wp_enqueue_style('AMWA-theme-editor-css', get_template_directory_uri() . '/blocks.editor.css', ['AMWA-theme-fonts-editor']);
    }

}

add_action('enqueue_block_editor_assets', 'amwa_theme_enqueue_block_editor_assets');


// For Dynamic blocks that are registered within blocks folder



function amwa_theme_render_filtered_projects_callback($block_attributes, $content) {

    $id = array_key_exists('resource', $block_attributes) ? $block_attributes['resource'][0]['ID'] : '';
    $cat = array_key_exists('resource', $block_attributes) ? $block_attributes['resource'][0]['label'] : '';
    $title = array_key_exists('resource', $block_attributes) ? $block_attributes['resource'][0]['title'] : '';

    $block_content = '';
    $block_content .= '<div class="project swiper-slide" posttitle="' . $title . '" postcat="' . $cat . '" postId="' . $id . '">';
    $block_content .= '</div>';
    
    return $block_content;
}


function amwa_theme_dynamic_projects_block() {

    register_block_type( 'amwa-theme-block/project', [
            'api_version' => 2,
            'script' => 'wp-main-js',
            'render_callback' => 'amwa_theme_render_filtered_projects_callback'
        ] 
    );
}

add_action('init', 'amwa_theme_dynamic_projects_block');


// function amwa_theme_render_selected_insights($block_attributes, $content) {
//     $block_content = '';

//     $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
//     $anchor = !empty($block_attributes['anchor']) ? $block_attributes['anchor'] : '';
//     $title = !empty($block_attributes['mainTitle']) ? $block_attributes['mainTitle'] : '';
    
//     $block_content .= '<section class="selected-resources">';
//        $block_content .= '<div class="resources-block">';
//             $block_content .= '<div class="block-wrapper" id="' . $anchor . '">';
//                 $block_content .= '<div class="resources-wrap">';
//                     if ($title != 'undefined') {
//                         $block_content .= '<header class="header">';
//                              $block_content .= '<h2 class="header-title">' . $title . '</h2>';
//                         $block_content .= '</header>';
//                     }
//                     $block_content .= '<div class="resources grid" data-append data-category="' . $cat . '">';
//                     $block_content .= '</div>';
//                $block_content .= '</div>';
//                $block_content .= $content;
//             $block_content .= '</div>';
//         $block_content .= '</div>';
//     $block_content .= '</section>';
    
//     return $block_content;
// }


// function amwa_theme_dynamic_selected_insights() {

//     register_block_type( 'amwa-theme-block/selected-insights', [
//             'api_version' => 2,
//             'script' => 'wp-main-js',
//             'render_callback' => 'amwa_theme_render_selected_insights'
//         ] 
//     );
// }

// add_action('init', 'amwa_theme_dynamic_selected_insights');


function amwa_theme_render_filtered_case_studies_callback($block_attributes, $content) {
    $block_content = '';

    $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
    $anchor = !empty($block_attributes['anchor']) ? $block_attributes['anchor'] : '';
    $title = !empty($block_attributes['mainTitle']) ? $block_attributes['mainTitle'] : '';
    
    $block_content .= '<section class="selected-case-studies-grid">';
       $block_content .= '<div class="resources-block">';
            $block_content .= '<div class="block-wrapper" id="' . $anchor . '">';
                $block_content .= '<div class="resources-wrap">';
                    if ($title != 'undefined') {
                        $block_content .= '<header class="header">';
                             $block_content .= '<h2 class="header-title">' . $title . '</h2>';
                        $block_content .= '</header>';
                    }
                    $block_content .= '<div class="resources grid" data-append data-category="' . $cat . '">';
                    $block_content .= '</div>';
               $block_content .= '</div>';
               $block_content .= $content;
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</section>';
    
    return $block_content;
}


function amwa_theme_dynamic_case_studies_grid_block() {
    if (!is_admin()) {
        wp_enqueue_script(
            'fancybox',
            get_template_directory_uri() . '/support/js-compile/libraries/fancybox-v4.0.26.js',
            ['jquery'],
            'v1.0.1',
            true
        );
        $front_path = '/support/assets/js/main.js';
        wp_enqueue_script(
            'wp-main-js',
            get_template_directory_uri() . $front_path,
            ['wp-api', 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'scroll-magic', 'tweenmax', 'tweenmax-animation', 'scrolltrigger', 'lottie-script'],
            'v1.0.1',
            true
       );
    }

    register_block_type( 'amwa-theme-block/selected-case-studies', [
            'api_version' => 2,
            'script' => 'wp-main-js',
            'render_callback' => 'amwa_theme_render_filtered_case_studies_callback'
        ] 
    );
}

add_action('init', 'amwa_theme_dynamic_case_studies_grid_block');

//remove custom colors from blocks

function amwa_theme_gutenberg_disable_custom_styles() {

     // removes the text box where users can enter custom pixel sizes
    add_theme_support('disable-custom-font-sizes',  ['custom' ] );

    add_theme_support('disable-custom-font-weight',  ['custom' ] );

    // add_theme_support('editor-font-sizes', []);

    add_theme_support( 'editor-color-palette',
        [
            [
                'name' => esc_html('Green', '@@textdomain'),
                'slug' => 'green',
                'color' => '#3B7E55'
            ],
            [
                'name' => esc_html('Purple', '@@textdomain'),
                'slug' => 'purple',
                'color' => '#7E3380'
            ],
            [
                'name' => esc_html('Orange', '@@textdomain'),
                'slug' => 'orange',
                'color' => '#CB5E41'
            ],
            [
                'name' => esc_html('Light yeloow', '@@textdomain'),
                'slug' => 'light-yellow',
                'color' => '#FBF3E8'
            ],
            [
                'name' => esc_html('Blue', '@@textdomain'),
                'slug' => 'teal',
                'color' => '#2D9EC6'
            ],
            [
                'name' => esc_html('White', '@@textdomain'),
                'slug' => 'white',
                'color' => '#ffffff'
            ],

        ]
    );
    add_theme_support( 'disable-custom-colors' );
}
add_action( 'after_setup_theme', 'amwa_theme_gutenberg_disable_custom_styles' );


function amwa_theme_progress_block_assets() {
   
    wp_enqueue_script(
      'scroll-magic',
      'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js',
      ['jquery', 'tweenmax'],
      '1.0.0',
      true
    );

    wp_enqueue_script(
        'lottie-script',
        'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js',
        ['jquery'],
        '1.0.0',
        true
    );

    wp_enqueue_script(
        'scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/ScrollTrigger.min.js',
        ['tweenmax'],
        '1.0.0',
        true
    );

    wp_enqueue_script(
      'tweenmax',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js',
      ['jquery'],
      '1.0.0',
      true
    );

    wp_enqueue_script(
      'tweenmax-animation',
      'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js',
      ['jquery', 'tweenmax', 'scroll-magic'],
      '1.0.0',
      true
    );
}
add_action( 'enqueue_block_assets', 'amwa_theme_progress_block_assets' );


function amwa_parse_collections_blocks() {
    global $post;
    $post_id = $post->ID;
    $blocks = parse_blocks( get_the_content( $post_id ) );
    $content_markup = '';
    foreach ( $blocks as $block ) {
        // render_block renders a single block into a HTML string
        $name = $block['blockName'];
      
        if ($name == 'core/gallery') {
            $content_markup .= '</div>';
            $content_markup .= '<section class="gallery-cont">';
            $content_markup .= '<div class="wrapper">';
            $content_markup .= render_block( $block );
            $content_markup .= '</div>';
            $content_markup .= '</section>';
            $content_markup .= '<div class="post-content">';
        } else {
            $content_markup .= render_block( $block );
        }
    }
    // this will apply the_content filters for shortcodes
    // and embeds to contiune working
    $new_content = apply_filters( 'the_content', $content_markup );

    echo $new_content;

}


?>