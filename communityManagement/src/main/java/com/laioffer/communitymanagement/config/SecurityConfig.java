package com.laioffer.communitymanagement.config;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth.antMatchers("/**").permitAll())
//        version with authentication
//        not sure if the following configurations are correct????????????
//                .authorizeHttpRequests()
//                .antMatchers(HttpMethod.GET, "/issues").hasAnyAuthority("ROLE_HOA")
//                .antMatchers(HttpMethod.GET, "/issues").hasAnyAuthority("ROLE_RESIDENT")
//                .antMatchers(HttpMethod.POST, "/issues/close/*", "/issues/confirm/*").hasAuthority("ROLE_HOA")
//                .antMatchers(HttpMethod.POST, "/issues").hasAuthority("ROLE_RESIDENT")
//                .anyRequest().authenticated()
//                .and()
                .csrf()
                .disable();
    }
}
