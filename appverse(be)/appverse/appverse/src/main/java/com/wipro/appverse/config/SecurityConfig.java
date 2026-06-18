//  package com.wipro.appverse.config;



// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.wipro.appverse.filter.JwtFilter;
// import com.wipro.appverse.security.CustomUserDetailsService;

// @EnableMethodSecurity(prePostEnabled = true)
// @Configuration
// public class SecurityConfig {

//     @Autowired
//     private JwtFilter jwtFilter;

//     @Autowired
//     private CustomUserDetailsService userDetailsService;

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http)
//             throws Exception {
//         System.out.println("✅ SecurityFilterChain initialized");

//         http
//             // Disable CSRF (JWT is stateless)
//             .csrf(csrf -> csrf.disable())

//             // ✅ REGISTER AUTH PROVIDER (CRITICAL)
//             .authenticationProvider(authenticationProvider())

//             // ✅ ALLOW AUTH & SWAGGER ENDPOINTS
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers(
//                     "/auth/register",
//                     "/auth/login",
//                     "/swagger-ui/**",
//                     "/v3/api-docs/**"
//                 ).permitAll()
//                 .requestMatchers("/apps/**").authenticated()
//                 .anyRequest().permitAll()
//             )

//             // ✅ ADD JWT FILTER
//             .addFilterBefore(
//                 jwtFilter,
//                 UsernamePasswordAuthenticationFilter.class
//             );

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationProvider authenticationProvider() {

//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userDetailsService);
//         provider.setPasswordEncoder(passwordEncoder());
//         return provider;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }

package com.wipro.appverse.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.Customizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.wipro.appverse.filter.JwtFilter;
import com.wipro.appverse.security.CustomUserDetailsService;

@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        System.out.println("✅ SecurityFilterChain initialized");

        http
            // ✅ ENABLE CORS
            .cors(Customizer.withDefaults())

            // ✅ Disable CSRF (JWT is stateless)
            .csrf(csrf -> csrf.disable())

            // ✅ REGISTER AUTH PROVIDER
            .authenticationProvider(authenticationProvider())

            // ✅ AUTHORIZATION RULES
            .authorizeHttpRequests(auth -> auth

                // 🔥 VERY IMPORTANT: Allow preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ PUBLIC ENDPOINTS
                .requestMatchers(
                    "/auth/register",
                    "/auth/login",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    
                    "/apps/trending",
                    "/apps/top-ai",
                    "/apps/editors-choice",
                    "/apps/categories",
                    "/auth/reset-password"

                ).permitAll()

                // ✅ PROTECTED
                .requestMatchers("/apps/**").authenticated()

                // ✅ Default
                .anyRequest().permitAll()
            )

            // ✅ JWT FILTER
            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    // ✅ CORS CONFIG (THIS FIXES YOUR ERROR)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:5173"
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}