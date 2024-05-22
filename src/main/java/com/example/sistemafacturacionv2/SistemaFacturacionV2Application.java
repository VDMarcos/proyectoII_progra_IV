package com.example.sistemafacturacionv2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@SpringBootApplication
public class SistemaFacturacionV2Application {

	public static void main(String[] args) {
		SpringApplication.run(SistemaFacturacionV2Application.class, args);
	}

	@Bean("securityFilterChain")
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		var chain = http
				.authorizeHttpRequests(customizer -> customizer
						.requestMatchers("/api/login/login").permitAll()
						.requestMatchers("/api/login/logout").authenticated()
						.requestMatchers("/api/registro/**").permitAll()
						//.requestMatchers(HttpMethod.POST,"/api/**").hasAnyAuthority("ADM","PRO")
						.requestMatchers("/api/**").hasAnyAuthority("ADM","PRO")
						.requestMatchers("/**").permitAll()
				)
				.exceptionHandling(customizer -> customizer
						.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
				.csrf().disable()
				.build();
		return chain;
	}

}
