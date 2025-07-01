<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package red_egg
 */
if (function_exists('get_field')) {
    $company_settings = [
        'name'          => get_field('business_name', 'options'),
        'description'   => get_field('business_desc', 'options'),
        'email'         => get_field('business_email', 'options'),
        'phone'         => get_field('business_phone', 'options'),
        'street'        => get_field('business_street', 'options'),
        'city'          => get_field('business_city', 'options'),
        'zip'           => get_field('business_zip', 'options'),
        'state'         => get_field('business_state', 'options'),
        'icons'         => get_field('icons', 'options'),
        'form'          => get_field('menu_form', 'options'),
        'disclaimer'    => get_field('disclaimer', 'options'),
        'privacy'       => get_field('privacy', 'options'),
    ];
        
?>

    <footer id="colophon" class="site-footer">
        <div class="site-info">
            <div class="wrapper">
                
                <div class="col">
                    <p>
                        <a href="tel:<?= $company_settings['email']; ?>" class="contact-link email"><?= $company_settings['email'] ?></a>
                        <a href="tel:<?= $company_settings['phone']; ?>" class="contact-link phone"><?= $company_settings['phone'] ?></a>
                    </p>
                    <address>
                        <p class="contact-link address">
                            <?= $company_settings['street'] ?>,
                            <?= $company_settings['city'] . ', ' . $company_settings['state'] . ' ' . $company_settings['zip'] ?>
                        </p>
                    </address>
                    <p class="description">
                        <?= $company_settings['description'] ?>
                    </p>
                </div>
                <div class="col">
                    <?php 
                        echo do_shortcode('[gravityform id="' . $company_settings['form'] . '"]');
                    ?>
                    <ul class="social">
                        <?php
                        if (is_array($company_settings['icons']) && sizeof($company_settings['icons']) > 0) {
                            foreach($company_settings['icons'] as $icon) {
                                $src = $icon['social']['link'];
                                $class = $icon['social']['icon_class'];
                                ?>
                                    <li><a href="<?= $src; ?>" class="fa-brands fa-<?= $class; ?>" target="_blank"></a></li>
                                <?php
                            }
                        }
                        ?>
                    </ul>
                </div>
                <div class="col">
                    <?php

                        wp_nav_menu(
                            array(
                                'theme_location' => 'menu-15',
                                'menu_id'        => 'footer-menu',
                                'menu_class'     => 'nav-menu',
                            )
                        );
                
                    ?>
                </div>
                <div class="col">
                   <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="footer-home"><?php bloginfo( 'name' ); ?></a>  
                </div>
            </div>
            
        </div><!-- .site-info -->
         <div class="footer-copyright">
                <p>Copyright &copy; <?= date('Y'); ?> <?= $company_settings['name']; ?> | <a href="<?= $company_settings['privacy']; ?>">Privacy Policy</a> | Website Design by <a href="https://redeggmarketing.com/" target="_blank">Red Egg Marketing</a>  </p>
        </div>
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php 
} // end if
wp_footer(); 

?>

</body>
</html>
