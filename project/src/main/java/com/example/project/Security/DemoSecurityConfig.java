//package com.example.project.Security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.provisioning.JdbcUserDetailsManager;
//import org.springframework.security.provisioning.UserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//import javax.sql.DataSource;
//
//public class DemoSecurityConfig {
//
//    @Bean
//    public UserDetailsManager userDetailsManager(DataSource dataSource){
//        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
//
//        jdbcUserDetailsManager.setUsersByUsernameQuery(
//                "select user_id, email, password, user_name,user_type from users where user_id=?"
//        );
//
//        // def ine query to retrieve the authorities/roles by username
//        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
//                "select plan_id, user_id, plan_name from training_plans where user_id=?"
//        );
//
//        return jdbcUserDetailsManager;
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http.authorizeHttpRequests(configurer ->
//                configurer
//                        .requestMatchers(HttpMethod.GET,"/workout_plans").hasRole("0")
//                        .requestMatchers(HttpMethod.GET,"/workout_plans/**").hasRole("0")
//                        .requestMatchers(HttpMethod.POST,"/workout_plans").hasRole("1")
//                        .requestMatchers(HttpMethod.PUT,"/workout_plans").hasRole("1")
//                        .requestMatchers(HttpMethod.DELETE,"/workout_plans/**").hasRole("2")
//        );
//        //use HTTP Basic authentication
//        http.httpBasic(Customizer.withDefaults());
//
//        //disable Cross Site Request Forgery (CSRF)
//        //in generał, not required for stateless REST APIs that use POST, PUT, DELETE and/or PATCH
//        http.csrf(csrf -> csrf.disable());
//
//        return http.build();
//    }
//}
