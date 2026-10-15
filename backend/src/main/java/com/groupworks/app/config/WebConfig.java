package com.groupworks.app.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${app.cors.allowed-origins}")
	private String[] allowedOrigins;

	@Value("${app.upload-dir}")
	private String uploadDir;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins(allowedOrigins)
				.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
	}

	// 업로드 파일: 기존과 같은 /resources/upload/** 주소로 제공
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		Path root = Paths.get(uploadDir).toAbsolutePath().normalize();
		registry.addResourceHandler("/resources/upload/**")
				.addResourceLocations(root.toUri().toString());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
